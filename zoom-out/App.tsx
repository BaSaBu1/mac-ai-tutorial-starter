import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { PHOTOS } from './src/data/photos';
import { GameScreen } from './src/screens/GameScreen';
import { StartScreen } from './src/screens/StartScreen';
import type { RoundResult } from './src/types';

type Phase = 'start' | 'playing';

export default function App() {
  const [phase, setPhase] = useState<Phase>('start');
  const [round, setRound] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);

  function startGame() {
    setRound(0);
    setResults([]);
    setPhase('playing');
  }

  function finishRound(result: RoundResult) {
    setResults([...results, result]);
  }

  return (
    <>
      <StatusBar style="auto" />
      {phase === 'start' && <StartScreen onPlay={startGame} />}
      {phase === 'playing' && (
        <GameScreen
          photo={PHOTOS[round]}
          round={round + 1}
          totalRounds={5}
          onDone={finishRound}
          onQuit={() => setPhase('start')}
        />
      )}
    </>
  );
}
