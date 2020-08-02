import React from 'react';
import { Box, BoxProps } from '@chakra-ui/core';

import { Cell, CellStatus } from 'models/minesweeper';

interface Props extends BoxProps {
  data: Cell;
}

const revealBoxProps: BoxProps = {
  backgroundColor: 'gray.400',
};
const unknownBoxProps: BoxProps = {
  backgroundColor: 'gray.100',
};
const bombBoxProps: BoxProps = {
  backgroundColor: 'red.500',
  color: 'white',
};

const MineCell: React.FC<Props> = ({ data, ...restProps }: Props) => {
  const { isMine, neighborCount, status } = data;
  let statusStyleProps: BoxProps = unknownBoxProps;

  if (status === CellStatus.Revealed) {
    if (isMine) statusStyleProps = bombBoxProps;
    else statusStyleProps = revealBoxProps;
  }

  const renderCell = () => {
    if (status === CellStatus.Revealed) {
      if (isMine) {
        return 'B';
      } else {
        if (neighborCount === 0) return;
        else return neighborCount;
      }
    } else if (status === CellStatus.Flagged) {
      return 'F';
    } else return;
  };

  return (
    <Box
      width="40px"
      height="40px"
      border="1px solid"
      borderColor="black"
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      cursor="pointer"
      {...statusStyleProps}
      {...restProps}
    >
      {renderCell()}
    </Box>
  );
};

export default MineCell;
