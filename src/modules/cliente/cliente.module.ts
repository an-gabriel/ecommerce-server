import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { Cliente } from './entity';
import { ClienteQueryService } from './queries/cliente-query.service';
import { ClienteCommandService } from './command/cliente-command.service';
import { ClienteQueryController } from './queries/cliente-query.controller';
import { ClienteCommandController } from './command/cliente-command.controller';
import { Repository } from 'typeorm';
import { Endereco } from '../endereco/entity';


@Module({
	imports: [TypeOrmModule.forFeature([Cliente, Endereco]),],
	controllers: [ClienteCommandController, ClienteQueryController],
	providers: [
		ClienteCommandService,
		ClienteQueryService
	],
	exports: [ClienteCommandService],
})
export class ClienteModule { }
