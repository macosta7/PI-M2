-- Adicionar coluna foto_perfil na tabela usuarios
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS foto_perfil TEXT;
