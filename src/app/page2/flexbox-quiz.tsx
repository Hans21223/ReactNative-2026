import { View } from 'react-native';

const sq = { width: 100, height: 100, backgroundColor: '#F5A623' };

export default function FlexboxQuiz() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ height: 25, backgroundColor: '#50E3C2' }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <View style={sq} />
        <View style={{ width: 160, height: 30, backgroundColor: '#F5A623' }} />
      </View>
      <View style={{ flexDirection: 'row', height: 78 }}>
        <View style={{ flex: 1, backgroundColor: '#9013FE' }} />
        <View style={{ flex: 1, backgroundColor: '#4A90E2' }} />
      </View>
      <View style={{ height: 13, backgroundColor: '#50E3C2' }} />
      <View style={{ flex: 1.5, justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={sq} />
          <View style={sq} />
          <View style={sq} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={sq} />
          <View style={sq} />
          <View style={sq} />
        </View>
      </View>
      <View style={{ height: 60, backgroundColor: '#4A90E2' }} />
    </View>
  );
}
