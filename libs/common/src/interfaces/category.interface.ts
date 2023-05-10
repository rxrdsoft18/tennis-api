import { IEvent } from '@app/common/interfaces/event.interface';
import { IPlayer } from '@app/common/interfaces/player.interface';

export class ICategory {
  name: string;
  description: string;
  events: IEvent[];
  players: IPlayer[];
}
