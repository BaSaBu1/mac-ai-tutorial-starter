import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { PillButton } from '../components/PillButton';
import { ZoomDots } from '../components/ZoomDots';
import { ZoomImage } from '../components/ZoomImage';
import { isCorrect } from '../logic/matching';
import { MAX_LEVEL, scoreRound, TIME_BONUS_SECONDS } from '../logic/scoring';
import { radius, spacing, topInset, useColors } from '../theme';
import type { Photo, RoundResult } from '../types';

type Props = {
  photo: Photo;
  round: number;
  totalRounds: number;
  onDone: (result: RoundResult) => void;
  onQuit: () => void;
};

function formatTime(seconds: number): string {
  const s = Math.floor(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function GameScreen({ photo, round, totalRounds, onDone, onQuit }: Props) {
  const c = useColors();
  const { width, height } = useWindowDimensions();
  const size = Math.min(width - spacing.lg * 2, height * 0.42);

  const [level, setLevel] = useState(1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const startTime = useRef(Date.now());
  const done = useRef(false);
  const shake = useRef(new Animated.Value(0)).current;

  // Tick the clock a few times a second.
  useEffect(() => {
    const id = setInterval(() => setElapsed((Date.now() - startTime.current) / 1000), 200);
    return () => clearInterval(id);
  }, []);

  function finish(solved: boolean, finalLevel: number) {
    done.current = true;
    const seconds = (Date.now() - startTime.current) / 1000;
    onDone({
      photo,
      solved,
      level: finalLevel,
      seconds,
      points: solved ? scoreRound(finalLevel, seconds) : 0,
    });
  }

  function runShake() {
    const step = (toValue: number) =>
      Animated.timing(shake, { toValue, duration: 50, useNativeDriver: true });
    Animated.sequence([step(10), step(-10), step(8), step(-8), step(0)]).start();
  }

  function submit() {
    const text = guess.trim();
    if (!text || done.current) return;

    if (isCorrect(text, photo)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      finish(true, level);
      return;
    }

    setGuess('');
    runShake();

    if (level >= MAX_LEVEL) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      finish(false, level);
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    const left = MAX_LEVEL - level;
    setMessage(`Not "${text}". Zooming out. ${left} ${left === 1 ? 'try' : 'tries'} left.`);
    setLevel(level + 1);
  }

  const bonusLeft = Math.max(0, TIME_BONUS_SECONDS - elapsed) / TIME_BONUS_SECONDS;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.container, { backgroundColor: c.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: c.muted }]} onPress={onQuit}>
          ✕
        </Text>
        <Text style={[styles.headerText, { color: c.text }]}>
          {round} / {totalRounds}
        </Text>
        <Text style={[styles.headerText, styles.time, { color: c.muted }]}>
          {formatTime(elapsed)}
        </Text>
      </View>

      <View style={[styles.track, { backgroundColor: c.border }]}>
        <View
          style={[styles.trackFill, { backgroundColor: c.accent, width: `${bonusLeft * 100}%` }]}
        />
      </View>

      <View style={styles.middle}>
        <Animated.View style={{ transform: [{ translateX: shake }] }}>
          <ZoomImage photo={photo} level={level} size={size} />
        </Animated.View>
        <ZoomDots level={level} />
      </View>

      <View style={styles.bottom}>
        <Text style={[styles.message, { color: message ? c.error : c.muted }]}>
          {message || 'What is it?'}
        </Text>
        <TextInput
          value={guess}
          onChangeText={setGuess}
          onSubmitEditing={submit}
          submitBehavior="submit"
          placeholder="Type your guess"
          placeholderTextColor={c.muted}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          returnKeyType="go"
          style={[
            styles.input,
            { backgroundColor: c.surface, borderColor: c.border, color: c.text },
          ]}
        />
        <PillButton label="Guess" onPress={submit} disabled={!guess.trim()} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: topInset,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerText: {
    fontSize: 17,
    fontWeight: '600',
    minWidth: 48,
  },
  time: {
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  track: {
    height: 3,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: radius.pill,
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  bottom: {
    gap: spacing.sm + 4,
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
  },
  input: {
    height: 54,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    fontSize: 17,
  },
});
