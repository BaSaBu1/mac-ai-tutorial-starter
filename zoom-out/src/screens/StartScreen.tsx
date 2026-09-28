import { StyleSheet, Text, View } from 'react-native';
import { PillButton } from '../components/PillButton';
import { spacing, topInset, useColors } from '../theme';

type Props = { onPlay: () => void };

export function StartScreen({ onPlay }: Props) {
  const c = useColors();

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <View style={styles.hero}>
        <Text style={[styles.eyebrow, { color: c.accent }]}>A PHOTO GUESSING GAME</Text>
        <Text style={[styles.title, { color: c.text }]}>Zoom{'\n'}Out.</Text>
        <Text style={[styles.body, { color: c.muted }]}>
          Each photo starts zoomed way in.{'\n'}
          Every wrong guess pulls back a little.{'\n'}
          Fewer zooms and faster answers score more.
        </Text>
      </View>
      <PillButton label="Play" onPress={onPlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: topInset,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    justifyContent: 'space-between',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 72,
    fontWeight: '800',
    lineHeight: 76,
    letterSpacing: -2,
    marginBottom: spacing.lg,
  },
  body: {
    fontSize: 17,
    lineHeight: 26,
  },
});
