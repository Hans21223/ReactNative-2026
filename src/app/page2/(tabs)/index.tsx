import { LinearGradient } from 'expo-linear-gradient';
import { Link, type Href } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Fragment } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon, Panel, styles, tap, tint } from '@/components/ui';
import { COURSE, findLesson, moduleProgress } from '@/course';
import { resetProgress, useProgress } from '@/progress';

const LINKS = [
  { title: 'Flexbox Froggy', sub: 'Practise flexbox for 10–30 minutes', url: 'https://flexboxfroggy.com/' },
  { title: 'Yoga Playground', sub: 'The layout engine React Native uses', url: 'https://www.yogalayout.dev/playground' },
  { title: 'React Native docs', sub: 'reactnative.dev', url: 'https://reactnative.dev/docs/flexbox' },
  { title: 'Expo docs', sub: 'docs.expo.dev', url: 'https://docs.expo.dev/' },
  { title: 'A Guide to Flexbox', sub: 'CSS-Tricks', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
];

export default function Learn() {
  const p = useProgress();
  const total = COURSE.reduce((n, m) => n + m.lessons.length, 0);
  const stats = COURSE.map((m) => moduleProgress(m, p));
  const pct = Math.round((100 * stats.reduce((n, s) => n + s.done, 0)) / stats.reduce((n, s) => n + s.total, 0));
  const last = typeof p.last === 'string' ? findLesson(p.last) : undefined;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.screen}>
      <LinearGradient colors={['#208AEF', '#9013FE']} start={[0, 0]} end={[1, 1]} style={{ borderRadius: 20, padding: 20, gap: 6 }}>
        <Text style={{ color: '#fff', fontSize: 22, fontWeight: '800' }}>React Native with Expo</Text>
        <Text style={{ color: '#ffffffd9', fontSize: 15, lineHeight: 21 }}>
          {COURSE.length} modules · {total} lessons. Every lesson has a live demo and code you can copy. Finish a module with its quiz.
        </Text>
        <Bar value={pct} color="#fff" track="#ffffff40" />
        <Text style={{ color: '#fff', fontWeight: '700' }}>{pct}% complete</Text>
      </LinearGradient>

      <Link href={`/page2/lesson/${last?.lesson.key ?? COURSE[0].lessons[0].key}` as Href} asChild>
        <Pressable onPress={tap} style={StyleSheet.flatten([styles.row, { backgroundColor: tint, borderRadius: 16, paddingHorizontal: 16 }])}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#ffffffcc', fontSize: 13 }}>{last ? 'Continue where you left off' : 'Start the course'}</Text>
            <Text style={{ color: '#fff', fontSize: 17, fontWeight: '700' }}>{last?.lesson.title ?? COURSE[0].lessons[0].title}</Text>
          </View>
          <Text style={{ color: '#fff', fontSize: 22 }}>▶</Text>
        </Pressable>
      </Link>

      {COURSE.map((m, mi) => (
        <View key={m.key} style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name={m.icon} size={18} />
            <Text style={[styles.h2, { flex: 1 }]}>
              {mi + 1}. {m.title}
            </Text>
            <Text style={styles.rowSub}>
              {stats[mi].done}/{stats[mi].total}
            </Text>
          </View>
          <Bar value={(100 * stats[mi].done) / stats[mi].total} />
          <Panel style={{ gap: 0, paddingVertical: 2 }}>
            {m.lessons.map((l, i) => (
              <Fragment key={l.key}>
                {i > 0 && <View style={styles.sep} />}
                <Link href={`/page2/lesson/${l.key}` as Href} asChild>
                  <Pressable onPress={tap} style={styles.row}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rowTitle}>{l.title}</Text>
                      <Text style={styles.rowSub}>{l.sub}</Text>
                    </View>
                    <Text style={[styles.rowSub, !!p[l.key] && { color: '#1d8a55', fontWeight: '700' }]}>{p[l.key] ? '✓' : '›'}</Text>
                  </Pressable>
                </Link>
              </Fragment>
            ))}
            <View style={styles.sep} />
            <Link href={`/page2/quiz/${m.key}` as Href} asChild>
              <Pressable onPress={tap} style={styles.row}>
                <Text style={[styles.rowTitle, { flex: 1, color: tint }]}>
                  {stats[mi].quizPassed ? `✓ Quiz passed (best ${p[`quiz:${m.key}`]}/${m.quiz.length})` : `Take the quiz (${m.quiz.length} questions)`}
                </Text>
                <Text style={[styles.rowSub, { color: tint }]}>›</Text>
              </Pressable>
            </Link>
          </Panel>
        </View>
      ))}

      <Text style={styles.h2}>Practice & references</Text>
      <Panel style={{ gap: 0, paddingVertical: 2 }}>
        {LINKS.map((r, i) => (
          <Fragment key={r.url}>
            {i > 0 && <View style={styles.sep} />}
            <Pressable accessibilityRole="link" onPress={() => WebBrowser.openBrowserAsync(r.url)} style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{r.title}</Text>
                <Text style={styles.rowSub}>{r.sub}</Text>
              </View>
              <Text style={styles.rowSub}>↗</Text>
            </Pressable>
          </Fragment>
        ))}
      </Panel>
      <Text style={[styles.rowSub, { textAlign: 'center' }]}>Knowledge is not yours, but understanding is.</Text>
      <Pressable accessibilityRole="button" onPress={resetProgress} style={{ alignSelf: 'center', padding: 12 }}>
        <Text style={[styles.rowSub, { textDecorationLine: 'underline' }]}>Reset progress</Text>
      </Pressable>
    </ScrollView>
  );
}

function Bar({ value, color = tint, track = '#e3e8ef' }: { value: number; color?: string; track?: string }) {
  return (
    <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(value) }} style={{ height: 6, borderRadius: 3, backgroundColor: track, overflow: 'hidden' }}>
      <View style={{ width: `${value}%`, height: '100%', backgroundColor: color, borderRadius: 3 }} />
    </View>
  );
}
