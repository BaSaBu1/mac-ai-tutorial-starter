import { StyleSheet, Text, View } from 'react-native';
import { PillButton } from '../components/PillButton';
import { spacing, topInset, useColors } from '../theme';
import type { Photo, RoundResult } from '../types';

type Props = {
  photo: Photo | undefined;
  round: number;
  totalRounds: number;
  onDone: (result: RoundResult) => void;
  onQuit: () => void;
};

// Placeholder game screen. The zooming photo and guessing come in a later step.
export function GameScreen({ round, totalRounds, onQuit }: Props) {
  const c = useColors();

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <Text style={[styles.counter, { color: c.muted }]}>
        Photo {round} of {totalRounds}
      </Text>
      <View style={[styles.card, { backgroundColor: c.surface, borderColor: c.border }]}>
        <Text style={{ color: c.muted }}>Photo goes here</Text>
      </View>
      <PillButton label="Back" variant="ghost" onPress={onQuit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: topInset,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  counter: {
    fontSize: 15,
    fontWeight: '600',
  },
  card: {
    aspectRatio: 1,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
