import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesRepository } from './categories.repository';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { AssignPlayerCategoryDto } from './dtos/assign-player-category.dto';
import { PlayersService } from '../players/players.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly playersService: PlayersService,
  ) {}

  async findAll() {
    return this.categoriesRepository.find({}).populate('players');
  }

  async findByName(name: string) {
    return this.categoriesRepository.findOne({
      name,
    });
  }

  async findById(id: string) {
    const category = await this.categoriesRepository.findOne({ _id: id });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.findByName(createCategoryDto.name);

    if (category) {
      throw new ConflictException('Category already exists');
    }
    return this.categoriesRepository.create({
      ...createCategoryDto,
      players: [],
    });
  }

  async update(id: string, updateCategoryDto: Partial<UpdateCategoryDto>) {
    await this.findById(id);
    return this.categoriesRepository.findOneAndUpdate(
      {
        _id: id,
      },
      updateCategoryDto,
    );
  }

  private async existsPlayerInCategory(id: string, playerId: string) {
    return this.categoriesRepository
      .find({ _id: id })
      .where('players')
      .in([playerId]);
  }

  async assignPlayerToCategory(data: AssignPlayerCategoryDto) {
    const { id, playerId } = data;

    const category = await this.findById(id);
    await this.playersService.findById(playerId);
    const existsPlayerInCategory = await this.existsPlayerInCategory(
      id,
      playerId,
    );

    if (existsPlayerInCategory.length > 0) {
      throw new BadRequestException(
        'The player was already assigned to this category',
      );
    }

    category.players.push(playerId);
    return this.categoriesRepository.findOneAndUpdate(
      {
        _id: id,
      },
      category,
    );
  }

  async categoryByPlayerId(id: string) {
    const category = await this.categoriesRepository.findOne({}).where('players').in([id]);
    if (!category) {
      throw new NotFoundException(
        `There is no category associated with a player Id: ${id}`,
      );
    }
    return category;
  }

  async delete(id: string) {
    await this.findById(id);
    return this.categoriesRepository.findOneAndDelete({ _id: id });
  }
}
