import { Injectable } from '@nestjs/common';

@Injectable()
class AppService {
  health(): string {
    return 'OK !';
  }
}

export default AppService;
