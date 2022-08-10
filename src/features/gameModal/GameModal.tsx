import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import useSound from 'use-sound';
import {
  increaseMoves,
  decreaseMoves,
  increaseField,
  decreaseField,
  increaseSpeed,
  decreaseSpeed,
  startGame
} from '../gameField/gameFieldSlice';
import styles from '../../styles/GameModal.module.scss';

interface GameModalProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameModal = ({ isActive, setIsActive }: GameModalProps) => {
  // store
  const data = useAppSelector((state: RootState) => state.gameField);
  const dispatch = useAppDispatch();
  // sounds
  const [playClick] = useSound(
    '/sounds/click.mp3',
    { volume: 0.2 }
  );
  const [playCounter] = useSound(
    '/sounds/counter.mp3',
    { volume: 0.1 }
  );

  const handleClick = () => {
    playClick();
    setIsActive(false);
    dispatch(startGame());
  }

  console.log('MODAL');

  return (
    <div className={isActive ? styles.gameModal + ' ' + styles.active : styles.gameModal}>
      <div className={isActive ? styles.gameModal__content : styles.gameModal__content + ' ' + styles.hidden}>
        <div className={styles.gameModal__info}>
          <h4 className={styles.gameModal__heading}>Вот, что тебя ждёт в игре</h4>
          <p className={styles.gameModal__description}>Двигайся в лабиринте по стрелочкам</p>
          <ul className={styles.gameModal__rules}>
            <li className={styles.gameModal__rule}>
              Число ходов: <button onClick={() => { playCounter(); dispatch(decreaseMoves()) }} className={styles.gameModal__control}>-</button> <span className={styles.gameModal__value}>
                {data.numberOfMoves}
              </span> <button onClick={() => { playCounter(); dispatch(increaseMoves()) }} className={styles.gameModal__control}>+</button>
            </li>
            <li className={styles.gameModal__rule}>
              Размер поля: <button onClick={() => { playCounter(); dispatch(decreaseField()) }} className={styles.gameModal__control}>-</button> <span className={styles.gameModal__value}>
                {(data.maxPosition + 1) + 'x' + (data.maxPosition + 1)}
              </span> <button onClick={() => { playCounter(); dispatch(increaseField()) }} className={styles.gameModal__control}>+</button>
            </li>
            <li className={styles.gameModal__rule}>
              Скорость игры: <button onClick={() => { playCounter(); dispatch(decreaseSpeed()) }} className={styles.gameModal__control}>-</button> <span className={styles.gameModal__value}>
                {data.speed}
              </span> <button onClick={() => { playCounter(); dispatch(increaseSpeed()) }} className={styles.gameModal__control}>+</button>
            </li>
          </ul>
        </div>
        <img src='/img/logo.svg' alt='Лого' className={styles.gameModal__logo} />
        <button onClick={handleClick} className={styles.gameModal__btn}>Начать</button>
      </div>
    </div>
  );
}

export default React.memo(GameModal);
