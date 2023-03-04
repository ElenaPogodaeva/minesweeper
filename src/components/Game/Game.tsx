import Board from 'components/Board/Board';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React from 'react';
import { resetGame } from 'redux/reducers/gameSlice';
import style from './Game.module.scss';

export const Game = () => {
  const { mines, gameState } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  function getStatusPosition(status: string) {
    const iconWidth = 27;

    if (status === 'win') {
      return `-${iconWidth * 3 + 1}px -25px`;
    }
    if (status === 'lose') {
      return `-${iconWidth * 4 + 1}px -25px`; //`-109px -25px`;
    }
    return `-1px -25px`;
  }

  function getDigitPosition(digit: number) {
    const iconWidth = 14;

    if (digit === 0) {
      return `-${iconWidth * 9}px 0px`; //`-125px 0px`;
    }
    return `-${iconWidth * (digit - 1)}px 0px`;
  }

  const units = mines % 10;
  const tens = Math.floor(mines / 10) % 10;

  return (
    <div className={style.game}>
      <div className={style.info}>
        <div className={style.mines}>
          <div className={`${style.digit} ${style.hundred}`}></div>
          <div
            className={style.digit}
            style={{
              backgroundPosition: `${getDigitPosition(tens)}`,
            }}
          ></div>
          <div
            className={style.digit}
            style={{
              backgroundPosition: `${getDigitPosition(units)}`,
            }}
          ></div>
        </div>
        <div
          className={style.status}
          style={{
            backgroundPosition: `${getStatusPosition(gameState)}`,
          }}
          onClick={() => dispatch(resetGame())}
        ></div>
        <div className="">1</div>
      </div>

      <Board />
    </div>
  );
};

export default Game;
