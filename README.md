# Configuração do Ambiente

## Requisitos

- Docker
- Docker Compose
- Node.js
- Nest.js

## Passos para iniciar o servidor Nest.js com PostgreSQL local

1. **Clone o repositório**

   ```sh
   git clone git@github.com:an-gabriel/ecommerce-server.git
   cd ecommerce-server
   ```

2. **Configurar o Docker e o PostgreSQL**

   - Certifique-se de que o Docker e o Docker Compose estão instalados.
   - Crie um arquivo `docker-compose.yml` na raiz do projeto com o seguinte conteúdo:

     ```yaml
     version: '3'

     services:
       postgres:
         image: postgres:latest
         environment:
           POSTGRES_USER: postgres
           POSTGRES_PASSWORD: postgres
           POSTGRES_DB: dev-database
         ports:
           - "5432:5432"
         volumes:
           - postgres_data:/var/lib/postgresql/data

     volumes:
       postgres_data:
     ```

   - Inicie os serviços do Docker:

     ```sh
     docker-compose up -d
     ```

3. **Configurar o Nest.js**

   - Certifique-se de que o Nest.js está instalado globalmente ou que você tenha configurado o script de inicialização no `package.json` do seu projeto.
   - Configure o arquivo `src/app.module.ts` para conectar-se ao banco de dados PostgreSQL no Docker:

     ```typescript
     import { Module } from '@nestjs/common';
     import { TypeOrmModule } from '@nestjs/typeorm';
     import { AppController } from './app.controller';
     import { AppService } from './app.service';
     import { dataConnection } from './data.connection';

     @Module({
       imports: [
         TypeOrmModule.forRoot(dataConnection),
       ],
       controllers: [AppController],
       providers: [AppService],
     })
     export class AppModule {}
     ```

4. **Executar as Migrações**

   - Após iniciar o PostgreSQL no Docker, execute as migrações do banco de dados usando o TypeORM:

     ```sh
     npm run typeorm:run
     ```

5. **Iniciar o Servidor Nest.js**

   - Inicie o servidor Nest.js:

     ```sh
     npm run start:dev

## Passos para iniciar o servidor Nest.js com PostgreSQL em Docker

1. **Clone o repositório**

	```sh
	git clone git@github.com:an-gabriel/ecommerce-server.git
	cd ecommerce-server
	```

2. **Configurar o Docker e o PostgreSQL**

	- Certifique-se de que o Docker e o Docker Compose estão instalados.
	- Edite o arquivo `docker-compose.yml` na raiz do projeto com as credentials do banco:


		```yaml
		version: '3'

		services:
		postgres:
			image: postgres:latest
			environment:
			POSTGRES_USER: <postgres>
			POSTGRES_PASSWORD: <postgres>
			POSTGRES_DB: <seu-database>
			ports:
			- "5432:5432"
			volumes:
			- postgres_data:/var/lib/postgresql/data

		volumes:
		postgres_data:
		```

    - Inicie os serviços do Docker:

		```sh
			docker-compose up -d
		```

4. **Swagger**

	Acesse o swagger : http://localhost:3000/api
	Acesse o swagger : http://localhost:3000/api-json



## IMPORTANTE

	- Informar essa chave no cabeçalho da requisição : b44dc311-7a9e-408b-8d7b-96667a17e291 no lugar do JWT
	ps. obtei uma autenticaçao mais simples, entretanto poderia ter colocado ssl, JWT de fato e/ou até algo que simule o cognito.

Agora você pode acessar o servidor Nest.js em http://localhost:3000 e interagir com a API. Certifique-se de atualizar as configurações de conexão com o banco de dados PostgreSQL conforme necessário.