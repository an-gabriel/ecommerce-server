# Use a imagem Node.js
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instale o @nestjs/cli globalmente
RUN npm install -g @nestjs/cli

# Copie os arquivos de dependência do package.json e yarn.lock para dentro do contêiner
COPY package*.json ./

# Instale as dependências, incluindo a opção --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copie o código-fonte da sua aplicação para dentro do contêiner
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "npm", "run", "start" ]
