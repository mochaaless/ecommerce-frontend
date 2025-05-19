# Etapa 1: Build
FROM node:lts-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir build con un servidor estático (por ejemplo, 'serve')
FROM node:lts-alpine

WORKDIR /app

# Instala servidor estático
RUN npm install -g serve

# Copia el build generado desde la etapa anterior
COPY --from=builder /app/dist ./dist

EXPOSE 8084

# Sirve la carpeta /dist
CMD ["serve", "-s", "dist", "-l", "8084"]
