-- Crear tabla para almacenar los likes de los posts
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  likes INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas rápidas por slug
CREATE INDEX IF NOT EXISTS idx_post_likes_slug ON post_likes(slug);

-- Habilitar Row Level Security (RLS)
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura a todos
CREATE POLICY "Allow public read access" ON post_likes
  FOR SELECT
  TO public
  USING (true);

-- Política para permitir insert/update a usuarios autenticados o anónimos
-- (ajusta según tus necesidades de seguridad)
CREATE POLICY "Allow public insert" ON post_likes
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update" ON post_likes
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_post_likes_updated_at
  BEFORE UPDATE ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

