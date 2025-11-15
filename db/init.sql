-- GreenTech Solutions Database Schema
-- PostgreSQL Database Initialization Script

-- Drop existing tables if they exist
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS awards CASCADE;
DROP TABLE IF EXISTS timeline_events CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Products Table (Enhanced with pricing and installation details)
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  installation_time VARCHAR(100),
  installation_details TEXT,
  warranty VARCHAR(100),
  efficiency VARCHAR(100),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team Members Table
CREATE TABLE team_members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Timeline Events Table
CREATE TABLE timeline_events (
  id SERIAL PRIMARY KEY,
  year VARCHAR(10) NOT NULL,
  milestone VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  impact VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Awards Table
CREATE TABLE awards (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year VARCHAR(10) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials Table
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Submissions Table
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Data

-- Products (15 products with detailed information)
INSERT INTO products (name, category, description, price, installation_time, installation_details, warranty, efficiency, image_url) VALUES
('SolarMax Pro 400W', 'Solar Panels', 'High-efficiency monocrystalline solar panel with superior performance in low-light conditions. Perfect for residential rooftops.', 599.99, '2-4 hours', 'Professional installation required. Includes mounting hardware, wiring, and inverter connection. Roof inspection recommended before installation.', '25 years', '22.5% conversion efficiency', '/api/images/solar.png'),

('WindGen Turbine 5kW', 'Wind Energy', 'Residential wind turbine suitable for properties with consistent wind speeds. Whisper-quiet operation with advanced blade design.', 12999.99, '1-2 days', 'Requires concrete foundation and tower installation. Professional assessment of wind patterns recommended. Includes remote monitoring system.', '10 years', '45% energy capture', '/api/images/wind.png'),

('PowerVault Battery 10kWh', 'Energy Storage', 'Lithium-ion battery storage system for home energy independence. Seamless backup power during outages.', 8999.99, '4-6 hours', 'Indoor or outdoor installation available. Requires electrical panel upgrade in some cases. Smart home integration included.', '15 years', '95% round-trip efficiency', '/api/images/battery.png'),

('SolarMax Commercial 550W', 'Solar Panels', 'Industrial-grade bifacial solar panels designed for maximum energy production. Ideal for commercial buildings and solar farms.', 899.99, '3-5 hours', 'Mounting system customizable for ground or rooftop. Includes microinverters and monitoring equipment. Site survey required.', '30 years', '23.8% conversion efficiency', '/api/images/solar.png'),

('EcoCharge EV Station', 'Electric Vehicle', 'Level 2 EV charging station compatible with all electric vehicles. Smart scheduling and solar integration.', 1499.99, '2-3 hours', 'Requires 240V circuit installation. Wall-mounted or pedestal options. WiFi connectivity for remote monitoring.', '5 years', 'Up to 44 miles range/hour', '/api/images/battery.png'),

('HydroFlow Micro Turbine', 'Hydro Power', 'Small-scale hydroelectric generator for properties with flowing water. Continuous 24/7 clean energy production.', 6999.99, '1-2 days', 'Requires water flow assessment and permit approval. Professional installation with water diversion setup. Maintenance twice yearly.', '20 years', '75% conversion efficiency', '/api/images/wind.png'),

('SunTrack Dual-Axis', 'Solar Panels', 'Automated solar tracking system that follows the sun for maximum energy capture. Increases output by up to 40%.', 15999.99, '2-3 days', 'Ground installation with concrete foundation. Includes weather sensors and automated controls. Annual maintenance recommended.', '15 years', '40% increased output', '/api/images/solar.png'),

('PowerVault Grid-Tie 5kWh', 'Energy Storage', 'Grid-connected battery system with net metering support. Perfect for maximizing solar ROI and time-of-use optimization.', 5499.99, '3-4 hours', 'Professional electrical work required. Utility company approval needed. Smartphone app for monitoring included.', '12 years', '92% round-trip efficiency', '/api/images/battery.png'),

('WindMaster Commercial 25kW', 'Wind Energy', 'Large-scale wind turbine for commercial and agricultural applications. Proven reliability in harsh conditions.', 45999.99, '5-7 days', 'Crane installation required. Environmental impact study may be needed. Includes 5-year maintenance package.', '20 years', '48% energy capture', '/api/images/wind.png'),

('SolarFlex Portable 200W', 'Solar Panels', 'Foldable portable solar panel system perfect for RVs, boats, and off-grid cabins. Lightweight and durable.', 399.99, '30 minutes', 'DIY-friendly plug-and-play installation. Includes charge controller and battery cables. No electrical expertise required.', '5 years', '21% conversion efficiency', '/api/images/solar.png'),

('ThermalStore Heat Battery', 'Energy Storage', 'Thermal energy storage system for heating and hot water. Integrates with solar thermal and heat pumps.', 7499.99, '1-2 days', 'Professional plumbing and electrical installation. Tank placement requires structural assessment. Smart thermostat included.', '20 years', '88% thermal efficiency', '/api/images/battery.png'),

('SolarRoof Integrated Tiles', 'Solar Panels', 'Architectural solar roof tiles that replace traditional roofing. Beautiful aesthetics with powerful performance.', 24999.99, '1-2 weeks', 'Complete roof replacement installation. Structural engineering required. Includes roof warranty and waterproofing.', '25 years', '19.5% conversion efficiency', '/api/images/solar.png'),

('BioGen Fuel Cell', 'Alternative Energy', 'Combined heat and power system running on biogas or natural gas. Continuous electricity and hot water production.', 18999.99, '3-4 days', 'Gas line connection and ventilation required. Professional HVAC integration. Annual service contract recommended.', '10 years', '90% total efficiency', '/api/images/wind.png'),

('SmartGrid Controller', 'Energy Management', 'AI-powered energy management system that optimizes usage across all renewable sources. Real-time monitoring and control.', 2999.99, '4-6 hours', 'Integrates with existing solar, wind, and battery systems. Cloud-based analytics and smartphone control. Professional configuration.', '7 years', '30% optimization gains', '/api/images/battery.png'),

('Community Solar Share', 'Solar Panels', 'Subscription-based access to community solar farm. No installation required - immediate energy savings and environmental impact.', 49.99, 'No installation', 'Virtual net metering credits applied to utility bill. Cancel anytime. Support local renewable energy development.', 'N/A', 'Varies by location', '/api/images/solar.png');

-- Team Members
INSERT INTO team_members (name, role, bio, photo_url) VALUES
('Sarah Johnson', 'Chief Executive Officer', '15+ years leading renewable energy initiatives with a vision for sustainable innovation.', '/api/images/ceo.png'),
('Michael Chen', 'Chief Technology Officer', 'Technology visionary with expertise in solar and wind energy systems development.', '/api/images/cto.png'),
('Emily Rodriguez', 'Lead Engineer', 'Passionate about designing next-generation clean energy solutions for global impact.', '/api/images/engineer.png'),
('David Thompson', 'Operations Manager', 'Ensuring seamless project execution and customer satisfaction across all installations.', '/api/images/ops.png');

-- Timeline Events
INSERT INTO timeline_events (year, milestone, description, impact) VALUES
('2010', 'Company Founded', 'GreenTech Solutions established with a mission to revolutionize renewable energy accessibility.', '5 founding members, $500K seed funding'),
('2012', 'First Solar Installation', 'Completed our first major commercial solar panel installation for a Fortune 500 company.', '500 kW capacity, 200 tons CO₂ saved annually'),
('2015', 'Wind Division Launch', 'Expanded services to include residential and commercial wind turbine solutions.', '150+ installations, 2 MW total capacity'),
('2017', 'International Expansion', 'Opened offices in London and Singapore to serve European and Asian markets.', '3 new markets, 50+ employees'),
('2019', 'Energy Storage Innovation', 'Launched proprietary battery storage system with 95% efficiency rating.', 'Patent filed, 1,000+ units sold'),
('2021', '10,000 Customers Milestone', 'Reached 10,000 satisfied customers across residential and commercial sectors.', '15 MW installed capacity, 10,000 tons CO₂ reduced'),
('2023', 'Carbon Neutral Achievement', 'Company operations became 100% carbon neutral through renewable energy usage.', 'Zero emissions operations, industry leadership'),
('2025', 'AI-Powered Energy Management', 'Introduced AI-driven energy optimization platform for smart grid integration.', '30% efficiency improvement for customers');

-- Awards
INSERT INTO awards (name, year, description) VALUES
('🏆 Clean Energy Innovator of the Year', '2023', 'Recognized by the Global Renewable Energy Association for groundbreaking advancements in solar technology.'),
('🌟 Best Green Technology Startup', '2018', 'Awarded by TechCrunch for exceptional growth and impact in the renewable energy sector.'),
('🌍 Sustainability Leadership Award', '2021', 'Honored by the Environmental Protection Council for outstanding commitment to carbon reduction.'),
('💡 Top 100 Clean Tech Companies', '2024', 'Listed in Forbes'' prestigious ranking of companies driving the clean energy revolution.'),
('⚡ Innovation Excellence Award', '2022', 'Received from the International Energy Agency for pioneering battery storage solutions.'),
('❤️ Community Impact Award', '2020', 'Recognized for providing affordable solar solutions to underserved communities.'),
('🔋 Battery Technology Breakthrough', '2024', 'Awarded for developing the industry''s most efficient home energy storage system.'),
('☀️ Solar Excellence Award', '2019', 'National Solar Energy Association recognition for installation quality and customer satisfaction.');

-- Testimonials
INSERT INTO testimonials (customer_name, company, message) VALUES
('Jennifer Martinez', 'Tech Innovators Inc.', 'GreenTech Solutions transformed our energy infrastructure. We''ve reduced costs by 65% and achieved our sustainability goals ahead of schedule.'),
('Robert Kim', 'Urban Living Apartments', 'The solar installation was seamless and professional. Our residents love knowing they''re living in an eco-friendly building.'),
('Amanda Foster', 'Foster Family Residence', 'Our home energy bills have dropped dramatically since installing their solar system. Best investment we''ve ever made!'),
('Marcus Thompson', 'Thompson Manufacturing', 'The wind turbines have exceeded our expectations. Excellent quality and outstanding customer support from the GreenTech team.'),
('Lisa Chen', 'Greenway Retail Chain', 'Their energy storage solution allows us to operate sustainably 24/7. Truly impressed with the technology and service.'),
('David Park', 'Park Vineyard Estate', 'Going green with GreenTech was the right choice for our business and the planet. Highly recommend their services.');
