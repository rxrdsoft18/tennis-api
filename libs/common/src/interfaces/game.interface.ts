import { IResultGame } from '@app/common/interfaces/result.interface';

export interface IGame {
  players: string[];
  category: string;
  challenge: string;
  winnerPlayerId: string;
  result: IResultGame[];
}
