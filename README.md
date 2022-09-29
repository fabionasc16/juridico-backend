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
- Yarn (v.1.22.19) ou NPM (v8.18.0) - Yarn já vem incluso na imagem Docker do Node 16
- TypeScript (v4.8.3)
- Prisma Client (v4.3.1)
- Prisma ORM (v4.3.1)

---

## Deploy do Projeto

Instale as dependências do projeto:

```bash
yarn install
```

## Deploy das Migrations

Criação dos Métodos de Acesso aos Dados (Prisma ORM)

```bash
yarn generate
```

Desenvolvimento:

```bash
yarn development
```

Build da Aplicação (TS para JS)

```bash
yarn build
```

Produção (Local, executado após o comando de build e o generate do Prisma ORM)

```bash
yarn production
```
