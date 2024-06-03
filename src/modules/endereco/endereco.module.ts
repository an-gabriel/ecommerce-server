import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Endereco } from './entity';
import { EnderecoQueryService } from './queries/endereco-query.service';
import { EnderecoCommandService } from './command/endereco-command.service';
import { EnderecoQueryController } from './queries/endereco-query.controller';
import { EnderecoCommandController } from './command/endereco-command.controller';


@Module({
	imports: [TypeOrmModule.forFeature([Endereco])],
	controllers: [EnderecoCommandController, EnderecoQueryController],
	providers: [EnderecoCommandService, EnderecoQueryService],
	exports: [EnderecoCommandService],
})
export class EnderecoModule { }
