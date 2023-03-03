import Board from 'components/Board/Board';
import React, { useState } from 'react';
import style from './Game.module.scss';

export const Game = () => {
  const [gameStatus, setGameStatus] = useState('game');

  return (
    <div className={style.game}>
      <Board gameStatus={gameStatus} setGameStatus={setGameStatus} />
    </div>
  );
};

export default Game;
