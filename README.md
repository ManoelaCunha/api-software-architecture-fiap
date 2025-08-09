# 🍔 API de Fast Food

**Tech Challenge** do curso **Pós Tech em Arquitetura de Software** — Sistema de Autoatendimento de Fast Food.

**Fase 2**: Arquitetura Limpa — Projeto em **Node.js** com **TypeORM**, **PostgreSQL**, **Docker**, **Docker Compose** e **Typescript**.

<br>

**Diagrama de Arquitetura - Clean Architecture + Kubernetes**: 

![Diagram](docs/diagrama-arquitetura.drawio.svg)



### 🛠️ Instalação

#### ✅ 1. Clone o repositório

HTTPS

```sh
git clone https://github.com/ManoelaCunha/api-software-architecture-fiap.git
```

SSH

```sh
git clone git@github.com:ManoelaCunha/api-software-architecture-fiap.git
```

---

#### ✅ 2. Instale as dependências

```sh
yarn install
```

---

#### ✅ 3. Configure as variáveis de ambiente
Edite o arquivo .env conforme necessário.

```sh
cp .env.example .env
```

<br>

### 🧪 Como Executar e Acessar a API

### 🏠 Ambiente Local
> Para desenvolvimento com `.env` e execução direta com `yarn dev`:

```sh
yarn dev
```
📍 Acesse a API e a documentação Swagger:

```
http://localhost:3000/api-docs
```

---

### 🐳 Ambiente Docker Compose
> Inicie os containers com:

```sh
docker-compose up --build -d
```

📍 Acesse a API e a documentação Swagger:

```
http://localhost:3030/api-docs
```

---

### ☸️ Ambiente Kubernetes com Minikube
> Minikube simula um cluster Kubernetes local e expõe os serviços em uma rede separada da sua máquina (não é `localhost`).

#### ✅ 1. Inicie o Minikube
```sh
minikube start
```

#### ✅ 2. Configure o Docker para usar o ambiente do Minikube
> Isso permite que as imagens Docker sejam criadas dentro do ambiente do Minikube.

```sh
eval $(minikube docker-env)
```

#### ✅ 3. Construa a imagem da aplicação
> Este comando irá construir a imagem api-fiap:latest diretamente dentro do Docker do Minikube.

```sh
docker build -t api-fiap:latest .
```

#### ✅ 4. Configure os recursos do cluster

> Configurações
```sh
kubectl apply -f k8s/config/
```

> Banco de Dados
```sh
kubectl apply -f k8s/database/
```

> Aplicação
```sh
kubectl apply -f k8s/app/
```

#### ✅ 5. Descubra o IP do cluster

```bash
minikube ip
```
> Exemplo de saída: 192.168.49.2

<br>

📍 Acesse a API e a documentação Swagger:

```
http://192.168.49.2:30080/api-docs
```
> ⚠️ O IP pode variar entre máquinas ou sessões. Sempre confirme com `minikube ip`.

#### ✅ 6. Pause o Minikube

> Minikube
```sh
minikube stop
```

> Docker
```sh
eval $(minikube docker-env --unset)
```
