FROM node:16 AS builder
WORKDIR /app

# Wildcard para garantir que o package.json, o tsconfig.json e a pasta do prisma
# estejam na hora do build
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

RUN npm install 

COPY . . 

# Comando que vai gerar os mapeamentos da base de dados que serão usadas no prisma
# Elas ficam localizadas na node_modules
RUN npm run generate

# Transpila o código TS para JS e cria a pasta ./dist
RUN npm run build

# --------------------------------------------------------------------

FROM node:16

# A node_modules tem que estar no momento da execução do build em produção,
# por conta dos módulos do Prisma, criados após o comando npm run generate
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3700

# Comando de execução em produção
CMD ["npm", "run", "production"]
