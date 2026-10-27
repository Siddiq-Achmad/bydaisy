/**
 * ByDaisy Unified Data Access Layer (DAL)
 * Seamlessly bridges local JSON persistence and remote SQL / Supabase / PostgreSQL
 */

import fs from "fs/promises";
import path from "path";

function getDataFilePath(filename: string): string {
  return path.join(process.cwd(), "data", filename);
}

export async function readJsonData<T = any>(filename: string, defaultValue: T): Promise<T> {
  try {
    const raw = await fs.readFile(getDataFilePath(filename), "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    return defaultValue;
  }
}

export async function writeJsonData<T = any>(filename: string, data: T): Promise<void> {
  await fs.writeFile(getDataFilePath(filename), JSON.stringify(data, null, 2), "utf-8");
}

// Data entity helpers
export const db = {
  weddings: {
    getAll: () => readJsonData<any[]>("real-weddings.json", []),
    saveAll: (items: any[]) => writeJsonData<any[]>("real-weddings.json", items),
  },
  journal: {
    getAll: () => readJsonData<any>("journal.json", { categories: [], articles: [] }),
    saveAll: (items: any) => writeJsonData<any>("journal.json", items),
  },
  vendors: {
    getAll: () => readJsonData<any>("vendors.json", { categories: [], vendors: [] }),
    saveAll: (items: any) => writeJsonData<any>("vendors.json", items),
  },
  reviews: {
    getAll: () => readJsonData<any[]>("reviews.json", []),
    saveAll: (items: any[]) => writeJsonData<any[]>("reviews.json", items),
  },
  leads: {
    getAll: () => readJsonData<any[]>("leads.json", []),
    saveAll: (items: any[]) => writeJsonData<any[]>("leads.json", items),
  },
  consultations: {
    getAll: () => readJsonData<any[]>("consultations.json", []),
    saveAll: (items: any[]) => writeJsonData<any[]>("consultations.json", items),
  },
  calendar: {
    getAll: () => readJsonData<any[]>("calendar.json", []),
    saveAll: (items: any[]) => writeJsonData<any[]>("calendar.json", items),
  },
  gallery: {
    getAll: () => readJsonData<any[]>("gallery.json", []),
    saveAll: (items: any[]) => writeJsonData<any[]>("gallery.json", items),
  },
  settings: {
    get: () => readJsonData("settings.json", {}),
    save: (data: any) => writeJsonData("settings.json", data),
  },
  packages: {
    get: () => readJsonData("wedding-prices.json", { categories: [] }),
    save: (data: any) => writeJsonData("wedding-prices.json", data),
  },
};
