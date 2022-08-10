import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { filterDirs, converNumToLetters } from '../../app/filters';
import {
  up,
  right,
  down,
  left,
  addCount,
  startGame,
  stopGame,
  restartGame
} from './gameFieldSlice';
import GameDisplay from '../gameDisplay/GameDisplay';
import GameModal from '../gameModal/GameModal';
import styles from '../../styles/GameField.module.scss';

const initialDirections: string[] = [
  'up',
  'right',
  'down',
  'left',
];

interface ClickedBlockState {
  x: number;
  y: number;
}

const GameField = () => {
  // store
  const data = useAppSelector((state: RootState) => state.gameField);
  const dispatch = useAppDispatch();
  // states
  const [isBlocksActive, setIsBlocksActive] = useState<boolean>(false);
  const [clickedBlock, seTClickedBlock] = useState<ClickedBlockState>();
  const [isModal, setIsModal] = useState<boolean>(true);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isFail, setIsFail] = useState<boolean>(false);
  // sounds
  const [playClick] = useSound(
    '/sounds/click.mp3',
    { volume: 0.2 }
  );
  const [playWin] = useSound(
    '/sounds/win.mp3',
    { volume: 0.2 }
  );
  const [playFail] = useSound(
    '/sounds/fail.mp3',
    { volume: 0.2 }
  );

  useEffect(() => {
    let startTimer: NodeJS.Timeout = setTimeout(() => {});
    const TIMER = 800 / data.speed;

    if (data.isStarted && data.counter < data.numberOfMoves) {
      startTimer = setTimeout(() => {
        const filtredDirections = filterDirs(data, initialDirections);
        const randomIndex = Math.floor(Math.random() * filtredDirections.length);
        const randomDirection = filtredDirections[randomIndex];

        switch (randomDirection) {
          case 'up':
            dispatch(up());
            break;
          case 'right':
            dispatch(right());
            break;
          case 'down':
            dispatch(down());
            break;
          case 'left':
            dispatch(left());
            break;
        }

        dispatch(addCount());

      }, TIMER);
    } else {
      dispatch(stopGame());
      clearTimeout(startTimer);
    }

    return () => clearTimeout(startTimer);
  });

  useEffect(() => {
    if (!data.isStarted && data.counter >= data.numberOfMoves) {
      setIsBlocksActive(true);
    }
  }, [data.counter, data.isStarted]);

  const handleChoose = (posX: number, posY: number) => {
    seTClickedBlock({ x: posX, y: posY });
    setIsBlocksActive(false);

    if (posX === data.finishPoint.x && posY === data.finishPoint.y) {
      playWin();
      setIsWin(true);
    } else {
      playFail();
      setIsFail(true);
    }
  }

  const handleRestart = () => {
    playClick();
    setIsWin(false);
    setIsFail(false);
    dispatch(restartGame());
    dispatch(startGame());
  }

  const handleMenu = () => {
    playClick();
    setIsWin(false);
    setIsFail(false);
    dispatch(restartGame());
    setIsModal(true);
  }

  return (
    <div className={styles.gameField}>
      <div className={styles.gameField__content}>
        <div className={styles.gameField__layoutY}>
          {data.gameField.map((layoutY, index) => (
            <div key={`Y-${index}`} className={styles.gameField__layoutItem}>
              {index + 1}
            </div>
          ))}
        </div>
        <div className={styles.gameField__layoutX}>
          {data.gameField.map((layoutX, index) => (
            <div key={`X-${index}`} className={styles.gameField__layoutItem}>
              {converNumToLetters(index + 1)}
            </div>
          ))}
        </div>
        {data.gameField.map((row, index) => (
          <div key={index} className={styles.gameField__row}>{row.map(block => (
            <button
              key={`${block}${index}`}
              onClick={() => handleChoose(block, index)}
              disabled={!isBlocksActive}
              className={styles.gameField__btn}
            >
              {(block === data.startPoint.x && index === data.startPoint.y)
              && (<img src='/img/start.png' alt='Старт' className={styles.gameField__start} />)}
              {(block === data.finishPoint.x && index === data.finishPoint.y)
              && (isWin || isFail)
              && (<img src='/img/treasure.svg' alt='Клад' className={styles.gameField__treasure} />)}
              {(block === data.finishPoint.x && index === data.finishPoint.y)
              && isWin
              && (<img src='/img/thumb-up.svg' alt='Победа' className={styles.gameField__finish} />)}
              {(block !== data.finishPoint.x || index !== data.finishPoint.y)
              && isFail
              && (block === clickedBlock?.x && index === clickedBlock.y)
              && (<img src='/img/thumb-down.svg' alt='Проигрыш' className={styles.gameField__finish_fail} />)}
            </button>
          ))}</div>
        ))}
        <button onClick={handleRestart} className={(isWin || isFail)
          ? styles.gameField__restart + ' ' + styles.active
          : styles.gameField__restart}
        >
          Рестарт
        </button>
        <button onClick={handleMenu} className={(isWin || isFail)
          ? styles.gameField__menu + ' ' + styles.active
          : styles.gameField__menu}
        >
          Меню
        </button>
      </div>
      <GameDisplay />
      <GameModal isActive={isModal} setIsActive={setIsModal} />
    </div>
  );
}

export default React.memo(GameField);
