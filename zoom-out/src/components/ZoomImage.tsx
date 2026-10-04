import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { ZOOM_SCALES } from '../logic/scoring';
import { radius, useColors } from '../theme';
import type { Photo } from '../types';

type Props = {
  photo: Photo;
  level: number; // 1-5
  size: number;
};

// Shift so the focus point sits in the middle, but never past the image edge.
function offset(focus: number, scale: number, size: number): number {
  const limit = ((scale - 1) * size) / 2;
  const wanted = -scale * (focus - 0.5) * size;
  return Math.max(-limit, Math.min(limit, wanted));
}

export function ZoomImage({ photo, level, size }: Props) {
  const c = useColors();
  const scale = ZOOM_SCALES[level - 1];
  const scaleAnim = useRef(new Animated.Value(scale)).current;
  const xAnim = useRef(new Animated.Value(offset(photo.focus.x, scale, size))).current;
  const yAnim = useRef(new Animated.Value(offset(photo.focus.y, scale, size))).current;

  useEffect(() => {
    const config = { duration: 550, easing: Easing.out(Easing.cubic), useNativeDriver: true };
    Animated.parallel([
      Animated.timing(scaleAnim, { toValue: scale, ...config }),
      Animated.timing(xAnim, { toValue: offset(photo.focus.x, scale, size), ...config }),
      Animated.timing(yAnim, { toValue: offset(photo.focus.y, scale, size), ...config }),
    ]).start();
  }, [scale, size, photo, scaleAnim, xAnim, yAnim]);

  return (
    <View
      style={[
        styles.frame,
        { width: size, height: size, backgroundColor: c.surface, borderColor: c.border },
      ]}
    >
      <Animated.Image
        source={photo.source}
        style={{
          width: size,
          height: size,
          transform: [{ translateX: xAnim }, { translateY: yAnim }, { scale: scaleAnim }],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
