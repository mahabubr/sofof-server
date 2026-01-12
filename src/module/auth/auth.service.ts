import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';
import LoginDTO from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDTO) {
    const { email, password } = body;

    let existUser = await this.db.user.findUnique({ where: { email } });

    if (!existUser) {
      const salt = +(process.env.SALT_ROUND as string);

      const hash = await bcrypt.hash(password, salt);

      existUser = await this.db.user.create({ data: { email, password: hash } });
    }

    const token = this.jwtService.sign({ id: existUser.id, email: existUser.email });

    return { user: { id: existUser.id }, token };
  }
}

export default AuthService;
