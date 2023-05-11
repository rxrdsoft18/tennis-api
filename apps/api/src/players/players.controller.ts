import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  BACKOFFICE_SERVICE,
  CreatePlayerDto,
  GetPlayerDto,
  UpdatePlayerDto,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, map, of, switchMap } from 'rxjs';

@Controller('v1/players')
export class PlayersController {
  protected readonly logger = new Logger(PlayersController.name);

  constructor(
    @Inject(BACKOFFICE_SERVICE) private readonly backofficeClient: ClientProxy,
  ) {}

  @Get()
  async getAll() {
    return this.backofficeClient.send('all-players', {});
  }

  @Get(':id')
  async findById(@Param() getPlayerDto: GetPlayerDto) {
    return this.backofficeClient.send('find-id-player', getPlayerDto).pipe(
      switchMap((player) => of(player)),
      catchError((err) => {
        console.log(err, 'error');
        throw new BadRequestException(err.message);
      }),
    );
  }

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    await firstValueFrom(
      this.backofficeClient.send('find-id-category', {
        id: createPlayerDto.category,
      }),
    ).catch((err) => {
      throw new NotFoundException(err.message);
    });

    return this.backofficeClient.send('create-player', createPlayerDto).pipe(
      switchMap((player) => of(player)),
      catchError((err) => {
        console.log(err, 'error');
        throw new BadRequestException(err.message);
      }),
    );
  }

  @Patch(':id')
  async update(
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Param() getPlayerDto: GetPlayerDto,
  ) {
    if (updatePlayerDto.category) {
      await firstValueFrom(
        this.backofficeClient.send('find-id-category', {
          id: updatePlayerDto.category,
        }),
      ).catch((err) => {
        throw new NotFoundException(err.message);
      });
    }

    return this.backofficeClient
      .send('update-player', {
        id: getPlayerDto.id,
        player: updatePlayerDto,
      })
      .pipe(
        switchMap((player) => of(player)),
        catchError((err) => {
          console.log(err, 'error');
          throw new BadRequestException(err.message);
        }),
      );
  }

  @Delete(':id')
  async delete(@Param() getPlayerDto: GetPlayerDto) {
    return this.backofficeClient.send('delete-player', getPlayerDto).pipe(
      switchMap((player) => of(player)),
      catchError((err) => {
        console.log(err, 'error');
        throw new BadRequestException(err.message);
      }),
    );
  }
}
