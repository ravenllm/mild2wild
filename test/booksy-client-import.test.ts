import { describe, expect, it } from "vitest";
import {
  buildBooksyClientImportPreview,
  buildClientDedupeKey,
  fallbackBooksyClientExternalId,
  matchBooksyClientImportRows,
  normalizeBooksyClientCsvRow,
  parseCsvRows,
  summarizeBooksyClientImport,
} from "../src/lib/booksy-client-import";

describe("Booksy client import", () => {
  it("parses quoted CSV rows and normalizes client fields", () => {
    const rows = parseCsvRows('Client ID,Client Name,Phone,Email,Notes\nB-1001,"Maya, Rose",555-0101,MAYA@EXAMPLE.COM,"Likes chrome, flames"');

    expect(rows).toEqual([
      {
        "Client ID": "B-1001",
        "Client Name": "Maya, Rose",
        Phone: "555-0101",
        Email: "MAYA@EXAMPLE.COM",
        Notes: "Likes chrome, flames",
      },
    ]);

    expect(normalizeBooksyClientCsvRow(rows[0])).toEqual({
      externalId: "B-1001",
      fullName: "Maya, Rose",
      phone: "555-0101",
      email: "maya@example.com",
      notes: "Likes chrome, flames",
    });
  });

  it("builds import previews with deterministic dedupe keys", () => {
    const preview = buildBooksyClientImportPreview(`First Name,Last Name,Mobile Phone,Email Address,Client Notes\nJordan,Client,(555) 777-1212,jordan@example.com,Quiet appointment preferred`);

    expect(preview).toEqual([
      expect.objectContaining({
        externalId: null,
        fullName: "Jordan Client",
        phone: "(555) 777-1212",
        email: "jordan@example.com",
        notes: "Quiet appointment preferred",
        dedupeKey: "phone:5557771212",
      }),
    ]);
  });

  it("falls back from external id to phone, email, then exact normalized name", () => {
    expect(buildClientDedupeKey({ externalId: " BK-1 ", email: "a@example.com", phone: "555", fullName: "Maya" })).toBe("booksy:bk-1");
    expect(buildClientDedupeKey({ externalId: null, email: "A@Example.com", phone: "555", fullName: "Maya" })).toBe("phone:555");
    expect(buildClientDedupeKey({ externalId: null, email: "A@Example.com", phone: null, fullName: "Maya" })).toBe("email:a@example.com");
    expect(buildClientDedupeKey({ externalId: null, email: null, phone: "(555) 0101", fullName: "Maya" })).toBe("phone:5550101");
    expect(buildClientDedupeKey({ externalId: null, email: null, phone: null, fullName: " Maya   Rose " })).toBe("name:maya rose");
  });

  it("creates stable synthetic Booksy external IDs when exports omit client IDs", () => {
    const row = { externalId: null, email: "maya@example.com", phone: "555-0101", fullName: "Maya Rose" };

    expect(fallbackBooksyClientExternalId(row)).toMatch(/^import-[a-f0-9]{16}$/);
    expect(fallbackBooksyClientExternalId(row)).toBe(fallbackBooksyClientExternalId(row));
  });

  it("summarizes preview rows before writing clients", () => {
    const summary = summarizeBooksyClientImport(
      "Client ID,Client Name,Phone,Email,Notes\nB-1001,Maya Rose,555-0101,maya@example.com,Private note\n,New Client,555-9999,new@example.com,",
      [
        {
          id: "existing-1",
          full_name: "Maya Rose",
          phone: "555-0101",
          email: "maya@example.com",
          external_source: "booksy",
          external_id: "B-1001",
        },
      ],
    );

    expect(summary).toMatchObject({
      totalRows: 2,
      importableRows: 2,
      newClients: 1,
      matchedClients: 1,
      skippedRows: 0,
      rowsWithNotes: 1,
    });
    expect(summary.rows.map((row) => row.importAction)).toEqual(["update", "create"]);
  });

  it("matches existing clients by Booksy ID, then phone, email, exact name", () => {
    const rows = buildBooksyClientImportPreview(`Client ID,Client Name,Phone,Email\nBK-1,Booksy Match,555-1111,bk@example.com\n,Phone Match,(555) 222-2222,phone@example.com\n,Email Match,555-3333,email@example.com\n,Name Match,555-4444,name@example.com\n,New Client,555-5555,new@example.com`);
    const matches = matchBooksyClientImportRows(rows, [
      { id: "booksy", full_name: "Old Booksy", phone: null, email: null, external_source: "booksy", external_id: "bk-1" },
      { id: "phone", full_name: "Old Phone", phone: "5552222222", email: null, external_source: null, external_id: null },
      { id: "email", full_name: "Old Email", phone: null, email: "EMAIL@example.com", external_source: null, external_id: null },
      { id: "name", full_name: "Name   Match", phone: null, email: null, external_source: null, external_id: null },
    ]);

    expect(matches.map((row) => row.matchMethod)).toEqual(["booksy_id", "phone", "email", "name", "new"]);
    expect(matches.map((row) => row.importAction)).toEqual(["update", "update", "update", "update", "create"]);
  });
});
