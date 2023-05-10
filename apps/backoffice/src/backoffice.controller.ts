import { Controller, Get, Logger } from '@nestjs/common';

@Controller()
export class BackofficeController {
  protected readonly logger = new Logger(BackofficeController.name);

}
