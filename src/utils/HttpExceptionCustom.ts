import { HttpException, HttpStatus } from '@nestjs/common';

export class ForeignKeyConstraintViolationException extends HttpException {
	constructor(message: string) {
		super(message, HttpStatus.BAD_REQUEST);
	}
}
