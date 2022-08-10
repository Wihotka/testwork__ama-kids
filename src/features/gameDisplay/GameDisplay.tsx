import { ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import GameArrow from '../gameArrow/GameArrow';
import styles from '../../styles/GameDisplay.module.scss';

const GameDisplay = () => {
  // store
  const data = useAppSelector((state: RootState) => state.gameField);

  const displayBlocks: ReactNode[] = [];
  for (let i = 0; i < data.numberOfMoves; i++) {
    displayBlocks.push(
      <div key={i} className={styles.gameDisplay__block}>
        <GameArrow index={i} />
      </div>
    );
  }

  return (
    <div className={styles.gameDisplay}>
      {displayBlocks.map(block => block)}
    </div>
  );
}

export default GameDisplay;
