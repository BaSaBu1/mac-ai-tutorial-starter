import { StyleSheet, View } from 'react-native';
import { MAX_LEVEL } from '../logic/scoring';
import { radius, spacing, useColors } from '../theme';

type Props = { level: number };

// One dot per zoom level. The current level is a wider accent pill.
export function ZoomDots({ level }: Props) {
  const c = useColors();

  return (
    <View style={styles.row}>
      {Array.from({ length: MAX_LEVEL }, (_, i) => {
        const dotLevel = i + 1;
        const current = dotLevel === level;
        const used = dotLevel < level;
        return (
          <View
            key={dotLevel}
            style={[
              styles.dot,
              {
                width: current ? 22 : 8,
                backgroundColor: current ? c.accent : used ? c.muted : c.border,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    height: 8,
    borderRadius: radius.pill,
  },
});
