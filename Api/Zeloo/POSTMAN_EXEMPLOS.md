# Exemplos de Requisições Postman

## 1. Criar Usuário com Tipo Idoso

**Método:** `POST`  
**URL:** `http://localhost:8000/api/usuario`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "nomeUsuario": "João Silva",
  "telefoneUsuario": "11987654321",
  "emailUsuario": "joao.silva@exemplo.com",
  "senhaUsuario": "senha123",
  "dataNasc": "1950-05-15",
  "tipoUsuario": "idoso"
}
```

**Resposta de Sucesso (201):**
```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "idUsuario": 1,
    "nomeUsuario": "João Silva",
    "telefoneUsuario": "11987654321",
    "emailUsuario": "joao.silva@exemplo.com",
    "tipoUsuario": "idoso",
    "statusUsuario": "ativo",
    ...
  }
}
```

**Nota:** Guarde o `idUsuario` da resposta para usar no banimento!

---

## 2. Banir Usuário

**Método:** `POST`  
**URL:** `http://localhost:8000/api/banir-usuario`  
**Headers:**
```
Content-Type: application/json
Accept: application/json
```

**Body (raw JSON):**
```json
{
  "idUsuario": 1,
  "motivoDenuncia": "Violação dos Termos de Uso",
  "descDenuncia": "Usuário foi reportado por comportamento inadequado e múltiplas denúncias de outros usuários.",
  "evidenciaDenuncia": "Screenshots das denúncias anexadas no sistema administrativo."
}
```

**Resposta de Sucesso (200):**
```json
{
  "success": true,
  "message": "Usuário banido com sucesso!",
  "data": {
    "idUsuario": 1,
    "nomeUsuario": "João Silva",
    "statusUsuario": "inativo"
  }
}
```

---

## 3. Desbanir Usuário

**Método:** `DELETE`  
**URL:** `http://localhost:8000/desbanir/{idUsuario}`  
**Exemplo:** `http://localhost:8000/desbanir/1`

**Headers:**
```
Accept: application/json
```

**Body:** Não necessário

---

## Exemplo Completo de Teste

1. **Criar usuário:**
   - Use o exemplo 1 acima
   - Copie o `idUsuario` da resposta

2. **Banir o usuário:**
   - Use o exemplo 2 acima
   - Substitua `idUsuario` pelo ID copiado

3. **Verificar banimento:**
   - O status do usuário será alterado para `inativo`
   - Uma denúncia será criada na tabela `denuncias`

4. **Desbanir (opcional):**
   - Use o exemplo 3 acima
   - O usuário voltará para status `ativo`

