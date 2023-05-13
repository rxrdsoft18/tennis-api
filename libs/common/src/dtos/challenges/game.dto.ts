import { IResultGame } from '@app/common';

export class GameDto {
  players: string[];
  category: string;
  challenge: string;
  winnerPlayerId: string;
  result: IResultGame[];
}
