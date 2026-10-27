/**
 * ByDaisy Luxury Matrimonial Platform: Enterprise Multi-Tenant Architecture
 * Powering ByDaisy as an Autonomous Enterprise Business Unit within the LUXIMA & AWEDZ Ecosystem.
 */

export type DatabaseStrategy = "shared_rls" | "schema_isolated" | "database_isolated";

export interface EnterpriseTenantConfig {
  tenantId: string;
  organizationId: string;
  parentEcosystem: "LUXIMA & AWEDZ";
  brandName: string;
  customDomains: string[];
  defaultSubdomain: string;
  databaseStrategy: DatabaseStrategy;
  databaseUrl?: string; // Optional dedicated connection string if database_isolated
  features: {
    customHomepage: boolean;
    customDomainRouting: boolean;
    independentPricelist: boolean;
    exclusiveVendorCircle: boolean;
    luximaCrmTwoWaySync: boolean;
    awedzEventHubSync: boolean;
  };
  luximaBridge: {
    crmEndpoint: string;
    organizationKey: string;
    webhookSecret: string;
    syncInterval: string;
  };
  awedzBridge: {
    platformEndpoint: string;
    eventHubId: string;
    apiKey: string;
  };
}

/**
 * Official Enterprise Configuration for ByDaisy
 */
export const BYDAISY_ENTERPRISE_CONFIG: EnterpriseTenantConfig = {
  tenantId: "bydaisy",
  organizationId: "luxima-awedz-ent-01",
  parentEcosystem: "LUXIMA & AWEDZ",
  brandName: "ByDaisy Planner",
  customDomains: ["bydaisy.com", "bydaisy.id", "localhost:3000"],
  defaultSubdomain: "bydaisy.awedz.id",
  databaseStrategy: "shared_rls",
  features: {
    customHomepage: true,
    customDomainRouting: true,
    independentPricelist: true,
    exclusiveVendorCircle: true,
    luximaCrmTwoWaySync: true,
    awedzEventHubSync: true,
  },
  luximaBridge: {
    crmEndpoint: process.env.LUXIMA_CRM_ENDPOINT || "https://api.luxima.id/v1/enterprise/bydaisy",
    organizationKey: process.env.LUXIMA_ORG_KEY || "lux_org_992014_daisy",
    webhookSecret: process.env.LUXIMA_WEBHOOK_SECRET || "sec_luxima_bydaisy_2026",
    syncInterval: "realtime",
  },
  awedzBridge: {
    platformEndpoint: process.env.AWEDZ_HUB_ENDPOINT || "https://hub.awedz.com/api/v2/tenants/bydaisy",
    eventHubId: process.env.AWEDZ_EVENT_HUB_ID || "hub_ent_bydaisy_sumatra",
    apiKey: process.env.AWEDZ_API_KEY || "awz_live_sec_bd881a7b",
  },
};

/**
 * Resolves whether the current request host matches an enterprise custom domain
 */
export function resolveEnterpriseDomain(hostHeader: string | null): {
  isEnterprise: boolean;
  tenantId: string;
  domain: string;
  isCustomDomain: boolean;
} {
  const host = (hostHeader || "").toLowerCase().split(":")[0];
  const config = BYDAISY_ENTERPRISE_CONFIG;

  const isCustom = config.customDomains.some((d) => d.toLowerCase().split(":")[0] === host);
  const isSubdomain = host.includes("bydaisy.awedz.com") || host.includes("bydaisy.luxima.id");

  return {
    isEnterprise: true,
    tenantId: config.tenantId,
    domain: host || "bydaisy.com",
    isCustomDomain: isCustom || !isSubdomain,
  };
}

/**
 * Enterprise Database Strategy Comparison Matrix & Guidance
 */
export const DATABASE_STRATEGY_ANALYSIS = {
  shared_rls: {
    name: "Kombinasi Database Terpusat (Shared Database with Row-Level Security / RLS)",
    recommendationLevel: "Sangat Direkomendasikan (Default Enterprise SaaS)",
    summary:
      "Seluruh data disimpan dalam database PostgreSQL/Supabase utama LUXIMA & AWEDZ, dengan pemisahan logis ketat menggunakan `tenant_id` dan Row-Level Security (RLS).",
    pros: [
      "Optimalisasi biaya infrastruktur (1 instance database performa tinggi untuk seluruh platform).",
      "Konektivitas instan dengan master data LUXIMA (vendor marketplace, katalog produk, kalender terpusat).",
      "Pemeliharaan skema dan migrasi (Prisma/Drizzle/SQL) hanya dilakukan satu kali terpusat.",
      "Executive Dashboard LUXIMA & AWEDZ dapat mengagregasi analitik seluruh unit bisnis secara instan.",
    ],
    cons: [
      "Membutuhkan kedisiplinan query dengan filter `tenant_id` atau konfigurasi RLS yang ketat.",
      "Jika terjadi lonjakan traffic ekstrem pada tenant lain (noisy neighbor), performa dapat terpengaruh jika kapasitas server terbatas.",
    ],
    idealFor:
      "Enterprise internal LUXIMA / AWEDZ seperti ByDaisy yang membutuhkan otonomi tampilan, domain, dan konten namun tetap terhubung mulus dengan CRM & ekosistem vendor induk.",
  },
  schema_isolated: {
    name: "Isolasi Skema (Schema-per-Tenant dalam Satu Database)",
    recommendationLevel: "Pilihan Menengah (Balance of Isolation & Cost)",
    summary:
      "Satu instance PostgreSQL terpusat, namun ByDaisy memiliki schema sendiri (contoh: `tenant_bydaisy.*`) terpisah dari `public.*` milik induk.",
    pros: [
      "Isolasi tabel dan namespace data lebih terjamin dari kesalahan query developer.",
      "Backup dan restore per-tenant dapat dilakukan secara mandiri menggunakan `pg_dump -n tenant_bydaisy`.",
      "Biaya hosting tetap efisien dalam satu database engine terpusat.",
    ],
    cons: [
      "Sedikit lebih kompleks saat melakukan migrasi skema tabel jika jumlah tenant bertambah puluhan.",
    ],
    idealFor:
      "Enterprise dengan volume transaksi tinggi yang menginginkan kemudahan backup independen tanpa biaya instance server terpisah.",
  },
  database_isolated: {
    name: "Pemisahan Database Mandiri (Database-per-Tenant)",
    recommendationLevel: "Hanya Jika Ada Regulasi / Kontrak Khusus",
    summary:
      "ByDaisy memiliki instance database PostgreSQL/MySQL fisik terpisah dengan connection string khusus (`DATABASE_URL_BYDAISY`).",
    pros: [
      "Isolasi keamanan fisik 100% (zero chance of data leakage).",
      "Resource CPU, RAM, dan IOPS 100% terdedikasi untuk ByDaisy tanpa terganggu tenant lain.",
      "Dapat ditempatkan pada region/cloud provider yang berbeda.",
    ],
    cons: [
      "Biaya operasional jauh lebih tinggi (membayar instance database terpisah per tenant).",
      "Sinkronisasi vendor terpusat dan analitik LUXIMA / AWEDZ membutuhkan integrasi API/ETL pipeline berkala (tidak bisa single relational JOIN).",
      "Beban maintenance migrasi ganda setiap ada rilis fitur baru.",
    ],
    idealFor:
      "Klien enterprise korporasi eksternal (Pemerintah/BUMN/White-label Bank) yang mewajibkan kedaulatan data fisik di server terisolasi.",
  },
};
