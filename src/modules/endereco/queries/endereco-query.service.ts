import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from '../entity';

@Injectable()
export class EnderecoQueryService {
    constructor(
        @InjectRepository(Endereco)
        private readonly enderecoRepository: Repository<Endereco>,
    ) { }

    async findAll(): Promise<Endereco[]> {
        return this.enderecoRepository.find();
    }

    async findOne(endereco_id: number): Promise<Endereco> {
        return this.enderecoRepository.findOne({ where: { endereco_id } });
    }
}
