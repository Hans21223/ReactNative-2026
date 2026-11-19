import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Page2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>นี่คือหน้าที่ 2</Text>

      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>กลับไปหน้าแรก</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  link: {
    margin: 10,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  linkText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
