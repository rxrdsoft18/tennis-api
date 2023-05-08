import { EventInterface } from './event.interface';
import { PlayerInterface } from '../../players/interfaces/player.interface';

export class CategoryInterface {
  name: string;
  description: string;
  events: EventInterface[];
  players: PlayerInterface[];
}
