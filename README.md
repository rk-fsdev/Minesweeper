# Simple Minesweeper App

## How to run this in locally

First, you need to install dependencies by running this command below:

```
yarn install
```

Then you can start the app by running this command below:

```
yarn start
```

## Game Guide

- If you click cell with `Alt` key, then the cell will be flagged with `F` letter.

- If you click cell without `Alt` key, then the cell will be revealed. If cell has no mine in the neighbors, then the app will reveal all the cells which has no mines around itself. If cell is self mine, then it will be bombed, and you can no longer continue the game.
