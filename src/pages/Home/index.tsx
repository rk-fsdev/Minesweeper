import React, { useContext } from 'react';
import { Box, BoxProps, Text } from '@chakra-ui/core';

import { AppContext, AppActionTypes } from 'service/context/appContext';
import MineCell from './MineCell';
import { revealCell, flagCell } from 'service/configs/mines';
import { CellStatus, GameStatus } from 'models/minesweeper';

const lostWonBoxProps: BoxProps = {
  cursor: 'not-allowed',
  pointerEvents: 'none',
};

const Home: React.FC<BoxProps> = ({ ...restProps }: BoxProps) => {
  const { state, dispatch } = useContext(AppContext);
  const { cells, cols, rows, gameStatus, mines } = state;
  let cellBoxProps = {};

  if (gameStatus === GameStatus.Lost || gameStatus === GameStatus.Won) cellBoxProps = lostWonBoxProps;

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, col: number, row: number) => {
    e.stopPropagation();
    const _cells = [...cells];
    if (e.altKey) {
      flagCell(col, row, _cells);
    } else {
      if (_cells[col][row].isMine) {
        _cells[col][row].status = CellStatus.Revealed;
        dispatch({ type: AppActionTypes.SET_GAME_STATUS, payload: { gameStatus: GameStatus.Lost } });
      } else revealCell(cols, rows, col, row, _cells);
    }
    dispatch({ type: AppActionTypes.UPDATE_CELLS, payload: { cells: _cells } });
  };

  const renderCells = () =>
    cells.map((column, colIndex) => (
      <Box key={colIndex} height="40px" display="flex">
        {column.map((row, rowIndex) => (
          <MineCell key={rowIndex} data={cells[colIndex][rowIndex]} onClick={(e) => onClick(e, colIndex, rowIndex)} />
        ))}
      </Box>
    ));

  const renderGameStatus = () => {
    let description: string;
    switch (gameStatus) {
      case GameStatus.Lost:
        description = 'You lost the game.';
        break;
      case GameStatus.Won:
        description = 'Congrats! You won the game!';
        break;
      default:
        description = 'Game Started';
    }
    return (
      <Text as="h1" fontSize="30px">
        {description}
      </Text>
    );
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDir="column" height="100%" {...restProps}>
      <Box textAlign="center">
        {renderGameStatus()}
        <Text as="p">
          Number of Mines: {mines}
          <br />
          Cols: {cols}, Rows: {rows}
        </Text>
        <Text as="p" fontSize="15px">
          Click mine with Alt key to flag the cell.
        </Text>
      </Box>
      <Box {...cellBoxProps}>{renderCells()}</Box>
    </Box>
  );
};

export default Home;
