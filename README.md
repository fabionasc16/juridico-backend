# API Jurídico v1.0.0

API destinada ao gerenciamento e controle de processos em andamento no âmbito jurídico da Secretaria de Estado da
Saúde do Amazonas

## Documentação das Rotas

[Documentação das Rotas](http://localhost:3700/api/v1/docs)

## Author

[André Lucas Freitas - @andrebatista2](https://www.github.com/andrebatista2)

## Ferramentas Utilizadas

- MySQL (v8.0.29)
- Node.js (v16.17.0)
- Yarn (v.1.22.19) ou NPM (v8.18.0)
- TypeScript (v4.8.3)
- Prisma Client (v4.3.1)
- Prisma ORM (v4.3.1)

---

## Deploy

Criação dos Métodos de Acesso aos Dados (Prisma ORM, executado após o yarn install ou npm install)

```bash
yarn generate

# ou

npm run generate
```

Desenvolvimento:

```bash
yarn development

# ou

npm run development
```

Build da Aplicação (TS para JS)

```bash
yarn build

# ou

npm run build
```

Produção (Local, executado após o comando de build e o generate do Prisma ORM)

```bash
yarn production

# ou

npm run production
```

Produção (Executando em Docker - pendente de testes)

```bash
docker-compose up -d --build
```
