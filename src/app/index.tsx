import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const exercises = [
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
    { id: "extra", title: "Extra : Challenge Quiz" },
  ];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit app/index.tsx to edit this screen. Kan</Text>
      <Text style={styles.subtitle}>React Native Flexbox Exercises</Text>

      <View style={styles.list}>
        {exercises.map((ex) => (
          <Link key={ex.id} href={`/flexbox/${ex.id}` as any} style={styles.link}>
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
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
