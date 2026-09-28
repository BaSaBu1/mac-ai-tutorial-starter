import { Pressable, StyleSheet, Text } from 'react-native';
import { radius, spacing, useColors } from '../theme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
};

export function PillButton({ label, onPress, variant = 'primary', disabled }: Props) {
  const c = useColors();
  const primary = variant === 'primary';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        primary
          ? { backgroundColor: c.accent }
          : { backgroundColor: 'transparent', borderColor: c.border, borderWidth: 1 },
        { opacity: disabled ? 0.4 : pressed ? 0.8 : 1 },
        { transform: [{ scale: pressed ? 0.98 : 1 }] },
      ]}
    >
      <Text style={[styles.label, { color: primary ? c.onAccent : c.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 54,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
