-- ==============================================================================
-- ByDaisy Luxury Matrimonial Platform — Enterprise Multi-Tenant Database Schema
-- Architecture for LUXIMA CRM & AWEDZ Event Platform Ecosystem
-- Supports: 
--  Option 1: Shared Database with Row-Level Security (RLS) via tenant_id
--  Option 2: Schema-per-Tenant Isolation (e.g. tenant_bydaisy.*)
--  Option 3: Dedicated Isolated Enterprise Database
-- ==============================================================================

-- 0. Enterprise Tenants Registry (Platform-level for LUXIMA & AWEDZ)
CREATE TABLE IF NOT EXISTS enterprise_tenants (
  tenant_id VARCHAR(64) PRIMARY KEY,
  organization_id VARCHAR(64) NOT NULL,
  name VARCHAR(255) NOT NULL,
  custom_domain VARCHAR(255) UNIQUE,
  subdomain VARCHAR(128) UNIQUE,
  database_strategy VARCHAR(32) DEFAULT 'shared_rls', -- 'shared_rls', 'schema_isolated', 'database_isolated'
  dedicated_db_url VARCHAR(512),
  theme_config JSONB DEFAULT '{}'::jsonb,
  luxima_org_key VARCHAR(128),
  awedz_hub_id VARCHAR(128),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 1. Real Weddings Portfolio
CREATE TABLE IF NOT EXISTS real_weddings (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) NOT NULL DEFAULT 'bydaisy',
  organization_id VARCHAR(64) NOT NULL DEFAULT 'org_luxima_awedz',
  title VARCHAR(255) NOT NULL,
  couple_names VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  date VARCHAR(64) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  guest_count VARCHAR(64),
  cover_image VARCHAR(512) NOT NULL,
  photographer VARCHAR(255),
  mua VARCHAR(255),
  attire VARCHAR(255),
  story TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Journal & Tradisi Articles
CREATE TABLE IF NOT EXISTS journal_articles (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) NOT NULL DEFAULT 'bydaisy',
  organization_id VARCHAR(64) NOT NULL DEFAULT 'org_luxima_awedz',
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  author VARCHAR(128) NOT NULL,
  date VARCHAR(64) NOT NULL,
  read_time VARCHAR(64) NOT NULL,
  image VARCHAR(512) NOT NULL,
  excerpt TEXT NOT NULL,
  views INT DEFAULT 0,
  key_takeaways JSONB DEFAULT '[]'::jsonb,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Curated Circle Vendors (Cross-synced with LUXIMA / AWEDZ Master Directory)
CREATE TABLE IF NOT EXISTS vendors (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) NOT NULL DEFAULT 'bydaisy',
  organization_id VARCHAR(64) NOT NULL DEFAULT 'org_luxima_awedz',
  name VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  instagram VARCHAR(128),
  phone VARCHAR(64),
  email VARCHAR(128),
  location VARCHAR(255) NOT NULL,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  featured BOOLEAN DEFAULT false,
  deliverables JSONB DEFAULT '[]'::jsonb,
  price_range VARCHAR(64),
  is_platform_shared BOOLEAN DEFAULT false, -- If true, vendor is part of LUXIMA global network
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Client Reviews & Love Letters
CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) NOT NULL DEFAULT 'bydaisy',
  organization_id VARCHAR(64) NOT NULL DEFAULT 'org_luxima_awedz',
  couple_names VARCHAR(255) NOT NULL,
  wedding_date VARCHAR(64) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  package_name VARCHAR(128) NOT NULL,
  rating INT DEFAULT 5,
  quote TEXT NOT NULL,
  review TEXT NOT NULL,
  image VARCHAR(512),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tradisi & Cultural Heritage
CREATE TABLE IF NOT EXISTS cultural_traditions (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) NOT NULL DEFAULT 'bydaisy',
  region VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  philosophy TEXT NOT NULL,
  image VARCHAR(512) NOT NULL,
  rites JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Inquiry Leads (2-Way Synchronized with LUXIMA Cloud CRM)
CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) NOT NULL DEFAULT 'bydaisy',
  organization_id VARCHAR(64) NOT NULL DEFAULT 'org_luxima_awedz',
  client_name VARCHAR(255) NOT NULL,
  couple_names VARCHAR(255),
  whatsapp_number VARCHAR(64) NOT NULL,
  email VARCHAR(128),
  service_type VARCHAR(128) NOT NULL,
  event_date VARCHAR(64),
  estimated_guests VARCHAR(64),
  estimated_budget VARCHAR(64),
  venue_preference VARCHAR(255),
  special_notes TEXT,
  status VARCHAR(32) DEFAULT 'baru', -- 'baru', 'dihubungi', 'negosiasi', 'won', 'lost'
  luxima_synced BOOLEAN DEFAULT false,
  luxima_lead_id VARCHAR(128),
  awedz_synced BOOLEAN DEFAULT false,
  awedz_event_id VARCHAR(128),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Operational Calendar & Rundown (2-Way Synchronized with AWEDZ Event Platform)
CREATE TABLE IF NOT EXISTS calendar_events (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) NOT NULL DEFAULT 'bydaisy',
  organization_id VARCHAR(64) NOT NULL DEFAULT 'org_luxima_awedz',
  title VARCHAR(255) NOT NULL,
  event_type VARCHAR(64) NOT NULL, -- 'hari-h', 'gladi', 'tm', 'consultation'
  event_date VARCHAR(64) NOT NULL,
  event_time VARCHAR(64),
  venue VARCHAR(255),
  package_tier VARCHAR(128),
  crew_count VARCHAR(64),
  lead_planner VARCHAR(128),
  notes TEXT,
  awedz_synced BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Consultations (Lambhuk Studio / Zoom)
CREATE TABLE IF NOT EXISTS consultations (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) NOT NULL DEFAULT 'bydaisy',
  client_names VARCHAR(255) NOT NULL,
  date VARCHAR(64) NOT NULL,
  time VARCHAR(64) NOT NULL,
  type VARCHAR(64) NOT NULL, -- 'Studio Visit (Lambhuk)' or 'Virtual (Google Meet)'
  service_interest VARCHAR(128) NOT NULL,
  status VARCHAR(32) DEFAULT 'Confirmed',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Public Photo Gallery Archive
CREATE TABLE IF NOT EXISTS gallery_items (
  id VARCHAR(64) PRIMARY KEY,
  tenant_id VARCHAR(64) NOT NULL DEFAULT 'bydaisy',
  title VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  image VARCHAR(512) NOT NULL,
  location VARCHAR(255) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Studio Configuration & API Settings
CREATE TABLE IF NOT EXISTS studio_settings (
  tenant_id VARCHAR(64) NOT NULL DEFAULT 'bydaisy',
  key VARCHAR(64) NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tenant_id, key)
);

-- ==============================================================================
-- MULTI-TENANT ISOLATION POLICIES (Row-Level Security for PostgreSQL / Supabase)
-- ==============================================================================
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Dynamic Tenant Isolation Policy Example:
-- Enforces that queries executed with session variable 'app.current_tenant' only see ByDaisy data.
CREATE POLICY tenant_isolation_leads ON leads
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant', true) OR current_setting('app.is_super_admin', true) = 'true');

CREATE POLICY tenant_isolation_calendar ON calendar_events
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant', true) OR current_setting('app.is_super_admin', true) = 'true');

-- Multi-Tenant Composite Indexes for High Throughput
CREATE INDEX IF NOT EXISTS idx_leads_tenant_status ON leads(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_calendar_tenant_date ON calendar_events(tenant_id, event_date);
CREATE INDEX IF NOT EXISTS idx_weddings_tenant ON real_weddings(tenant_id, is_published);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON journal_articles(slug);
