import * as Clipboard from 'expo-clipboard';
import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import { SymbolView } from 'expo-symbols';
import { useState, type ReactNode } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import type { Demo } from '@/lessons';

export const tint = '#208AEF';

// Haptics are a no-op on web, so skip the call there.
export const tap = () => {
  if (Platform.OS !== 'web') Haptics.selectionAsync();
};

// Liquid glass on iOS 26+, a plain card everywhere else.
const glass = Platform.OS === 'ios' && isGlassEffectAPIAvailable();
export function Panel({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return glass ? (
    <GlassView style={[styles.panel, style]}>{children}</GlassView>
  ) : (
    <View style={[styles.panel, styles.panelSolid, style]}>{children}</View>
  );
}

export function Icon({ name, size = 22, color = tint }: { name: { ios: string; android: string; web: string }; size?: number; color?: string }) {
  return <SymbolView name={name as never} size={size} tintColor={color} fallback={<View style={{ width: size }} />} />;
}

export function Chips({ label, values, value, onChange }: { label?: string; values: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <View style={{ gap: 6 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
        {values.map((v) => {
          const on = v === value;
          return (
            <Pressable
              key={v}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              onPress={() => {
                tap();
                onChange(v);
              }}
              style={[styles.chip, on && styles.chipOn]}>
              <Text style={[styles.chipText, on && { color: '#fff' }]}>{v}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

// Live preview. Reanimated animates each box to its new place when a value changes.
export function DemoBox({ demo, height = 280 }: { demo: Demo; height?: number }) {
  return (
    <View style={[styles.demo, { height }]}>
      <Animated.View layout={LinearTransition} style={demo.container}>
        {demo.items.map((s, i) => (
          <Animated.View key={i} layout={LinearTransition} style={[s, styles.box]}>
            <Text style={styles.boxText}>{i + 1}</Text>
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  );
}

export function Code({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <View style={styles.code}>
      <ScrollView horizontal>
        <Text selectable style={styles.codeText}>
          {code}
        </Text>
      </ScrollView>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Copy code"
        onPress={async () => {
          await Clipboard.setStringAsync(code);
          if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        style={styles.copy}>
        <Text style={styles.copyText}>{copied ? 'Copied ✓' : 'Copy'}</Text>
      </Pressable>
    </View>
  );
}

export const styles = StyleSheet.create({
  screen: { padding: 16, gap: 16, paddingBottom: 48 },
  panel: { borderRadius: 20, padding: 14, gap: 12, overflow: 'hidden' },
  panelSolid: { backgroundColor: '#fff', borderWidth: StyleSheet.hairlineWidth, borderColor: '#d9dde3' },
  label: { fontSize: 13, fontWeight: '600', color: '#5b6573' },
  h2: { fontSize: 13, fontWeight: '700', color: '#5b6573', textTransform: 'uppercase', letterSpacing: 0.6 },
  body: { fontSize: 15, lineHeight: 22, color: '#1d232b' },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: '#eef1f5', minHeight: 36, justifyContent: 'center' },
  chipOn: { backgroundColor: tint },
  chipText: { fontSize: 14, color: '#1d232b', fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }) },
  demo: { borderRadius: 16, backgroundColor: '#fff', overflow: 'hidden', borderWidth: 1, borderColor: '#d9dde3', borderStyle: 'dashed' },
  box: { alignItems: 'center', justifyContent: 'center' },
  boxText: { color: '#fff', fontWeight: '700', textShadowColor: '#0006', textShadowRadius: 2 },
  code: { backgroundColor: '#14181f', borderRadius: 14, padding: 14, paddingTop: 40 },
  codeText: { color: '#d6e2f0', fontSize: 13, lineHeight: 20, fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }) },
  copy: { position: 'absolute', top: 8, right: 8, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: '#ffffff1f' },
  copyText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, minHeight: 48 },
  rowTitle: { fontSize: 16, fontWeight: '600', color: '#1d232b' },
  rowSub: { fontSize: 13, color: '#5b6573' },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: '#d9dde3' },
});
