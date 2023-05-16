import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  Inject,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import {
  BACKOFFICE_SERVICE,
  CreatePlayerDto,
  GetPlayerDto,
  UpdatePlayerDto,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom, of, switchMap } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from '@app/common/services/aws-s3.service';
import { AuthGuard } from "@nestjs/passport";

@Controller('v1/players')
export class PlayersController {
  protected readonly logger = new Logger(PlayersController.name);

  constructor(
    @Inject(BACKOFFICE_SERVICE) private readonly backofficeClient: ClientProxy,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
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

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /(jpg|png|jpeg)/g,
          }),
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    await firstValueFrom(
      this.backofficeClient.send('find-id-player', { id }),
    ).catch((err) => {
      throw new BadRequestException(err.message);
    });

    await this.awsS3Service.upload(
      file.originalname,
      file.buffer,
      file.mimetype,
    );

    const body = {
      player: {
        urlPhoto: this.awsS3Service.buildFullURL(file.originalname),
      },
      id,
    };
    return this.backofficeClient.send('update-player', body).pipe(
      catchError((err) => {
        console.log(err, 'error');
        throw new BadRequestException(err.message);
      }),
    );
  }

  @Get('photos/:filename')
  async getPhoto(@Param('filename') filename: string) {
    console.log(filename, 'filename');
    return this.awsS3Service.getUrl(filename);
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
