import * as Haptics from 'expo-haptics';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { Panel, styles, tint } from '@/components/ui';
import { Button, COURSE } from '@/course';
import { saveQuiz } from '@/progress';

const buzz = (ok: boolean) =>
  Platform.OS !== 'web' && Haptics.notificationAsync(ok ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);

export default function Quiz() {
  const { module } = useLocalSearchParams<{ module: string }>();
  const m = COURSE.find((x) => x.key === module) ?? COURSE[0];
  const [picks, setPicks] = useState<(number | undefined)[]>([]);
  const score = m.quiz.filter((q, i) => picks[i] === q.answer).length;
  const done = m.quiz.every((_, i) => picks[i] !== undefined);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.screen}>
      <Stack.Screen options={{ title: `${m.title} quiz` }} />
      {m.quiz.map((q, qi) => {
        const picked = picks[qi];
        return (
          <Panel key={q.q}>
            <Text style={styles.rowTitle}>
              {qi + 1}. {q.q}
            </Text>
            {q.options.map((o, oi) => {
              const right = picked !== undefined && oi === q.answer;
              const wrong = picked === oi && oi !== q.answer;
              return (
                <Pressable
                  key={o}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: picked === oi, disabled: picked !== undefined }}
                  disabled={picked !== undefined}
                  onPress={() => {
                    buzz(oi === q.answer);
                    const next = Object.assign([...picks], { [qi]: oi });
                    setPicks(next);
                    if (m.quiz.every((_, i) => next[i] !== undefined)) saveQuiz(m.key, m.quiz.filter((x, i) => next[i] === x.answer).length);
                  }}
                  style={[
                    styles.chip,
                    { borderRadius: 12, paddingVertical: 12 },
                    right && { backgroundColor: '#d5f5e3' },
                    wrong && { backgroundColor: '#fde0df' },
                  ]}>
                  <Text style={styles.body}>
                    {right ? '✓ ' : wrong ? '✗ ' : ''}
                    {o}
                  </Text>
                </Pressable>
              );
            })}
            {picked !== undefined && <Text style={styles.rowSub}>{q.why}</Text>}
          </Panel>
        );
      })}
      {done && (
        <View style={{ alignItems: 'center', gap: 12 }}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: tint }}>
            {score} / {m.quiz.length}
          </Text>
          <Text style={styles.body}>{score >= Math.ceil(m.quiz.length * 0.6) ? 'Passed! Module quiz complete 🎉' : 'Pass mark is 60%. Review the lessons and try again.'}</Text>
          <Button title="Try again" onPress={() => setPicks([])} />
          <Button title="Back to lessons" onPress={() => router.back()} />
        </View>
      )}
    </ScrollView>
  );
}
