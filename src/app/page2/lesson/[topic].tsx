import { Link, router, Stack, useLocalSearchParams, type Href } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Code, Panel, styles, tap, tint } from '@/components/ui';
import { Button, COURSE, findLesson } from '@/course';
import { completeLesson, openLesson, useProgress } from '@/progress';

const ALL = COURSE.flatMap((m) => m.lessons);

export default function LessonScreen() {
  const { topic } = useLocalSearchParams<{ topic: string }>();
  const found = findLesson(topic);
  const progress = useProgress();
  useEffect(() => {
    if (findLesson(topic)) openLesson(topic);
  }, [topic]);
  if (!found) return <Text style={[styles.body, { padding: 16 }]}>Lesson not found.</Text>;
  const { module, lesson } = found;
  const { Demo } = lesson;
  const i = ALL.indexOf(lesson);
  const prev = ALL[i - 1];
  const next = ALL[i + 1];
  const lastInModule = module.lessons.at(-1) === lesson;

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.screen}>
      <Stack.Screen options={{ title: lesson.title }} />
      <Text style={styles.h2}>{module.title}</Text>
      <Text style={styles.body}>{lesson.body}</Text>
      {Demo && (
        <Panel key={lesson.key}>
          <Text style={styles.label}>Try it</Text>
          <Demo />
        </Panel>
      )}
      {lesson.code && <Code code={lesson.code} />}

      <Button
        title={progress[lesson.key] ? (lastInModule ? '✓ Done · Take the quiz' : '✓ Done · Next lesson') : lastInModule ? 'Complete & take the quiz' : 'Complete & continue'}
        onPress={() => {
          completeLesson(lesson.key);
          router.replace((lastInModule ? `/page2/quiz/${module.key}` : `/page2/lesson/${next.key}`) as Href);
        }}
      />

      <View style={{ flexDirection: 'row', gap: 12 }}>
        {[prev, next].map((l, k) =>
          l ? (
            <Link key={l.key} href={`/page2/lesson/${l.key}` as Href} replace asChild>
              <Pressable onPress={tap} style={StyleSheet.flatten([styles.chip, { flex: 1, paddingVertical: 12, alignItems: k ? 'flex-end' : 'flex-start' }])}>
                <Text style={styles.rowSub}>{k ? 'Next' : 'Previous'}</Text>
                <Text style={[styles.rowTitle, { color: tint }]} numberOfLines={1}>
                  {l.title}
                </Text>
              </Pressable>
            </Link>
          ) : (
            <View key={k} style={{ flex: 1 }} />
          ),
        )}
      </View>
    </ScrollView>
  );
}
