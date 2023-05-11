import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  BACKOFFICE_SERVICE,
  CreateCategoryDto,
  GetCategoryDto,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, of, switchMap } from 'rxjs';

@Controller('v1/categories')
export class CategoriesController {
  protected readonly logger = new Logger(CategoriesController.name);
  constructor(
    @Inject(BACKOFFICE_SERVICE) private readonly backofficeClient: ClientProxy,
  ) {}

  @Get()
  async getAllCategories() {
    return this.backofficeClient.send('all-categories', {});
  }

  @Get(':id')
  async getCategoryById(@Param() getCategoryDto: GetCategoryDto) {
    return this.backofficeClient.send('find-id-category', getCategoryDto).pipe(
      switchMap((category) => of(category)),
      catchError((err) => {
        console.log(err, 'error');
        throw new UnprocessableEntityException(err.message);
      }),
    );
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    this.logger.log(createCategoryDto, ' create category');
    return this.backofficeClient
      .send('create-category', createCategoryDto)
      .pipe(
        switchMap((data) => of(data)),
        catchError((err) => {
          console.log(err, 'error');
          throw new InternalServerErrorException(err.message);
        }),
      );
  }
}
