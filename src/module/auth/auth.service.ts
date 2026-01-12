import { Injectable } from '@nestjs/common';
import DatabaseService from 'src/database/database.service';

@Injectable()
class AuthService {
  constructor(private readonly db: DatabaseService) {}

  async login() {
    //
  }
}

export default AuthService;
