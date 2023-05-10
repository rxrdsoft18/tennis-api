import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  Post,
} from '@nestjs/common';
import { BACKOFFICE_SERVICE, CreateCategoryDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, of, switchMap } from 'rxjs';

@Controller('v1')
export class ApiController {
  protected readonly logger = new Logger(ApiController.name);
  constructor(
    @Inject(BACKOFFICE_SERVICE) private readonly backofficeClient: ClientProxy,
  ) {}

  @Get('categories')
  async getAllCategories() {
    return this.backofficeClient.send('all-categories', {});
  }

  @Post('categories')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    this.logger.log(createCategoryDto, ' create category');
    return this.backofficeClient
      .send('create-category', createCategoryDto)
      .pipe(
        switchMap((data) => of(data)),
        catchError((err) => {
          console.log(err, 'error');
          throw new InternalServerErrorException();
        }),
      );
  }
}
