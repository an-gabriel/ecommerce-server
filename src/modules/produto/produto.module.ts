import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Produto } from './entity';
import { ProdutoQueryService } from './queries/produto-query.service';
import { ProdutoCommandService } from './command/produto-command.service';
import { ProdutoQueryController } from './queries/produto-query.controller';
import { ProdutoCommandController } from './command/produto-command.controller';
import { Categoria } from '../categoria/entity';


@Module({
	imports: [TypeOrmModule.forFeature([Produto, Categoria])],
	controllers: [ProdutoCommandController, ProdutoQueryController],
	providers: [ProdutoCommandService, ProdutoQueryService],
	exports: [ProdutoCommandService],
})
export class ProdutoModule { }
