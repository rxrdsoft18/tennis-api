export interface RankingResponse {
  player?: string;
  position?: number;
  points?: number;
  historyGames?: HistoryGame;
}

export interface HistoryGame {
  victory?: number;
  defeat?: number;
}
