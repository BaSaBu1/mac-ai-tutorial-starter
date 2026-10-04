import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { PHOTOS } from './src/data/photos';
import { FinalScreen } from './src/screens/FinalScreen';
import { GameScreen } from './src/screens/GameScreen';
import { RoundResultScreen } from './src/screens/RoundResultScreen';
import { StartScreen } from './src/screens/StartScreen';
import type { RoundResult } from './src/types';

type Phase = 'start' | 'playing' | 'roundResult' | 'final';

export default function App() {
  const [phase, setPhase] = useState<Phase>('start');
  const [round, setRound] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);

  const isLast = round === PHOTOS.length - 1;

  function startGame() {
    setRound(0);
    setResults([]);
    setPhase('playing');
  }

  function finishRound(result: RoundResult) {
    setResults([...results, result]);
    setPhase('roundResult');
  }

  function nextRound() {
    if (isLast) {
      setPhase('final');
    } else {
      setRound(round + 1);
      setPhase('playing');
    }
  }

  return (
    <>
      <StatusBar style="auto" />
      {phase === 'start' && <StartScreen onPlay={startGame} />}
      {phase === 'playing' && (
        <GameScreen
          key={PHOTOS[round].id}
          photo={PHOTOS[round]}
          round={round + 1}
          totalRounds={PHOTOS.length}
          onDone={finishRound}
          onQuit={() => setPhase('start')}
        />
      )}
      {phase === 'roundResult' && (
        <RoundResultScreen result={results[results.length - 1]} isLast={isLast} onNext={nextRound} />
      )}
      {phase === 'final' && <FinalScreen results={results} onPlayAgain={startGame} />}
    </>
  );
}
