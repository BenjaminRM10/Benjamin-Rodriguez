-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: contact_messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT, -- 'form', 'roi_calculator'
  roi_calculation_id UUID, -- Foreign key added later if table exists
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE,
  responded BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_read ON contact_messages(read);

-- Table: roi_calculations
CREATE TABLE IF NOT EXISTS roi_calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_description TEXT NOT NULL,
  hours_per_week NUMERIC NOT NULL,
  hourly_cost NUMERIC NOT NULL,
  people_count INTEGER NOT NULL,
  weekly_hours_saved NUMERIC,
  monthly_cost_saved NUMERIC,
  annual_roi NUMERIC,
  payback_period_months NUMERIC,
  feasibility TEXT, -- 'high', 'medium', 'low'
  recommended_solution TEXT,
  tools_suggested TEXT[],
  implementation_weeks INTEGER,
  ai_response JSONB, -- Full Gemini response
  search_results JSONB, -- Tavily/Brave results
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_roi_created ON roi_calculations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_roi_feasibility ON roi_calculations(feasibility);

-- Add Foreign Key contact_messages -> roi_calculations
ALTER TABLE contact_messages 
ADD CONSTRAINT fk_roi_calculation 
FOREIGN KEY (roi_calculation_id) 
REFERENCES roi_calculations(id);

-- Table: page_analytics (optional)
CREATE TABLE IF NOT EXISTS page_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL, -- 'page_view', 'cta_click', 'section_view'
  event_data JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
