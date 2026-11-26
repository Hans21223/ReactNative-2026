import { useState } from 'react';
import { ScrollView, Text, View, type ViewStyle } from 'react-native';
import { Chips, Code, DemoBox, Panel, styles } from '@/components/ui';
import { Button } from '@/course';
import { codeFor, COLORS } from '@/lessons';

const OPTIONS = {
  flexDirection: ['column', 'row', 'column-reverse', 'row-reverse'],
  justifyContent: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
  alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
  flexWrap: ['nowrap', 'wrap'],
  alignContent: ['flex-start', 'center', 'flex-end', 'stretch', 'space-between', 'space-around'],
} as const;
type Key = keyof typeof OPTIONS;

export default function Playground() {
  const [style, setStyle] = useState<Record<Key, string>>({
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    alignContent: 'flex-start',
  });
  const [count, setCount] = useState(3);
  const [size, setSize] = useState('50');

  const n = size === 'flex: 1' ? undefined : Number(size);
  const demo = {
    container: { flex: 1, ...style } as ViewStyle,
    items: Array.from({ length: count }, (_, i): ViewStyle =>
      n === undefined ? { flex: 1, minWidth: 40, minHeight: 40, backgroundColor: COLORS[i % COLORS.length] } : { width: n, height: n, backgroundColor: COLORS[i % COLORS.length] },
    ),
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.screen}>
      <DemoBox demo={demo} height={300} />
      <Panel>
        {(Object.keys(OPTIONS) as Key[]).map((k) => (
          <Chips key={k} label={k} values={[...OPTIONS[k]]} value={style[k]} onChange={(v) => setStyle({ ...style, [k]: v })} />
        ))}
        <Chips label="item size" values={['50', '80', 'flex: 1']} value={size} onChange={setSize} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Text style={[styles.label, { flex: 1 }]}>items: {count}</Text>
          <Button title="−" onPress={() => setCount(Math.max(1, count - 1))} />
          <Button title="+" onPress={() => setCount(Math.min(12, count + 1))} />
        </View>
        {style.alignContent !== 'flex-start' && style.flexWrap === 'nowrap' && (
          <Text style={styles.rowSub}>💡 alignContent only works with flexWrap: wrap.</Text>
        )}
      </Panel>
      <Code code={codeFor(demo)} />
    </ScrollView>
  );
}
