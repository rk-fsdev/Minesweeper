import React, { Dispatch } from 'react';

import { generateCells } from 'service/configs/mines';
import { Cell, GameStatus } from 'models/minesweeper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum AppActionTypes {
  UPDATE_CELLS = 'UPDATE_CELLS',
  SET_GAME_STATUS = 'SET_GAME_STATUS',
}

interface AppState {
  cells: Cell[][];
  cols: number;
  rows: number;
  mines: number;
  gameStatus: GameStatus;
}

interface AppPayload {
  [AppActionTypes.UPDATE_CELLS]: {
    cells: Cell[][];
  };
  [AppActionTypes.SET_GAME_STATUS]: {
    gameStatus: GameStatus;
  };
}

export type AppAction = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

export const appInitialState: AppState = {
  cells: generateCells(10, 10, 10),
  cols: 10,
  rows: 10,
  mines: 10,
  gameStatus: GameStatus.Started,
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    default:
      return {
        ...state,
        ...action.payload,
      };
  }
};

export const AppContext = React.createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
}>({
  state: appInitialState,
  dispatch: () => null,
});
