import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router, type Href } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import { useState, type ComponentType } from 'react';
import { FlatList, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Chips, Code, DemoBox, Icon, styles, tint } from '@/components/ui';
import { codeFor, LESSONS as FLEX, type Demo } from '@/lessons';

export type Icon3 = { ios: string; android: string; web: string };
export type CourseLesson = { key: string; title: string; sub: string; body: string; Demo?: ComponentType; code?: string };
export type Question = { q: string; options: string[]; answer: number; why: string };
export type Module = { key: string; title: string; icon: Icon3; lessons: CourseLesson[]; quiz: Question[] };

const i3 = (ios: string, md: string): Icon3 => ({ ios, android: md, web: md });

const Button = ({ title, onPress }: { title: string; onPress: () => void }) => (
  <Pressable accessibilityRole="button" onPress={onPress} style={demo.button}>
    <Text style={demo.buttonText}>{title}</Text>
  </Pressable>
);

// ---------- Flexbox: one interactive lesson per property ----------
const flexLessons: CourseLesson[] = FLEX.map((l) => ({
  key: l.key,
  title: l.title,
  sub: `${l.th} · on the ${l.where}`,
  body: l.about,
  Demo: function FlexDemo() {
    const [value, setValue] = useState(l.values[0]);
    const d = l.demo(value);
    return (
      <View style={{ gap: 12 }}>
        <Chips label={`${l.title} (set on the ${l.where})`} values={l.values} value={value} onChange={setValue} />
        <DemoBox demo={d} />
        {l.tip && <Text style={styles.rowSub}>💡 {l.tip}</Text>}
        <Code code={codeFor(d)} />
        <Challenge values={l.values} demo={l.demo} title={l.title} />
      </View>
    );
  },
}));

// "Your turn": pick the value that makes your box match the target.
function Challenge({ values, demo: make, title }: { values: string[]; demo: (v: string) => Demo; title: string }) {
  const target = values[Math.min(2, values.length - 1)];
  const [mine, setMine] = useState(values[0]);
  const won = mine === target;
  return (
    <View style={[demo.challenge, won && { borderColor: '#2bb673', backgroundColor: '#effaf4' }]}>
      <Text style={styles.rowTitle}>🎯 Your turn</Text>
      <Text style={styles.rowSub}>Which {title} value makes your box look like the target?</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={styles.label}>Target</Text>
          <DemoBox demo={make(target)} height={220} />
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={styles.label}>Yours</Text>
          <DemoBox demo={make(mine)} height={220} />
        </View>
      </View>
      <Chips
        values={values}
        value={mine}
        onChange={(v) => {
          setMine(v);
          if (v === target && Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }}
      />
      <Text style={[styles.rowTitle, { color: won ? '#1d8a55' : '#5b6573' }]}>{won ? `Correct! ${title}: '${target}' ✓` : 'Not yet, keep trying.'}</Text>
    </View>
  );
}

// A module counts each lesson plus its quiz (passed at 60% or more).
export const moduleProgress = (m: Module, p: Record<string, unknown>) => {
  const quizPassed = Number(p[`quiz:${m.key}`] ?? 0) >= Math.ceil(m.quiz.length * 0.6);
  const done = m.lessons.filter((l) => p[l.key]).length + (quizPassed ? 1 : 0);
  return { done, total: m.lessons.length + 1, quizPassed };
};

export const COURSE: Module[] = [
  {
    key: 'setup',
    title: 'Getting started',
    icon: i3('terminal.fill', 'terminal'),
    lessons: [
      {
        key: 'run',
        title: 'Run your project',
        sub: 'reset-project, expo start, Expo Go',
        body:
          'Open the project folder in VS Code and open a terminal. Run reset-project once (press y to keep the old code in a hidden folder). Then start the dev server and scan the QR code with Expo Go. If reset-project fails, stop expo start, restart VS Code, or use Git Bash or CMD (run as administrator).',
        code: `npm run reset-project
npx expo start`,
      },
      {
        key: 'tunnel',
        title: 'Run across networks',
        sub: 'tunnel when phone and laptop are on different networks',
        body:
          'If your laptop is on Wi-Fi but your phone is on cellular data, they cannot see each other. A tunnel sends the app through Expo’s servers instead. It works anywhere but is slower than a normal run.',
        code: `npm i -g @expo/ngrok
npx expo login
npx expo start --tunnel`,
      },
      {
        key: 'files',
        title: 'Every file is a screen',
        sub: 'Expo Router file-based routing',
        body:
          'With Expo Router, every file in src/app is a screen and its path is the URL. src/app/page2.tsx becomes /page2, and src/app/flexbox/ex01.tsx becomes /flexbox/ex01. _layout.tsx files set up the navigators (Stack, Tabs). The function name should match the file name.',
        code: `src/app/
  _layout.tsx        // navigator
  index.tsx          // "/"
  page2.tsx          // "/page2"
  flexbox/ex01.tsx   // "/flexbox/ex01"`,
      },
      {
        key: 'git',
        title: 'Submit with GitHub',
        sub: 'commit, push, send the link',
        body: 'Commit your week’s work with a clear message, push it to GitHub, and post the repository link in Google Classroom.',
        code: `git add .
git commit -m "Week2"
git push`,
      },
    ],
    quiz: [
      { q: 'Your phone uses cellular data and your laptop uses Wi-Fi. How do you run the app?', options: ['npx expo start', 'npx expo start --tunnel', 'npm run reset-project'], answer: 1, why: 'A tunnel lets devices on different networks reach the dev server.' },
      { q: 'Which URL does src/app/flexbox/ex03.tsx get?', options: ['/ex03', '/flexbox/ex03', '/app/flexbox/ex03'], answer: 1, why: 'The path under src/app is the URL.' },
    ],
  },
  {
    key: 'components',
    title: 'Core components',
    icon: i3('square.stack.3d.up.fill', 'stacks'),
    lessons: [
      {
        key: 'view-text',
        title: 'View and Text',
        sub: 'the <div> and <p> of React Native',
        body: 'View is a box that holds other components, like <div> in HTML. All text must be inside a Text component. Text can be nested to style part of a sentence.',
        Demo: () => (
          <View style={{ padding: 16, backgroundColor: '#eef6ff', borderRadius: 12 }}>
            <Text style={{ fontSize: 18 }}>
              Hello <Text style={{ fontWeight: '800', color: tint }}>React Native</Text>!
            </Text>
          </View>
        ),
        code: `<View style={{ padding: 16 }}>
  <Text style={{ fontSize: 18 }}>
    Hello <Text style={{ fontWeight: 'bold' }}>React Native</Text>!
  </Text>
</View>`,
      },
      {
        key: 'image',
        title: 'Image',
        sub: 'expo-image: fast, cached images',
        body: 'expo-image shows images from a URL or a local file. It caches them, fades them in with transition, and contentFit works like CSS object-fit. Always give an image a size.',
        Demo: () => (
          <Image
            source="https://picsum.photos/seed/rn2026/600/300"
            style={{ width: '100%', height: 160, borderRadius: 12 }}
            contentFit="cover"
            transition={300}
            accessibilityLabel="Random sample photo"
          />
        ),
        code: `import { Image } from 'expo-image';

<Image
  source="https://picsum.photos/600/300"
  style={{ width: '100%', height: 160 }}
  contentFit="cover"
  transition={300}
/>`,
      },
      {
        key: 'pressable',
        title: 'Pressable',
        sub: 'make anything tappable',
        body: 'Pressable wraps any content and calls onPress when tapped. Its style can be a function of { pressed } to give visual feedback.',
        Demo: function PressDemo() {
          const [n, setN] = useState(0);
          return (
            <Pressable
              accessibilityRole="button"
              onPress={() => setN(n + 1)}
              style={({ pressed }) => [demo.button, { opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }]}>
              <Text style={demo.buttonText}>Pressed {n} times</Text>
            </Pressable>
          );
        },
        code: `<Pressable
  onPress={() => setN(n + 1)}
  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
  <Text>Pressed {n} times</Text>
</Pressable>`,
      },
      {
        key: 'textinput',
        title: 'TextInput',
        sub: 'read what the user types',
        body: 'TextInput is controlled with state: value shows the state, and onChangeText updates it on every keystroke.',
        Demo: function InputDemo() {
          const [text, setText] = useState('');
          return (
            <View style={{ gap: 8 }}>
              <TextInput value={text} onChangeText={setText} placeholder="Type something" style={demo.input} accessibilityLabel="Demo text input" />
              <Text style={styles.body}>You typed: {text || '…'}</Text>
            </View>
          );
        },
        code: `const [text, setText] = useState('');

<TextInput value={text} onChangeText={setText} placeholder="Type something" />
<Text>You typed: {text}</Text>`,
      },
      {
        key: 'scrollview',
        title: 'ScrollView',
        sub: 'when content is taller than the screen',
        body: 'A View does not scroll. Wrap long content in a ScrollView (style={{ flex: 1 }}) so the screen can scroll. Add horizontal to scroll sideways.',
        Demo: () => (
          <ScrollView horizontal contentContainerStyle={{ gap: 8 }} showsHorizontalScrollIndicator={false}>
            {['#50E3C2', '#4A90E2', '#9013FE', '#F5A623', '#FE706E', '#FFCB65', '#8BD7B1'].map((c) => (
              <View key={c} style={{ width: 90, height: 90, borderRadius: 12, backgroundColor: c }} />
            ))}
          </ScrollView>
        ),
        code: `<ScrollView style={{ flex: 1 }}>
  <View style={styles.container}>…</View>
</ScrollView>`,
      },
    ],
    quiz: [
      { q: 'Where must every piece of text be?', options: ['In a View', 'In a Text', 'Anywhere'], answer: 1, why: 'React Native throws an error for raw text outside <Text>.' },
      { q: 'Your screen is cut off at the bottom. What do you wrap it in?', options: ['View', 'ScrollView', 'Pressable'], answer: 1, why: 'Only a ScrollView scrolls.' },
      { q: 'Which prop updates state as the user types in a TextInput?', options: ['onPress', 'onChangeText', 'value'], answer: 1, why: 'onChangeText is called with the new text.' },
    ],
  },
  {
    key: 'styling',
    title: 'Styling',
    icon: i3('paintpalette.fill', 'palette'),
    lessons: [
      {
        key: 'inline-vs-sheet',
        title: 'Inline vs StyleSheet',
        sub: 'style={{…}} or StyleSheet.create',
        body:
          'Styles are JavaScript objects with camelCase names (backgroundColor, not background-color) and numbers without px. Write them inline with style={{ … }}, or define them once with StyleSheet.create and reuse them (the slides call this internal CSS). Tip: put the cursor on StyleSheet and press Ctrl+Space to auto-import it from react-native.',
        code: `import { StyleSheet, Text, View } from 'react-native';

<View style={styles.container}>
  <Text style={{ fontSize: 20 }}>Inline style</Text>
</View>

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});`,
      },
      {
        key: 'combine',
        title: 'Combining styles',
        sub: 'arrays: later styles win',
        body: 'style can take an array. Later entries override earlier ones, which makes it easy to share a base style and change one thing, or to add a style only when a condition is true.',
        Demo: function CombineDemo() {
          const [on, setOn] = useState(false);
          return (
            <Pressable accessibilityRole="switch" accessibilityState={{ checked: on }} onPress={() => setOn(!on)} style={[demo.card, on && { backgroundColor: tint }]}>
              <Text style={[styles.body, on && { color: '#fff' }]}>{on ? 'Active (tap again)' : 'Tap me'}</Text>
            </Pressable>
          );
        },
        code: `<View style={[styles.card, active && { backgroundColor: 'blue' }]} />`,
      },
      {
        key: 'gradient',
        title: 'Gradients',
        sub: 'expo-linear-gradient',
        body: 'React Native has no gradient color. LinearGradient from expo-linear-gradient draws one: give it at least two colors and optional start and end points.',
        Demo: () => <LinearGradient colors={['#FFEBB6', '#FE706E']} start={[0, 0]} end={[1, 1]} style={{ height: 100, borderRadius: 12 }} />,
        code: `<LinearGradient
  colors={['#FFEBB6', '#FE706E']}
  start={[0, 0]} end={[1, 1]}
  style={{ height: 100 }}
/>`,
      },
    ],
    quiz: [
      { q: 'How do you write CSS background-color in React Native?', options: ['background-color', 'backgroundColor', 'bgColor'], answer: 1, why: 'Style names are camelCase.' },
      { q: 'In style={[a, b]}, which one wins on a conflict?', options: ['a', 'b'], answer: 1, why: 'Later items in the array override earlier ones.' },
    ],
  },
  {
    key: 'flexbox',
    title: 'Layout with Flexbox',
    icon: i3('rectangle.3.group.fill', 'dashboard'),
    lessons: flexLessons,
    quiz: [
      { q: 'What is the default flexDirection in React Native?', options: ['row', 'column'], answer: 1, why: 'Unlike CSS on the web, React Native defaults to column.' },
      { q: 'If justifyContent runs vertically, alignItems runs…', options: ['vertically', 'horizontally'], answer: 1, why: 'alignItems always works on the cross axis.' },
      { q: 'Three siblings have flex 1, 2 and 1. What share does the middle one get?', options: ['1/3', '1/2', '2/3'], answer: 1, why: '2 / (1 + 2 + 1) = 1/2.' },
      { q: 'alignContent does nothing unless…', options: ['flexWrap is wrap', 'position is absolute', 'flex is 1'], answer: 0, why: 'It spreads wrapped lines, so there must be more than one line.' },
      { q: 'Which value puts space before the first item and after the last one?', options: ['space-between', 'space-around'], answer: 1, why: 'space-between leaves no space at the edges.' },
    ],
  },
  {
    key: 'state',
    title: 'Props & state',
    icon: i3('arrow.triangle.2.circlepath', 'sync'),
    lessons: [
      {
        key: 'props',
        title: 'Props',
        sub: 'pass data into a component',
        body: 'A component is a function that returns JSX. Props are its inputs, written like HTML attributes. A component can read its props but must not change them.',
        Demo: () => {
          const Badge = ({ label, color }: { label: string; color: string }) => (
            <View style={{ backgroundColor: color, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>{label}</Text>
            </View>
          );
          return (
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              <Badge label="Ex01" color="#50E3C2" />
              <Badge label="Ex02" color="#4A90E2" />
              <Badge label="Extra" color="#9013FE" />
            </View>
          );
        },
        code: `function Badge({ label, color }) {
  return <Text style={{ backgroundColor: color }}>{label}</Text>;
}

<Badge label="Ex01" color="#50E3C2" />`,
      },
      {
        key: 'usestate',
        title: 'useState',
        sub: 'memory that re-renders the screen',
        body: 'useState gives a component a value that it remembers between renders, plus a function to change it. Calling the setter redraws the screen with the new value. A normal variable would reset on every render.',
        Demo: function Counter() {
          const [count, setCount] = useState(0);
          return (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <Button title="−" onPress={() => setCount(count - 1)} />
              <Text style={{ fontSize: 32, fontWeight: '800', minWidth: 60, textAlign: 'center' }}>{count}</Text>
              <Button title="+" onPress={() => setCount(count + 1)} />
            </View>
          );
        },
        code: `const [count, setCount] = useState(0);

<Button title="+" onPress={() => setCount(count + 1)} />
<Text>{count}</Text>`,
      },
      {
        key: 'conditional',
        title: 'Conditional rendering',
        sub: '&& and ? : inside JSX',
        body: 'Use cond && <X /> to show something only when cond is true, and cond ? <A /> : <B /> to choose between two things. The Forms exercises use this to show “Anonymous” until you save a name.',
        Demo: function Cond() {
          const [name, setName] = useState('');
          return (
            <View style={{ gap: 8 }}>
              <TextInput value={name} onChangeText={setName} placeholder="Your name" style={demo.input} accessibilityLabel="Your name" />
              <Text style={styles.body}>{name ? `Hello, ${name}!` : 'Anonymous'}</Text>
            </View>
          );
        },
        code: `<Text>{name ? \`Hello, \${name}!\` : 'Anonymous'}</Text>`,
      },
    ],
    quiz: [
      { q: 'Why not use `let count = 0` to count taps?', options: ['It is slower', 'It resets on every render and does not redraw the screen', 'let is not allowed'], answer: 1, why: 'Only state changes make React redraw, and state survives re-renders.' },
      { q: 'Can a component change its own props?', options: ['Yes', 'No'], answer: 1, why: 'Props are read-only. Use state for values that change.' },
    ],
  },
  {
    key: 'lists',
    title: 'Lists',
    icon: i3('list.bullet', 'list'),
    lessons: [
      {
        key: 'map',
        title: 'Rendering arrays with map',
        sub: 'one component per item, with a key',
        body: 'To show many items, map an array to components. Each item needs a unique key so React can track it. That is how the exercise list on the class home screen was built.',
        code: `const exercises = [{ id: 'ex01', title: 'Horizontal Stretch' }, …];

{exercises.map((ex) => (
  <Link key={ex.id} href={\`/flexbox/\${ex.id}\`}>{ex.title}</Link>
))}`,
      },
      {
        key: 'flatlist',
        title: 'FlatList',
        sub: 'long lists without lag',
        body: 'FlatList only renders the rows that are on screen, so it stays fast with thousands of items. Give it data, renderItem and keyExtractor.',
        Demo: () => (
          <FlatList
            style={{ height: 200 }}
            nestedScrollEnabled
            data={Array.from({ length: 1000 }, (_, i) => i + 1)}
            keyExtractor={(n) => String(n)}
            renderItem={({ item }) => <Text style={[styles.body, { paddingVertical: 6 }]}>Row {item}</Text>}
            ItemSeparatorComponent={() => <View style={styles.sep} />}
          />
        ),
        code: `<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Text>{item.title}</Text>}
/>`,
      },
    ],
    quiz: [
      { q: 'What does each item in a mapped list need?', options: ['A style', 'A unique key', 'An onPress'], answer: 1, why: 'Keys let React match items between renders.' },
      { q: 'You have 5,000 rows. Which do you use?', options: ['ScrollView + map', 'FlatList'], answer: 1, why: 'FlatList only renders visible rows.' },
    ],
  },
  {
    key: 'navigation',
    title: 'Navigation',
    icon: i3('arrow.triangle.branch', 'alt_route'),
    lessons: [
      {
        key: 'link',
        title: 'Link',
        sub: 'go to another screen',
        body: 'Link from expo-router navigates when tapped, like <a href> on the web. Use asChild to make your own Pressable the link.',
        Demo: () => (
          <Link href={'/page2/exercises' as Href} asChild>
            <Pressable accessibilityRole="link" style={demo.button}>
              <Text style={demo.buttonText}>Open Exercises</Text>
            </Pressable>
          </Link>
        ),
        code: `import { Link } from 'expo-router';

<Link href="/page2" style={styles.link}>
  <Text style={styles.linkText}>Go to page 2</Text>
</Link>`,
      },
      {
        key: 'router',
        title: 'router',
        sub: 'navigate from code',
        body: 'router.push opens a screen, router.back goes back, and router.replace swaps the current screen. Use it inside event handlers, for example after saving a form.',
        Demo: () => <Button title="router.push('/page2/playground')" onPress={() => router.push('/page2/playground' as Href)} />,
        code: `import { router } from 'expo-router';

<Button title="Open" onPress={() => router.push('/playground')} />`,
      },
      {
        key: 'layouts',
        title: 'Stack & Tabs layouts',
        sub: '_layout.tsx and dynamic routes',
        body:
          'A _layout.tsx file wraps the screens in its folder. Stack pushes screens with a back button, and NativeTabs shows the real iOS/Android tab bar (this app uses both). A file named [topic].tsx is a dynamic route: useLocalSearchParams() reads the topic from the URL.',
        code: `// src/app/_layout.tsx
import { NativeTabs } from 'expo-router/native-tabs';

<NativeTabs>
  <NativeTabs.Trigger name="index">
    <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
    <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
  </NativeTabs.Trigger>
</NativeTabs>

// src/app/lesson/[topic].tsx
const { topic } = useLocalSearchParams();`,
      },
    ],
    quiz: [
      { q: 'Which file sets up a Stack for the screens in its folder?', options: ['index.tsx', '_layout.tsx', 'stack.tsx'], answer: 1, why: '_layout.tsx defines the navigator.' },
      { q: 'How do you navigate after a button press in code?', options: ['router.push()', 'window.location', '<Link>'], answer: 0, why: 'router works from any event handler.' },
    ],
  },
  {
    key: 'expo',
    title: 'Expo APIs',
    icon: i3('shippingbox.fill', 'package_2'),
    lessons: [
      {
        key: 'install',
        title: 'Installing Expo packages',
        sub: 'npx expo install',
        body: 'Always add libraries with npx expo install, not npm install. It picks the version that matches your Expo SDK. Expo Go includes the common Expo modules. Libraries with other native code need a development build.',
        code: `npx expo install expo-haptics expo-clipboard
npx expo-doctor   # check for version problems`,
      },
      {
        key: 'haptics',
        title: 'Haptics',
        sub: 'expo-haptics: vibration feedback',
        body: 'Small vibrations make taps feel physical. This app uses them when you pick a chip or copy code. Try each one on a phone (web has no haptics).',
        Demo: () => (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {(['Light', 'Medium', 'Heavy'] as const).map((s) => (
              <Button key={s} title={s} onPress={() => Platform.OS !== 'web' && Haptics.impactAsync(Haptics.ImpactFeedbackStyle[s])} />
            ))}
            <Button title="Success" onPress={() => Platform.OS !== 'web' && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)} />
          </View>
        ),
        code: `import * as Haptics from 'expo-haptics';

Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);`,
      },
      {
        key: 'clipboard',
        title: 'Clipboard',
        sub: 'expo-clipboard',
        body: 'Copy text so the user can paste it elsewhere. Every Copy button on a code block in this app uses it.',
        Demo: function ClipDemo() {
          const [done, setDone] = useState(false);
          return <Button title={done ? 'Copied ✓' : 'Copy “Hello Expo”'} onPress={() => Clipboard.setStringAsync('Hello Expo').then(() => setDone(true))} />;
        },
        code: `import * as Clipboard from 'expo-clipboard';

await Clipboard.setStringAsync('Hello Expo');`,
      },
      {
        key: 'browser',
        title: 'In-app browser',
        sub: 'expo-web-browser',
        body: 'openBrowserAsync opens a web page in a browser sheet on top of your app, so the user does not leave it.',
        Demo: () => <Button title="Open Flexbox Froggy" onPress={() => WebBrowser.openBrowserAsync('https://flexboxfroggy.com/')} />,
        code: `import * as WebBrowser from 'expo-web-browser';

WebBrowser.openBrowserAsync('https://flexboxfroggy.com/');`,
      },
      {
        key: 'symbols',
        title: 'Icons',
        sub: 'expo-symbols: SF Symbols & Material Symbols',
        body: 'SymbolView draws the system icon set: SF Symbols on iOS and Material Symbols on Android and web. Give a name per platform.',
        Demo: () => (
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <Icon name={i3('heart.fill', 'favorite')} size={32} color="#FE706E" />
            <Icon name={i3('star.fill', 'star')} size={32} color="#F5A623" />
            <Icon name={i3('bolt.fill', 'bolt')} size={32} color="#9013FE" />
          </View>
        ),
        code: `import { SymbolView } from 'expo-symbols';

<SymbolView name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }} size={32} tintColor="red" />`,
      },
    ],
    quiz: [
      { q: 'Which command adds an Expo library at the right version?', options: ['npm install expo-haptics', 'npx expo install expo-haptics'], answer: 1, why: 'expo install matches the version to your SDK.' },
    ],
  },
];

export const findLesson = (key: string) => {
  for (const m of COURSE) {
    const l = m.lessons.find((x) => x.key === key);
    if (l) return { module: m, lesson: l };
  }
};

const demo = StyleSheet.create({
  button: { backgroundColor: tint, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  input: { borderWidth: 1, borderColor: '#c9d0d9', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, backgroundColor: '#fff' },
  challenge: { gap: 10, padding: 14, borderRadius: 16, borderWidth: 2, borderColor: '#d9dde3', backgroundColor: '#f7f9fb' },
  card: { padding: 20, borderRadius: 12, backgroundColor: '#eef1f5', alignItems: 'center' },
});
export { demo as demoStyles, Button };
