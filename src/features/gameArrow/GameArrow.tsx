import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import styles from '../../styles/GameArrow.module.scss';

interface GameArrowProps {
  index: number;
}

const GameArrow = ({ index }: GameArrowProps) => {
  // store
  const data = useAppSelector((state: RootState) => state.gameField);
  //state
  const [direction, setDirection] = useState<string>('');
  // sounds
  const [playShow] = useSound(
    '/sounds/show.mp3',
    { volume: 0.2 }
  );

  useEffect(() => {
    if (!data.counter) {
      setDirection('');
    }
    if ((index + 1)  === data.counter && data.isStarted) {
      playShow();
      setDirection(data.direction);
    }
  }, [data.counter]);

  return (
    <div className={styles.gameArrow}>
      <svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 512 512' className={direction ? styles.gameArrow__svg + ' ' + styles[direction] : styles.gameArrow__svg}>
        <path d='M315.513,121.533v99.478H45.189c-19.324,0-34.989,15.665-34.989,34.989
        c0,19.324,15.665,34.989,34.989,34.989h270.325v99.478c0,14.309,11.601,25.91,25.91,25.91c6.872,0,13.462-2.73,18.322-7.589
        l134.467-134.467c5.059-5.059,7.588-11.69,7.588-18.321c0-6.63-2.529-13.262-7.589-18.322L359.745,103.212
        c-4.859-4.859-11.45-7.589-18.322-7.589C327.114,95.623,315.513,107.223,315.513,121.533z' fill='#ff5100'/>
        <g>
          <path d='M341.423,426.577c-19.911,0-36.109-16.198-36.109-36.109v-89.279H45.189C20.271,301.189,0,280.918,0,256c0-24.918,20.271-45.189,45.189-45.189h260.125v-89.279c0-19.911,16.198-36.109,36.109-36.109c9.645,0,18.712,3.756,25.534,10.576l134.467,134.467C508.244,237.286,512,246.355,512,256c0,9.645-3.756,18.714-10.577,25.534L366.957,416C360.137,422.821,351.069,426.577,341.423,426.577z M45.189,231.21c-13.669,0-24.79,11.121-24.79,24.79c0,13.669,11.121,24.79,24.79,24.79h270.324c5.633,0,10.199,4.567,10.199,10.199v99.478c0,8.663,7.048,15.711,15.711,15.711c4.197,0,8.142-1.635,11.11-4.602l134.466-134.467c2.968-2.967,4.602-6.912,4.602-11.11c0-4.198-1.635-8.142-4.602-11.11L352.532,110.422c-2.967-2.967-6.913-4.602-11.11-4.602c-8.663,0-15.711,7.048-15.711,15.711v99.478c0,5.632-4.566,10.199-10.199,10.199H45.189V231.21z' fill='#333'/>
          <path d='M389.61,181.772c-2.61,0-5.221-0.996-7.212-2.987l-2.266-2.266c-3.983-3.983-3.983-10.441,0-14.425c3.983-3.982,10.441-3.982,14.425,0l2.266,2.266c3.983,3.983,3.983,10.441,0,14.425C394.831,180.776,392.22,181.772,389.61,181.772z' fill='#333'/>
          <path d='M472.223,264.552c-2.611,0-5.22-0.996-7.212-2.987l-59.666-59.667c-3.983-3.983-3.983-10.441,0-14.425c3.983-3.982,10.441-3.981,14.424,0l59.666,59.667c3.983,3.983,3.983,10.441,0,14.425C477.444,263.556,474.833,264.552,472.223,264.552z' fill='#333'/>
        </g>
      </svg>
    </div>
  );
}

export default GameArrow;