import { IsString, IsOptional, IsEmail, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClienteDto {
	@IsEmail()
	@IsOptional()
	@ApiProperty({ example: 'cliente@exemplo.com', description: 'Email do cliente', required: false })
	email?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'cliente123', description: 'Username do cliente', required: false })
	username?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'senha123', description: 'Senha do cliente', required: false })
	senha?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: 'Nome do Cliente', description: 'Nome do cliente', required: false })
	nome?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: '12345678901', description: 'CPF do cliente', required: false })
	cpf?: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: '11999999999', description: 'Telefone do cliente', required: false })
	telefone?: string;

	@IsDateString()
	@IsOptional()
	@ApiProperty({ example: '1990-01-01', description: 'Data de nascimento do cliente', required: false })
	data_nascimento?: string;

	@IsOptional()
	@IsNotEmpty()
	@ApiProperty({ example: 1, description: 'ID do endereço do cliente', required: false })
	endereco_id?: number;
}
