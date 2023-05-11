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

@Controller()
export class ApiController {}
