import Board from 'components/Board/Board';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { resetGame, updateTime } from 'redux/reducers/gameSlice';
import style from './Game.module.scss';

export const Game = () => {
  const { mines, gameState, time, isTimeActive } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isTimeActive) {
      interval = setInterval(() => {
        dispatch(updateTime());
      }, 1000);

      if (time === 999) {
        clearInterval(interval);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [time, isTimeActive]);

  function getStatusPosition(status: string) {
    const iconWidth = 27;

    if (status === 'win') {
      return `-${iconWidth * 3 + 1}px -25px`;
    }
    if (status === 'lose') {
      return `-${iconWidth * 4 + 1}px -25px`; //`-109px -25px`;
    }
    if (status === 'scared') {
      return `-${iconWidth * 2 + 1}px -25px`;
    }
    return `-1px -25px`;
  }

  function getDigitPosition(digit: number) {
    const iconWidth = 14;

    if (digit === 0) {
      return `-${iconWidth * 9}px 0px`;
    }
    return `-${iconWidth * (digit - 1)}px 0px`;
  }

  const mineCountOnes = mines % 10;
  const mineCountTens = Math.floor(mines / 10) % 10;

  const timeOnes = time % 10;
  const timeTens = Math.floor(time / 10) % 10;
  const timeHundreds = Math.floor(time / 100) % 10;

  return (
    <div className={style.game}>
      <div className={style.info}>
        <div className={style.digitWrapper}>
          <div className={`${style.digit} ${style.zero}`}></div>
          <div
            className={style.digit}
            style={{
              backgroundPosition: `${getDigitPosition(mineCountTens)}`,
            }}
          ></div>
          <div
            className={style.digit}
            style={{
              backgroundPosition: `${getDigitPosition(mineCountOnes)}`,
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
        <div className={style.digitWrapper}>
          <div
            className={style.digit}
            style={{
              backgroundPosition: `${getDigitPosition(timeHundreds)}`,
            }}
          ></div>
          <div
            className={style.digit}
            style={{
              backgroundPosition: `${getDigitPosition(timeTens)}`,
            }}
          ></div>
          <div
            className={style.digit}
            style={{
              backgroundPosition: `${getDigitPosition(timeOnes)}`,
            }}
          ></div>
        </div>
      </div>

      <Board />
    </div>
  );
};

export default Game;
