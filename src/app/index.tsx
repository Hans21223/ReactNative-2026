import { Link, type Href } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const week2Exercises = [
    { id: "ex01", title: "Ex01 : Horizontal Stretch" },
    { id: "ex02", title: "Ex02 : Vertical Stretch" },
    { id: "ex03", title: "Ex03 : Horizontal Stacking Items" },
    { id: "ex04", title: "Ex04 : Vertical Stacking Items" },
    { id: "ex05", title: "Ex05 : Horizontal Center Stack" },
    { id: "ex06", title: "Ex06 : Vertical Center Stack" },
    { id: "ex07", title: "Ex07 : Bottom Align Vertical Stack" },
    { id: "ex08", title: "Ex08 : Space Between Horizontal" },
    { id: "ex09", title: "Ex09 : Space Between and Around" },
    { id: "ex10", title: "Ex10 : Fullscreen Flex" },
    { id: "ex11", title: "Ex11 : Flex Split" },
    { id: "ex12", title: "Ex12 : Flex Portion" },
    { id: "extra", title: "Extra : Challenge Quiz 1 (Slide 72)" },
    { id: "extra2", title: "Extra 2 : Challenge Quiz 2 (Slide 73)" },
  ];

  const week3Screens: { href: Href; title: string }[] = [
    { href: "/test-components", title: "Test Components" },
    { href: "/test-greeting", title: "Test Greeting" },
    { href: "/travel", title: "Travel (Ex 1 - Ex 4)" },
    { href: "/resort", title: "Resort (Quiz Section 1-8)" },
    { href: "/review", title: "Reviews (Extra Challenge)" },
  ];

  const paperScreens: { href: Href; title: string }[] = [
    { href: "/test-paper", title: "Test Paper (React Native Paper)" },
    { href: "/paper-quiz", title: "Paper Quiz (Resort)" },
  ];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit app/index.tsx to edit this screen. Kan</Text>

      <Text style={styles.subtitle}>Travel App (Merged Week 3 + Paper)</Text>
      <View style={[styles.list, { marginBottom: 24 }]}>
        <Link href="/travel-app" style={[styles.link, styles.appLink]}>
          <Text style={styles.linkText}>Open WanderStay Travel App</Text>
        </Link>
      </View>

      <Text style={styles.subtitle}>Week 3 : Components and Props</Text>
      <View style={styles.list}>
        {week3Screens.map((item) => (
          <Link key={String(item.href)} href={item.href} style={[styles.link, styles.week3Link]}>
            <Text style={styles.linkText}>{item.title}</Text>
          </Link>
        ))}
      </View>

      <Text style={[styles.subtitle, { marginTop: 24 }]}>React Native Paper</Text>
      <View style={styles.list}>
        {paperScreens.map((item) => (
          <Link key={String(item.href)} href={item.href} style={[styles.link, styles.paperLink]}>
            <Text style={styles.linkText}>{item.title}</Text>
          </Link>
        ))}
      </View>

      <Text style={[styles.subtitle, { marginTop: 24 }]}>Week 2 : Flexbox Exercises</Text>
      <View style={styles.list}>
        {week2Exercises.map((ex) => (
          <Link key={ex.id} href={`/flexbox/${ex.id}` as Href} style={styles.link}>
            <Text style={styles.linkText}>{ex.title}</Text>
          </Link>
        ))}

        <Link href="/page2" style={[styles.link, styles.secondaryLink]}>
          <Text style={styles.linkText}>ไปหน้าที่ 2</Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 12,
  },
  list: {
    width: "100%",
    maxWidth: 320,
    gap: 8,
  },
  link: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  appLink: {
    backgroundColor: "#E5634D",
  },
  week3Link: {
    backgroundColor: "#FF7043",
  },
  paperLink: {
    backgroundColor: "#7E57C2",
  },
  secondaryLink: {
    backgroundColor: "#78909C",
    marginTop: 10,
  },
  linkText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
