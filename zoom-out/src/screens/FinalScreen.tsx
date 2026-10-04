import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { PillButton } from '../components/PillButton';
import { MAX_SCORE_PER_ROUND } from '../logic/scoring';
import { radius, spacing, topInset, useColors } from '../theme';
import type { RoundResult } from '../types';

type Props = {
  results: RoundResult[];
  onPlayAgain: () => void;
};

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function FinalScreen({ results, onPlayAgain }: Props) {
  const c = useColors();
  const total = results.reduce((sum, r) => sum + r.points, 0);
  const max = results.length * MAX_SCORE_PER_ROUND;
  const solvedCount = results.filter((r) => r.solved).length;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.eyebrow, { color: c.accent }]}>FINAL SCORE</Text>
        <Text style={[styles.total, { color: c.text }]}>{total}</Text>
        <Text style={[styles.sub, { color: c.muted }]}>
          out of {max} · {solvedCount} of {results.length} solved
        </Text>

        <View style={[styles.list, { backgroundColor: c.surface, borderColor: c.border }]}>
          {results.map((r, i) => (
            <View
              key={r.photo.id}
              style={[
                styles.row,
                i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: c.border },
              ]}
            >
              <Image source={r.photo.source} style={styles.thumb} />
              <View style={styles.rowText}>
                <Text style={[styles.rowTitle, { color: c.text }]}>
                  {capitalize(r.photo.answer)}
                </Text>
                <Text style={[styles.rowDetail, { color: c.muted }]}>
                  {r.solved ? `Zoom ${r.level} · ${Math.floor(r.seconds)}s` : 'Missed'}
                </Text>
              </View>
              <Text style={[styles.rowPoints, { color: r.solved ? c.text : c.muted }]}>
                {r.points}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <PillButton label="Play again" onPress={onPlayAgain} />
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
  scroll: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  total: {
    fontSize: 88,
    fontWeight: '800',
    letterSpacing: -3,
    fontVariant: ['tabular-nums'],
  },
  sub: {
    fontSize: 16,
    marginBottom: spacing.xl,
  },
  list: {
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  rowDetail: {
    fontSize: 14,
    marginTop: 2,
  },
  rowPoints: {
    fontSize: 17,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
});
