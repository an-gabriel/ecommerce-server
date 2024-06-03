import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnderecoDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: '12345-678', description: 'CEP do endereço' })
	cep: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Rua das Flores', description: 'Rua do endereço' })
	rua: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Bairro A', description: 'Bairro do endereço' })
	bairro: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Cidade A', description: 'Cidade do endereço' })
	cidade: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: '123', description: 'Número do endereço' })
	numero: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'Apto 101', description: 'Complemento do endereço', required: false })
	complemento?: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'UF', description: 'Estado do endereço' })
	uf: string;
}
