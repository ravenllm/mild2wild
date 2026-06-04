export type BooksyClientCsvRow = {
  externalId: string | null;
  fullName: string;
  phone: string | null;
  email: string | null;
  notes: string | null;
};

export type BooksyClientImportPreview = BooksyClientCsvRow & {
  dedupeKey: string;
  rawRow: Record<string, string>;
};

export type ExistingBooksyClient = {
  id: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  external_source: string | null;
  external_id: string | null;
};

export type BooksyClientPreviewMatch = BooksyClientImportPreview & {
  matchedClientId: string | null;
  matchedClientName: string | null;
  matchMethod: "booksy_id" | "phone" | "email" | "name" | "new";
  importAction: "update" | "create";
  hasPrivateNotes: boolean;
};

export type BooksyClientImportSummary = {
  totalRows: number;
  importableRows: number;
  newClients: number;
  matchedClients: number;
  skippedRows: number;
  rowsWithNotes: number;
  rows: BooksyClientPreviewMatch[];
};

const clientIdColumns = ["Client ID", "Client Id", "Customer ID", "Customer Id", "ID", "External ID", "External Id"];
const fullNameColumns = ["Client Name", "Customer Name", "Name", "Full Name"];
const firstNameColumns = ["First Name", "Client First Name", "Customer First Name"];
const lastNameColumns = ["Last Name", "Client Last Name", "Customer Last Name"];
const phoneColumns = ["Phone", "Client Phone", "Customer Phone", "Mobile", "Mobile Phone", "Phone Number"];
const emailColumns = ["Email", "Client Email", "Customer Email", "Email Address"];
const notesColumns = ["Notes", "Note", "Client Notes", "Customer Notes", "Description", "Memo", "Internal Notes"];

export function parseCsvRows(csvText: string): Record<string, string>[] {
  const rows = parseCsvCells(csvText.replace(/^\uFEFF/, ""));
  if (rows.length === 0) return [];
  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).filter((row) => row.some((cell) => cell.trim())).map((row) => {
    const mapped: Record<string, string> = {};
    headers.forEach((header, index) => {
      if (header) mapped[header] = row[index]?.trim() ?? "";
    });
    return mapped;
  });
}

export function normalizeBooksyClientCsvRow(row: Record<string, unknown>): BooksyClientCsvRow {
  const fullName = readColumn(row, fullNameColumns) || [readColumn(row, firstNameColumns), readColumn(row, lastNameColumns)].filter(Boolean).join(" ");
  return {
    externalId: nullable(readColumn(row, clientIdColumns)),
    fullName: fullName.trim(),
    phone: nullable(readColumn(row, phoneColumns)),
    email: nullable(readColumn(row, emailColumns).toLowerCase()),
    notes: nullable(readColumn(row, notesColumns)),
  };
}

export function buildBooksyClientImportPreview(csvText: string): BooksyClientImportPreview[] {
  return parseCsvRows(csvText).map((row) => {
    const normalized = normalizeBooksyClientCsvRow(row);
    return {
      ...normalized,
      dedupeKey: buildClientDedupeKey(normalized),
      rawRow: row,
    };
  });
}

export function filterImportableBooksyClientRows(rows: BooksyClientImportPreview[], limit = 500) {
  return rows.filter((row) => row.fullName || row.phone || row.email).slice(0, limit);
}

export function summarizeBooksyClientImport(csvText: string, existingClients: ExistingBooksyClient[] = [], limit = 500): BooksyClientImportSummary {
  const allRows = buildBooksyClientImportPreview(csvText);
  const importableRows = filterImportableBooksyClientRows(allRows, limit);
  const rows = matchBooksyClientImportRows(importableRows, existingClients);

  return {
    totalRows: allRows.length,
    importableRows: rows.length,
    newClients: rows.filter((row) => row.importAction === "create").length,
    matchedClients: rows.filter((row) => row.importAction === "update").length,
    skippedRows: Math.max(0, allRows.length - rows.length),
    rowsWithNotes: rows.filter((row) => row.hasPrivateNotes).length,
    rows,
  };
}

export function matchBooksyClientImportRows(rows: BooksyClientImportPreview[], existingClients: ExistingBooksyClient[] = []): BooksyClientPreviewMatch[] {
  const byBooksyId = new Map(existingClients.filter((client) => client.external_source === "booksy" && client.external_id).map((client) => [normalizeKey(client.external_id as string), client]));
  const byPhone = new Map(existingClients.filter((client) => client.phone).map((client) => [normalizePhone(client.phone as string), client]));
  const byEmail = new Map(existingClients.filter((client) => client.email).map((client) => [normalizeKey(client.email as string), client]));
  const byName = new Map(existingClients.map((client) => [normalizeKey(client.full_name), client]));

  return rows.map((row) => {
    const booksyKey = row.externalId ? normalizeKey(row.externalId) : "";
    const phoneKey = row.phone ? normalizePhone(row.phone) : "";
    const emailKey = row.email ? normalizeKey(row.email) : "";
    const nameKey = normalizeKey(row.fullName);
    const booksyMatch = booksyKey ? byBooksyId.get(booksyKey) : undefined;
    const phoneMatch = phoneKey ? byPhone.get(phoneKey) : undefined;
    const emailMatch = emailKey ? byEmail.get(emailKey) : undefined;
    const nameMatch = nameKey ? byName.get(nameKey) : undefined;
    const matched = booksyMatch ?? phoneMatch ?? emailMatch ?? nameMatch;
    const matchMethod = booksyMatch ? "booksy_id" : phoneMatch ? "phone" : emailMatch ? "email" : nameMatch ? "name" : "new";

    return {
      ...row,
      matchedClientId: matched?.id ?? null,
      matchedClientName: matched?.full_name ?? null,
      matchMethod,
      importAction: matched ? "update" : "create",
      hasPrivateNotes: Boolean(row.notes),
    };
  });
}

export function buildClientDedupeKey(row: Pick<BooksyClientCsvRow, "externalId" | "email" | "phone" | "fullName">) {
  if (row.externalId) return `booksy:${normalizeKey(row.externalId)}`;
  if (row.phone) return `phone:${normalizePhone(row.phone)}`;
  if (row.email) return `email:${normalizeKey(row.email)}`;
  return `name:${normalizeKey(row.fullName)}`;
}

export function fallbackBooksyClientExternalId(row: Pick<BooksyClientCsvRow, "externalId" | "email" | "phone" | "fullName">) {
  if (row.externalId) return row.externalId;
  const key = buildClientDedupeKey(row);
  return `import-${stableHash(key).slice(0, 16)}`;
}

function parseCsvCells(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.length > 1 || row[0]?.trim()) rows.push(row);
  return rows;
}

function readColumn(row: Record<string, unknown>, names: string[]) {
  for (const name of names) {
    const exact = row[name];
    if (typeof exact === "string" && exact.trim()) return exact.trim();
    const fuzzyKey = Object.keys(row).find((key) => normalizeKey(key) === normalizeKey(name));
    const fuzzy = fuzzyKey ? row[fuzzyKey] : undefined;
    if (typeof fuzzy === "string" && fuzzy.trim()) return fuzzy.trim();
  }
  return "";
}

function nullable(value: string) {
  return value.trim() || null;
}

function normalizeKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function normalizePhone(value: string) {
  return value.replace(/\D+/g, "") || normalizeKey(value);
}

function stableHash(value: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0").repeat(2);
}
