export enum CellStatus {
  Unknown,
  Revealed,
  Flagged,
}

export interface Cell {
  status: CellStatus;
  neighborCount: number;
  isMine: boolean;
}

export enum GameStatus {
  Started,
  Won,
  Lost,
}
