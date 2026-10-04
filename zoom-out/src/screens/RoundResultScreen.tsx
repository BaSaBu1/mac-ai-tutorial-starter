import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { PillButton } from '../components/PillButton';
import { radius, spacing, topInset, useColors } from '../theme';
import type { RoundResult } from '../types';

type Props = {
  result: RoundResult;
  isLast: boolean;
  onNext: () => void;
};

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function RoundResultScreen({ result, isLast, onNext }: Props) {
  const c = useColors();
  const { width, height } = useWindowDimensions();
  const size = Math.min(width - spacing.lg * 2, height * 0.42);
  const { photo, solved, level, seconds, points } = result;

  const detail = solved
    ? `Zoom ${level} · ${Math.floor(seconds)}s`
    : 'Out of guesses';

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.middle}>
        <Text style={[styles.eyebrow, { color: solved ? c.success : c.error }]}>
          {solved ? 'GOT IT' : 'SO CLOSE'}
        </Text>
        <Image
          source={photo.source}
          style={[styles.photo, { width: size, height: size, borderColor: c.border }]}
        />
        <Text style={[styles.answer, { color: c.text }]}>{capitalize(photo.answer)}</Text>
        <Text style={[styles.detail, { color: c.muted }]}>{detail}</Text>
        <Text style={[styles.points, { color: solved ? c.accent : c.muted }]}>+{points}</Text>
      </View>
      <View style={styles.bottom}>
        <PillButton label={isLast ? 'See results' : 'Next photo'} onPress={onNext} />
        <Text style={[styles.credit, { color: c.muted }]}>Photo: {photo.credit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: topInset,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  middle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: spacing.md,
  },
  photo: {
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.lg,
  },
  answer: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1,
  },
  detail: {
    fontSize: 16,
    marginTop: spacing.xs,
  },
  points: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: spacing.md,
    fontVariant: ['tabular-nums'],
  },
  bottom: {
    gap: spacing.md,
  },
  credit: {
    fontSize: 12,
    textAlign: 'center',
  },
});
