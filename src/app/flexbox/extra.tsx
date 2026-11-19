import { StyleSheet, View } from 'react-native';

export default function Extra() {
  return (
    <View style={styles.container}>
      {/* Left column: flex 1 (#FFEBB6) */}
      <View style={[styles.box, { flex: 1, backgroundColor: '#FFEBB6' }]} />

      {/* Right section: flex 2 */}
      <View style={{ flex: 2, flexDirection: 'column', gap: 6 }}>
        {/* Top of right section: flex 1 (#8BD7B1) */}
        <View style={[styles.box, { flex: 1, backgroundColor: '#8BD7B1' }]} />

        {/* Bottom of right section: flex 2 */}
        <View style={{ flex: 2, flexDirection: 'row', gap: 6 }}>
          {/* Left column of bottom section: flex 1 (#FE706E) */}
          <View style={[styles.box, { flex: 1, backgroundColor: '#FE706E' }]} />

          {/* Right column of bottom section: flex 2 */}
          <View style={{ flex: 2, flexDirection: 'column', gap: 6 }}>
            {/* Top box: flex 1 (#FFCB65) */}
            <View style={[styles.box, { flex: 1, backgroundColor: '#FFCB65' }]} />

            {/* Bottom box: flex 1 (#FE706E) */}
            <View style={[styles.box, { flex: 1, backgroundColor: '#FE706E' }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 6,
    padding: 6,
    backgroundColor: '#fff',
  },
  box: {
    borderRadius: 2,
  },
});
