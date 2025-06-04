# 🍔 API de Fast Food

**Tech Challenge** do curso **Pós Tech em Arquitetura de Software** — Sistema de Autoatendimento de Fast Food.

**Fase 1**: Arquitetura Hexagonal — Projeto em **Node.js** com **TypeORM**, **PostgreSQL**, **Docker**, **Docker Compose** e **Typescript**.

<br>

## 🛠️ Instalação e execução

### ✅ 1. Clone o repositório

HTTPS

```sh
git clone https://github.com/ManoelaCunha/api-software-architecture-fiap.git
```

SSH

```sh
git clone git@github.com:ManoelaCunha/api-software-architecture-fiap.git
```

---

### ✅ 2. Instale as dependências

```sh
yarn install
```

---

### ✅ 3. Configure as variáveis de ambiente
Edite o arquivo .env conforme necessário.

```sh
cp .env.example .env
```

---

### ✅ 4. Construa e inicie os containers com Docker
Isso iniciará o banco de dados PostgreSQL e a aplicação Node.

```sh
docker-compose up --build -d
```

---

### ✅ 5. Inicie a aplicação

```sh
yarn dev
```

<br>

## 📈 Documentação com Swagger

- http://localhost:3000/api-docs

<br>
