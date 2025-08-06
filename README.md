# 🍔 API de Fast Food

**Tech Challenge** do curso **Pós Tech em Arquitetura de Software** — Sistema de Autoatendimento de Fast Food.

**Fase 2**: Arquitetura Limpa — Projeto em **Node.js** com **TypeORM**, **PostgreSQL**, **Docker**, **Docker Compose** e **Typescript**.

**Design System**: 

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

### ✅ 4. Inicie a aplicação localmente

```sh
yarn dev
```

---

### ✅ 5. Construa e inicie os containers com Docker
Isso iniciará o banco de dados PostgreSQL e a aplicação Node.

```sh
docker-compose up --build -d
```

---

### ✅ 5. Construa e inicie a aplicação com Kubernetes e Minikube
Isso iniciará o banco de dados PostgreSQL e a aplicação Node.

```sh
#Minikub
minikube start
eval $(minikube docker-env)

#Imagem Docker
docker build -t api-fiap:latest .

#Configurações
kubectl apply -f k8s/config/

#Banco de Dados
kubectl apply -f k8s/database/

#Aplicação
kubectl apply -f k8s/app/

```

<br>

## 📈 Documentação com Swagger

- Ambiente Local  http://localhost:3000/api-docs

- Docker Compose  http://localhost:3030/api-docs

- Kubernetes Minikub  http://192.168.49.2:30080/api-docs

<br>
