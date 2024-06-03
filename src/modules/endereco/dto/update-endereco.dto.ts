import { IsString, IsNotEmpty, IsOptional, IsPostalCode } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEnderecoDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Rua das Flores', description: 'Rua do endereço', required: false })
	rua?: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Bairro A', description: 'Bairro do endereço', required: false })
	bairro?: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Cidade A', description: 'Cidade do endereço', required: false })
	cidade?: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: '123', description: 'Número do endereço', required: false })
	numero?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'Apto 101', description: 'Complemento do endereço', required: false })
	complemento?: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Estado A', description: 'Estado do endereço', required: false })
	uf?: string;

	@IsPostalCode('BR')
	@IsOptional()
	@ApiProperty({ example: '12345-678', description: 'CEP do endereço', required: false })
	cep?: string;
}
