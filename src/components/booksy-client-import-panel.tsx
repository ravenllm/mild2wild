"use client";

import { useMemo, useState, type ReactNode } from "react";
import { summarizeBooksyClientImport, type ExistingBooksyClient } from "@/lib/booksy-client-import";

type BooksyClientImportPanelProps = {
  action: (formData: FormData) => void | Promise<void>;
  existingClients: ExistingBooksyClient[];
  importStatus?: string;
};

const sampleCsv = "Client Name,Phone,Email,Notes\nMaya Rose,555-0101,maya@example.com,Prefers gel art";

export function BooksyClientImportPanel({ action, existingClients, importStatus }: BooksyClientImportPanelProps) {
  const [csvText, setCsvText] = useState("");
  const [hasPreviewed, setHasPreviewed] = useState(false);
  const summary = useMemo(() => summarizeBooksyClientImport(csvText, existingClients), [csvText, existingClients]);
  const canImport = hasPreviewed && summary.importableRows > 0;
  const previewRows = summary.rows.slice(0, 6);

  return (
    <article className="neon-card rounded-[2rem] p-6" style={{ boxShadow: "0 0 70px #4DDCE522" }}>
      <SectionLabel>Import only when needed</SectionLabel>
      <h2 className="brand-display text-4xl font-black uppercase">Booksy import.</h2>
      <p className="mt-3 text-sm leading-6 text-white/60">
        Keep this closed unless Caitlin is moving client records over from Booksy. The first step is always a preview, so nothing saves until she confirms it.
      </p>
      {importStatus ? <ImportStatus status={importStatus} /> : null}
      <div className="mt-5 grid gap-3">
        <div className="rounded-3xl border border-cyan-200/15 bg-cyan-200/10 p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-50/75">Simple flow</p>
          <ol className="mt-3 space-y-2 text-sm leading-6 text-white/68">
            <li>1. Paste the Booksy export.</li>
            <li>2. Preview rows and matches.</li>
            <li>3. Confirm import only if it looks right.</li>
          </ol>
        </div>
        <details className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <summary className="flex cursor-pointer list-none flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Booksy CSV</p>
              <h3 className="mt-1 text-lg font-black text-white">Paste and preview import</h3>
            </div>
            <span className="rounded-full bg-cyan-200 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black">Open importer</span>
          </summary>
          <form action={action} className="mt-4 rounded-3xl border border-cyan-200/15 bg-black/35 p-4">
            <textarea
              name="booksyClientCsv"
              rows={8}
              value={csvText}
              onChange={(event) => {
                setCsvText(event.target.value);
                setHasPreviewed(false);
              }}
              placeholder={sampleCsv}
              className="w-full resize-y rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/25 focus:border-cyan-200/60"
            />
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => setHasPreviewed(true)}
                className="rounded-full bg-cyan-200 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
              >
                Preview rows
              </button>
              <button
                type="submit"
                disabled={!canImport}
                className="rounded-full bg-yellow-200 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-white disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/35"
              >
                Confirm import
              </button>
            </div>
            <p className="mt-3 text-xs leading-5 text-white/45">
              Matching checks Booksy ID first, then phone, email, and exact name. Imported notes stay private to owner/admin.
            </p>
            {hasPreviewed ? (
              <div className="mt-5 rounded-3xl border border-cyan-200/15 bg-black/45 p-4">
                <div className="grid gap-3 sm:grid-cols-4">
                  <PreviewStat label="Ready" value={summary.importableRows} />
                  <PreviewStat label="New" value={summary.newClients} />
                  <PreviewStat label="Matched" value={summary.matchedClients} />
                  <PreviewStat label="Private notes" value={summary.rowsWithNotes} />
                </div>
                {summary.skippedRows > 0 ? <p className="mt-3 text-xs leading-5 text-yellow-100/70">{summary.skippedRows} blank or unusable row{summary.skippedRows === 1 ? "" : "s"} will be skipped.</p> : null}
                {summary.importableRows === 0 ? (
                  <p className="mt-4 rounded-2xl border border-yellow-200/20 bg-yellow-200/10 px-4 py-3 text-sm leading-6 text-yellow-50/80">No importable clients found yet. Make sure the CSV has names, phone numbers, or email addresses.</p>
                ) : (
                  <div className="mt-4 max-h-64 space-y-2 overflow-y-auto pr-1 [scrollbar-color:#4DDCE5_rgba(255,255,255,0.08)]">
                    {previewRows.map((row, index) => (
                      <div key={`${row.dedupeKey}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-black text-white">{row.fullName || "Unnamed Booksy client"}</p>
                            <p className="mt-1 break-words text-xs text-white/50">{[row.phone, row.email].filter(Boolean).join(" · ") || "No contact saved"}</p>
                          </div>
                          <span className={`rounded-full px-3 py-1 text-[0.6rem] font-black uppercase tracking-[0.14em] ${row.importAction === "create" ? "bg-cyan-200 text-black" : "bg-yellow-200 text-black"}`}>
                            {row.importAction === "create" ? "New" : `Match: ${row.matchMethod.replace("_", " ")}`}
                          </span>
                        </div>
                        {row.matchedClientName ? <p className="mt-2 text-xs leading-5 text-white/45">Will update existing client: {row.matchedClientName}</p> : null}
                      </div>
                    ))}
                    {summary.rows.length > previewRows.length ? <p className="px-2 text-xs leading-5 text-white/45">Preview showing first {previewRows.length} of {summary.rows.length} importable rows.</p> : null}
                  </div>
                )}
              </div>
            ) : null}
          </form>
        </details>
      </div>
    </article>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-100/65">{children}</p>;
}

function PreviewStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/45">{label}</p>
    </div>
  );
}

function ImportStatus({ status }: { status: string }) {
  const copy = status === "imported" ? "Import complete. The private client list below is refreshed." : status === "empty" ? "No importable clients were found in that CSV." : "Import could not run. Check the CSV and Supabase connection before trying again.";
  return <p className="mt-4 rounded-2xl border border-cyan-200/20 bg-cyan-200/10 px-4 py-3 text-sm leading-6 text-cyan-50/80">{copy}</p>;
}
