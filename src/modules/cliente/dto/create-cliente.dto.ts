import { IsString, IsNotEmpty, IsEmail, IsOptional, IsDateString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
	@IsEmail()
	@IsOptional()
	@ApiProperty({ example: 'cliente@exemplo.com', description: 'Email do cliente', required: false })
	email?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'cliente123', description: 'Username do cliente', required: false })
	username?: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'senha123', description: 'Senha do cliente' })
	senha: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: 'Nome do Cliente', description: 'Nome do cliente' })
	nome: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: '12345678901', description: 'CPF do cliente' })
	cpf: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: '11999999999', description: 'Telefone do cliente', required: false })
	telefone?: string;

	@IsDateString()
	@IsOptional()
	@ApiProperty({ example: '1990-01-01', description: 'Data de nascimento do cliente', required: false })
	data_nascimento?: string;

	@IsNotEmpty()
	@ApiProperty({ example: 1, description: 'ID do endereço do cliente' })
	endereco_id: number;
}
