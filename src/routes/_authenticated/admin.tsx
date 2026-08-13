import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  adminDelete,
  adminIsAdmin,
  adminList,
  adminSave,
  adminUploadImage,
  type Row,
} from "@/lib/admin.functions";
import { TABLE_DEFS, type FieldDef, type TableDef } from "@/components/admin/schema";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Panel de administración | Fotógrafos Bodas" },
      { name: "description", content: "Gestión de contenido del sitio." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Panel de administración" },
      { property: "og:description", content: "Gestión de contenido del sitio." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const checkAdmin = useServerFn(adminIsAdmin);
  const [active, setActive] = useState<TableDef>(TABLE_DEFS[0]!);

  const adminQuery = useQuery({ queryKey: ["is-admin"], queryFn: () => checkAdmin({}) });

  if (adminQuery.isLoading) {
    return <div className="p-10 text-sm text-muted-foreground">Cargando…</div>;
  }

  if (!adminQuery.data?.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="display-3">Sin acceso</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Esta cuenta no tiene permisos de administrador.
          </p>
          <button
            className="mt-6 border border-border px-5 py-3 text-[0.7rem] uppercase tracking-[0.16em]"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
        <div>
          <p className="eyebrow">Administración</p>
          <h1 className="font-serif text-2xl">Panel de contenido</h1>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <a href="/" className="text-muted-foreground underline underline-offset-4">
            Ver sitio
          </a>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
            className="border border-border px-4 py-2 uppercase tracking-[0.14em]"
          >
            Salir
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-8 lg:flex-row">
        <nav className="flex shrink-0 flex-row flex-wrap gap-2 lg:w-56 lg:flex-col">
          {TABLE_DEFS.map((def) => (
            <button
              key={def.table}
              onClick={() => setActive(def)}
              className={`px-4 py-2.5 text-left text-xs uppercase tracking-[0.14em] transition-colors ${
                active.table === def.table
                  ? "bg-foreground text-primary-foreground"
                  : "bg-background hover:bg-background/60"
              }`}
            >
              {def.label}
            </button>
          ))}
        </nav>

        <main className="min-w-0 flex-1">
          <TableManager key={active.table} def={active} />
        </main>
      </div>
    </div>
  );
}

function TableManager({ def }: { def: TableDef }) {
  const queryClient = useQueryClient();
  const list = useServerFn(adminList);
  const save = useServerFn(adminSave);
  const remove = useServerFn(adminDelete);
  const [editing, setEditing] = useState<Row | null>(null);
  const [error, setError] = useState<string | null>(null);

  const rowsQuery = useQuery({
    queryKey: ["admin", def.table],
    queryFn: () => list({ data: { table: def.table } }),
  });

  const rows = useMemo(() => rowsQuery.data ?? [], [rowsQuery.data]);

  useEffect(() => {
    if (def.singleton && rows.length > 0 && !editing) setEditing(rows[0]!);
  }, [def.singleton, rows, editing]);

  const saveMutation = useMutation({
    mutationFn: (row: Row) => save({ data: { table: def.table, row } }),
    onSuccess: () => {
      setError(null);
      if (!def.singleton) setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["admin", def.table] });
    },
    onError: (err: unknown) => setError(err instanceof Error ? err.message : "Error al guardar"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { table: def.table, id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", def.table] }),
  });

  function emptyRow(): Row {
    const row: Row = {};
    for (const field of def.fields) {
      row[field.name] =
        field.type === "boolean" ? true : field.type === "number" ? rows.length : "";
    }
    return row;
  }

  return (
    <section className="bg-background p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-xl">{def.label}</h2>
        {!def.singleton && !def.readOnly ? (
          <button
            onClick={() => setEditing(emptyRow())}
            className="bg-foreground px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.14em] text-primary-foreground"
          >
            Nuevo
          </button>
        ) : null}
      </div>

      {error ? <p className="mt-4 text-xs text-destructive">{error}</p> : null}

      {rowsQuery.isLoading ? (
        <p className="mt-6 text-sm text-muted-foreground">Cargando…</p>
      ) : null}

      {!def.singleton ? (
        <ul className="mt-6 divide-y divide-border border-y border-border">
          {rows.map((row) => (
            <li key={String(row["id"])} className="flex items-center justify-between gap-4 py-3">
              <button className="min-w-0 text-left" onClick={() => setEditing(row)}>
                <p className="truncate text-sm">
                  {String(row[def.titleField] ?? "—")}
                  {def.table === "inquiries" && row["last_name"]
                    ? ` ${String(row["last_name"])}`
                    : ""}
                </p>
                {def.subtitleField ? (
                  <p className="truncate text-xs text-muted-foreground">
                    {String(row[def.subtitleField] ?? "")}
                  </p>
                ) : null}
              </button>
              <div className="flex shrink-0 items-center gap-3 text-xs">
                <button className="underline underline-offset-4" onClick={() => setEditing(row)}>
                  Editar
                </button>
                <button
                  className="text-destructive underline underline-offset-4"
                  onClick={() => {
                    if (confirm("¿Eliminar este registro?")) {
                      deleteMutation.mutate(String(row["id"]));
                    }
                  }}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
          {rows.length === 0 && !rowsQuery.isLoading ? (
            <li className="py-6 text-sm text-muted-foreground">Sin registros todavía.</li>
          ) : null}
        </ul>
      ) : null}

      {editing ? (
        <RecordForm
          def={def}
          value={editing}
          saving={saveMutation.isPending}
          onCancel={def.singleton ? undefined : () => setEditing(null)}
          onSubmit={(row) => saveMutation.mutate(row)}
        />
      ) : null}
    </section>
  );
}

function RecordForm({
  def,
  value,
  saving,
  onSubmit,
  onCancel,
}: {
  def: TableDef;
  value: Row;
  saving: boolean;
  onSubmit: (row: Row) => void;
  onCancel?: () => void;
}) {
  const [row, setRow] = useState<Row>(value);
  useEffect(() => setRow(value), [value]);

  function set(name: string, next: Row[string]) {
    setRow((prev) => ({ ...prev, [name]: next }));
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const payload: Row = { id: (row["id"] as string) ?? "" };
    for (const field of def.fields) {
      const raw = row[field.name];
      payload[field.name] =
        field.type === "number"
          ? Number(raw ?? 0)
          : field.type === "boolean"
            ? Boolean(raw)
            : raw === ""
              ? null
              : ((raw ?? null) as Row[string]);
    }
    onSubmit(payload);
  }

  return (
    <form onSubmit={submit} className="mt-8 border-t border-border pt-8">
      {def.readOnly ? <ReadOnlyDetails row={row} def={def} /> : null}
      <div className="grid gap-5 md:grid-cols-2">
        {def.fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            value={row[field.name] ?? ""}
            onChange={(next) => set(field.name, next)}
          />
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-foreground px-6 py-3 text-[0.7rem] uppercase tracking-[0.14em] text-primary-foreground disabled:opacity-60"
        >
          {saving ? "Guardando…" : "Guardar"}
        </button>
        {onCancel ? (
          <button type="button" onClick={onCancel} className="text-xs underline underline-offset-4">
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}

function ReadOnlyDetails({ row, def }: { row: Row; def: TableDef }) {
  const editable = new Set(def.fields.map((f) => f.name));
  const entries = Object.entries(row).filter(
    ([key, val]) => !editable.has(key) && key !== "id" && val !== null && val !== "",
  );
  return (
    <dl className="mb-8 grid gap-3 bg-secondary/50 p-5 text-sm md:grid-cols-2">
      {entries.map(([key, val]) => (
        <div key={key}>
          <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
            {key.replace(/_/g, " ")}
          </dt>
          <dd className="mt-1 break-words">{String(val)}</dd>
        </div>
      ))}
    </dl>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: Row[string];
  onChange: (next: Row[string]) => void;
}) {
  const upload = useServerFn(adminUploadImage);
  const [uploading, setUploading] = useState(false);
  const inputClass =
    "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground";

  const label = (
    <span className="mb-1.5 block text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
      {field.label}
    </span>
  );

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-3 text-sm md:col-span-1">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="size-4"
        />
        {field.label}
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className="md:col-span-2">
        {label}
        <textarea
          rows={4}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      </label>
    );
  }

  if (field.type === "image") {
    return (
      <div className="md:col-span-2">
        {label}
        <div className="flex flex-wrap items-center gap-4">
          {value ? (
            <img
              src={String(value)}
              alt=""
              loading="lazy"
              className="h-20 w-20 object-cover"
            />
          ) : null}
          <input
            type="text"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/foto.jpg"
            className={`${inputClass} max-w-md flex-1`}
          />
          <label className="cursor-pointer border border-border px-4 py-2.5 text-[0.68rem] uppercase tracking-[0.14em]">
            {uploading ? "Subiendo…" : "Subir"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                setUploading(true);
                try {
                  const buffer = await file.arrayBuffer();
                  let binary = "";
                  const bytes = new Uint8Array(buffer);
                  for (let i = 0; i < bytes.length; i += 1)
                    binary += String.fromCharCode(bytes[i]!);
                  const result = await upload({
                    data: {
                      fileName: file.name,
                      contentType: file.type || "image/jpeg",
                      dataBase64: btoa(binary),
                    },
                  });
                  onChange(result.url);
                } finally {
                  setUploading(false);
                }
              }}
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <label className={field.half ? "" : "md:col-span-2"}>
      {label}
      <input
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        value={String(value ?? "")}
        onChange={(e) => onChange(field.type === "number" ? Number(e.target.value) : e.target.value)}
        className={inputClass}
      />
    </label>
  );
}
