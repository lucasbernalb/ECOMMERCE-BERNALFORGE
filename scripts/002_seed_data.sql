-- Insert categories
INSERT INTO categories (name, slug, description, image_url) VALUES
  ('Power Tools', 'power-tools', 'Professional-grade power tools for any job', '/images/categories/power-tools.jpg'),
  ('Hand Tools', 'hand-tools', 'Quality hand tools built to last', '/images/categories/hand-tools.jpg'),
  ('Construction Tools', 'construction-tools', 'Heavy-duty construction equipment', '/images/categories/construction-tools.jpg'),
  ('Safety Equipment', 'safety-equipment', 'Protect yourself on the job', '/images/categories/safety-equipment.jpg'),
  ('Spare Parts', 'spare-parts', 'Replacement parts for your tools', '/images/categories/spare-parts.jpg'),
  ('Accessories', 'accessories', 'Tool accessories and add-ons', '/images/categories/accessories.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, brand, price, stock, category_id, description, technical_specs, images, featured, best_seller) VALUES
  -- Power Tools
  ('Professional Cordless Drill', 'professional-cordless-drill', 'DeWalt', 299.99, 50, 
    (SELECT id FROM categories WHERE slug = 'power-tools'),
    'High-performance 20V MAX cordless drill with brushless motor for maximum runtime and durability. Features a compact, lightweight design for working in tight spaces.',
    '{"voltage": "20V MAX", "chuck_size": "1/2 inch", "speed": "0-2000 RPM", "torque": "620 UWO", "weight": "3.5 lbs", "battery": "Lithium Ion"}',
    ARRAY['/images/products/drill-1.jpg', '/images/products/drill-2.jpg', '/images/products/drill-3.jpg'],
    true, true),
  
  ('Industrial Angle Grinder', 'industrial-angle-grinder', 'Makita', 189.99, 35,
    (SELECT id FROM categories WHERE slug = 'power-tools'),
    '7-inch industrial angle grinder with high power motor. Perfect for heavy-duty grinding, cutting, and polishing applications.',
    '{"power": "15 AMP", "disc_size": "7 inches", "speed": "8500 RPM", "weight": "6.6 lbs", "spindle": "5/8-11 UNC"}',
    ARRAY['/images/products/grinder-1.jpg', '/images/products/grinder-2.jpg'],
    true, false),
  
  ('Circular Saw Pro', 'circular-saw-pro', 'Milwaukee', 349.99, 25,
    (SELECT id FROM categories WHERE slug = 'power-tools'),
    'Professional circular saw with advanced blade guard system. Delivers clean, precise cuts in wood and composite materials.',
    '{"power": "15 AMP", "blade_size": "7-1/4 inches", "speed": "5800 RPM", "bevel_capacity": "56 degrees", "cut_depth_90": "2-1/2 inches"}',
    ARRAY['/images/products/circular-saw-1.jpg', '/images/products/circular-saw-2.jpg'],
    false, true),

  ('Impact Driver Kit', 'impact-driver-kit', 'Bosch', 249.99, 40,
    (SELECT id FROM categories WHERE slug = 'power-tools'),
    'Complete impact driver kit with two batteries, charger, and carrying case. Delivers 1800 in-lbs of torque.',
    '{"voltage": "18V", "torque": "1800 in-lbs", "speed": "0-3400 RPM", "impacts": "0-4000 BPM", "weight": "2.0 lbs"}',
    ARRAY['/images/products/impact-driver-1.jpg', '/images/products/impact-driver-2.jpg'],
    true, true),

  ('Reciprocating Saw', 'reciprocating-saw', 'DeWalt', 179.99, 30,
    (SELECT id FROM categories WHERE slug = 'power-tools'),
    'Heavy-duty reciprocating saw for demolition and remodeling work. Features tool-free blade change system.',
    '{"power": "12 AMP", "stroke_length": "1-1/8 inches", "speed": "0-3000 SPM", "weight": "7.0 lbs"}',
    ARRAY['/images/products/recip-saw-1.jpg'],
    false, false),

  -- Hand Tools
  ('Professional Tool Set 200pc', 'professional-tool-set-200pc', 'Stanley', 399.99, 20,
    (SELECT id FROM categories WHERE slug = 'hand-tools'),
    'Complete 200-piece professional tool set. Includes wrenches, sockets, pliers, screwdrivers, and more in a heavy-duty case.',
    '{"pieces": 200, "case_material": "Blow Molded", "socket_sizes": "SAE and Metric", "warranty": "Lifetime"}',
    ARRAY['/images/products/tool-set-1.jpg', '/images/products/tool-set-2.jpg'],
    true, true),

  ('Pipe Wrench Set', 'pipe-wrench-set', 'Ridgid', 89.99, 45,
    (SELECT id FROM categories WHERE slug = 'hand-tools'),
    'Set of 3 heavy-duty pipe wrenches. Includes 10", 14", and 18" sizes for professional plumbing work.',
    '{"sizes": ["10 inch", "14 inch", "18 inch"], "material": "Cast Iron", "finish": "Powder Coated"}',
    ARRAY['/images/products/pipe-wrench-1.jpg'],
    false, false),

  ('Precision Screwdriver Set', 'precision-screwdriver-set', 'Wiha', 49.99, 100,
    (SELECT id FROM categories WHERE slug = 'hand-tools'),
    '26-piece precision screwdriver set for electronics and delicate work. Features ergonomic handles.',
    '{"pieces": 26, "types": ["Phillips", "Slotted", "Torx", "Hex"], "handle": "Cushion Grip"}',
    ARRAY['/images/products/screwdriver-set-1.jpg'],
    false, true),

  -- Construction Tools
  ('Laser Level Pro', 'laser-level-pro', 'Bosch', 449.99, 15,
    (SELECT id FROM categories WHERE slug = 'construction-tools'),
    'Professional self-leveling rotary laser with horizontal and vertical lines. Perfect for construction and renovation projects.',
    '{"range": "200 ft", "accuracy": "1/8 inch at 33 ft", "leveling": "Self-leveling", "ip_rating": "IP54", "battery_life": "30 hours"}',
    ARRAY['/images/products/laser-level-1.jpg', '/images/products/laser-level-2.jpg'],
    true, false),

  ('Concrete Mixer 5 Cu Ft', 'concrete-mixer-5-cu-ft', 'Kushlan', 599.99, 10,
    (SELECT id FROM categories WHERE slug = 'construction-tools'),
    'Heavy-duty concrete mixer with 5 cubic foot drum capacity. Electric motor powered with tip-up drum design.',
    '{"capacity": "5 cu ft", "motor": "1/2 HP Electric", "drum_material": "Steel", "weight": "185 lbs"}',
    ARRAY['/images/products/concrete-mixer-1.jpg'],
    false, false),

  ('Demolition Hammer', 'demolition-hammer', 'Makita', 699.99, 12,
    (SELECT id FROM categories WHERE slug = 'construction-tools'),
    'Professional demolition hammer for heavy concrete breaking. Features anti-vibration technology.',
    '{"impact_energy": "23.7 ft-lbs", "blows_per_min": "1100", "weight": "31.5 lbs", "vibration": "8.5 m/s²"}',
    ARRAY['/images/products/demo-hammer-1.jpg'],
    true, true),

  -- Safety Equipment
  ('Hard Hat with Ratchet', 'hard-hat-ratchet', '3M', 34.99, 200,
    (SELECT id FROM categories WHERE slug = 'safety-equipment'),
    'OSHA-compliant hard hat with ratchet suspension system. Provides superior comfort and protection.',
    '{"type": "Type I Class E", "suspension": "4-point Ratchet", "material": "HDPE", "color": "Yellow"}',
    ARRAY['/images/products/hard-hat-1.jpg'],
    false, true),

  ('Safety Glasses Pack', 'safety-glasses-pack', 'Uvex', 24.99, 300,
    (SELECT id FROM categories WHERE slug = 'safety-equipment'),
    'Pack of 12 safety glasses with anti-fog coating. Meets ANSI Z87.1 standards.',
    '{"quantity": 12, "lens": "Clear Anti-Fog", "frame": "Black", "standard": "ANSI Z87.1"}',
    ARRAY['/images/products/safety-glasses-1.jpg'],
    false, false),

  ('Work Gloves Heavy Duty', 'work-gloves-heavy-duty', 'Mechanix', 29.99, 150,
    (SELECT id FROM categories WHERE slug = 'safety-equipment'),
    'Heavy-duty work gloves with reinforced palm and knuckle protection. Machine washable.',
    '{"material": "Synthetic Leather", "palm": "Reinforced", "cuff": "Hook and Loop", "sizes": ["S", "M", "L", "XL"]}',
    ARRAY['/images/products/gloves-1.jpg'],
    false, true),

  -- Spare Parts
  ('Drill Bit Set HSS', 'drill-bit-set-hss', 'DeWalt', 79.99, 80,
    (SELECT id FROM categories WHERE slug = 'spare-parts'),
    '29-piece high-speed steel drill bit set. Includes sizes from 1/16" to 1/2" in metal index case.',
    '{"pieces": 29, "material": "HSS", "coating": "Titanium", "range": "1/16 to 1/2 inch"}',
    ARRAY['/images/products/drill-bits-1.jpg'],
    false, true),

  ('Circular Saw Blades Pack', 'circular-saw-blades-pack', 'Freud', 59.99, 60,
    (SELECT id FROM categories WHERE slug = 'spare-parts'),
    'Pack of 3 premium circular saw blades. Includes general purpose, fine finish, and combination blades.',
    '{"quantity": 3, "diameter": "7-1/4 inches", "arbor": "5/8 inch", "teeth": ["24T", "40T", "60T"]}',
    ARRAY['/images/products/saw-blades-1.jpg'],
    false, false),

  -- Accessories
  ('Tool Belt Professional', 'tool-belt-professional', 'Occidental', 149.99, 40,
    (SELECT id FROM categories WHERE slug = 'accessories'),
    'Professional leather tool belt with 18 pockets. Features heavy-duty stitching and comfortable padding.',
    '{"pockets": 18, "material": "Top Grain Leather", "waist": "32-42 inches", "weight": "4.5 lbs"}',
    ARRAY['/images/products/tool-belt-1.jpg'],
    false, true),

  ('Extension Cord 100ft', 'extension-cord-100ft', 'Southwire', 79.99, 70,
    (SELECT id FROM categories WHERE slug = 'accessories'),
    '100-foot heavy-duty extension cord rated for outdoor use. Features lighted ends and SJTW jacket.',
    '{"length": "100 ft", "gauge": "12 AWG", "outlets": 3, "rating": "15A 125V", "jacket": "SJTW"}',
    ARRAY['/images/products/extension-cord-1.jpg'],
    false, false),

  ('Magnetic Tool Holder', 'magnetic-tool-holder', 'Master Magnetics', 24.99, 120,
    (SELECT id FROM categories WHERE slug = 'accessories'),
    '24-inch magnetic tool holder bar. Mounts easily to wall or workbench for organized tool storage.',
    '{"length": "24 inches", "holding_force": "65 lbs", "mounting": "Hardware Included"}',
    ARRAY['/images/products/tool-holder-1.jpg'],
    false, false)

ON CONFLICT (slug) DO NOTHING;
