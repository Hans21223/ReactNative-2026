import { Link, type Href } from 'expo-router';
import { Fragment } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Panel, styles, tap } from '@/components/ui';
import { SECTIONS, type Exercise } from '@/exercises';

const W = 390;
const H = 700;
const S = 0.14;
function Thumb({ Preview }: Exercise) {
  if (!Preview) return null;
  return (
    <View pointerEvents="none" style={{ width: W * S, height: H * S, borderRadius: 6, overflow: 'hidden', borderWidth: 1, borderColor: '#d9dde3', backgroundColor: '#fff' }}>
      <View style={{ width: W, height: H, transform: [{ scale: S }], transformOrigin: 'top left' }}>
        <Preview />
      </View>
    </View>
  );
}

export default function Exercises() {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.screen}>
      <Text style={styles.body}>
        Your week 2 work from the slides. Ex10–Ex12 must use flex only, no width or height. Open the Playground tab to test a layout before you code it.
      </Text>
      {SECTIONS.map((s) => (
        <View key={s.title} style={{ gap: 8 }}>
          <Text style={styles.h2}>{s.title}</Text>
          <Panel style={{ gap: 0, paddingVertical: 2 }}>
            {s.data.map((e, i) => (
              <Fragment key={e.path}>
                {i > 0 && <View style={styles.sep} />}
                <Link href={e.path as Href} asChild>
                  <Pressable onPress={tap} style={styles.row}>
                    <Thumb {...e} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rowTitle}>{e.title}</Text>
                      <Text style={styles.rowSub}>{e.hint}</Text>
                    </View>
                    <Text style={styles.rowSub}>›</Text>
                  </Pressable>
                </Link>
              </Fragment>
            ))}
          </Panel>
        </View>
      ))}
    </ScrollView>
  );
}
