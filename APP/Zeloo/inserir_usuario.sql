-- ============================================
-- Script SQL para inserir novos usuários
-- Baseado nos campos do cadastro do app Zeloo
-- ============================================

-- Exemplo 1: Inserir usuário IDOSO (sem foto)
INSERT INTO usuario (
    nomeUsuario,
    telefoneUsuario,
    senhaUsuario,
    tipoUsuario,
    dataNasc,
    fotoUsuario,
    created_at,
    updated_at
) VALUES (
    'João Silva',
    '11987654321',
    'senha123',  -- Nota: Em produção, a senha deve ser criptografada (hash)
    'idoso',
    '1950-05-15',  -- Formato: YYYY-MM-DD
    NULL,  -- Sem foto
    NOW(),
    NOW()
);

-- Exemplo 2: Inserir usuário FAMILIAR (sem foto)
INSERT INTO usuario (
    nomeUsuario,
    telefoneUsuario,
    senhaUsuario,
    tipoUsuario,
    dataNasc,
    fotoUsuario,
    created_at,
    updated_at
) VALUES (
    'Maria Santos',
    '11912345678',
    'senha456',  -- Nota: Em produção, a senha deve ser criptografada (hash)
    'familiar',
    '1980-03-20',
    NULL,
    NOW(),
    NOW()
);

-- Exemplo 3: Inserir usuário IDOSO (com foto)
INSERT INTO usuario (
    nomeUsuario,
    telefoneUsuario,
    senhaUsuario,
    tipoUsuario,
    dataNasc,
    fotoUsuario,
    created_at,
    updated_at
) VALUES (
    'Pedro Oliveira',
    '11955554444',
    'senha789',
    'idoso',
    '1945-11-10',
    'fotos/perfil_pedro.jpg',  -- Caminho relativo ou URL da foto
    NOW(),
    NOW()
);

-- Exemplo 4: Inserir usuário FAMILIAR (com foto)
INSERT INTO usuario (
    nomeUsuario,
    telefoneUsuario,
    senhaUsuario,
    tipoUsuario,
    dataNasc,
    fotoUsuario,
    created_at,
    updated_at
) VALUES (
    'Ana Costa',
    '11999998888',
    'senha321',
    'familiar',
    '1985-07-25',
    'fotos/perfil_ana.png',
    NOW(),
    NOW()
);

-- ============================================
-- IMPORTANTE: 
-- ============================================
-- 1. A senha deve ser criptografada antes de inserir no banco
--    Use hash (ex: bcrypt, SHA-256) no backend antes de salvar
--
-- 2. O campo idUsuario geralmente é AUTO_INCREMENT (MySQL)
--    ou SERIAL (PostgreSQL), então não precisa ser especificado
--
-- 3. Os campos created_at e updated_at podem não existir
--    na sua tabela - ajuste conforme necessário
--
-- 4. O formato da data deve ser YYYY-MM-DD (formato SQL padrão)
--
-- 5. O telefone deve ser apenas números (sem caracteres especiais)
--    Exemplo: '11987654321' ao invés de '(11) 98765-4321'
--
-- ============================================
-- Versão com senha criptografada (exemplo usando MD5 - não recomendado para produção)
-- ============================================
-- INSERT INTO usuario (
--     nomeUsuario,
--     telefoneUsuario,
--     senhaUsuario,
--     tipoUsuario,
--     dataNasc,
--     fotoUsuario
-- ) VALUES (
--     'João Silva',
--     '11987654321',
--     MD5('senha123'),  -- Apenas exemplo - use bcrypt no backend
--     'idoso',
--     '1950-05-15',
--     NULL
-- );

-- ============================================
-- Versão simplificada (sem created_at/updated_at)
-- ============================================
-- INSERT INTO usuario (
--     nomeUsuario,
--     telefoneUsuario,
--     senhaUsuario,
--     tipoUsuario,
--     dataNasc,
--     fotoUsuario
-- ) VALUES (
--     'João Silva',
--     '11987654321',
--     'senha123',
--     'idoso',
--     '1950-05-15',
--     NULL
-- );

