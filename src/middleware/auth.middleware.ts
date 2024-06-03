import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenValido } from './auth.token';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		if (req.originalUrl.startsWith('/api')) {
			return next();
		}

		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return res.status(401).json({ message: 'Não autorizado' });
		}
		if (token !== TokenValido.VALIDO) {
			return res.status(401).json({ message: 'Não autorizado' });
		}
		next();
	}
}
