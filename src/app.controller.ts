import { Controller, Redirect, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  @Redirect('swagger-ui', 301)
  app() {
    console.log('This will be redirected to the swagger doc');
  }
}
