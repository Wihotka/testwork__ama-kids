import React from 'react';
import GameField from './features/gameField/GameField';
import './styles/App.scss';

const App = () => {
  return (
    <div className="App">
      <header className="App__header">
        <div className="App__header-crossline"></div>
        <div className="App__header-title">Лабиринт</div>
      </header>
      <main className="App__main">
        <GameField />
      </main>
    </div>
  );
}

export default App;
