import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entity';
import { CategoriaCommandService } from './command/categoria-command.service';
import { CategoriaCommandController } from './command/categoria-command.controller';
import { CategoriaQueryController } from './queries/categoria-query.controller';
import { CategoriaQueryService } from './queries/categoria-query.service';

@Module({
	imports: [TypeOrmModule.forFeature([Categoria])],
	controllers: [CategoriaCommandController, CategoriaQueryController],
	providers: [CategoriaCommandService, CategoriaQueryService],
	exports: [CategoriaCommandService],
})
export class CategoriaModule { }
