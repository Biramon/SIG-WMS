FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# O COPY serve como fallback, o volume vai sobrescrever isso em runtime
COPY . .

# Expõe a porta padrão do servidor de desenvolvimento (geralmente 5173 no Vite)
EXPOSE 5174

CMD ["npm", "run", "dev", "--", "--host"]