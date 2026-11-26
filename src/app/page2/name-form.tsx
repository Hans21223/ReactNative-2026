import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Platform, ScrollView, Text, TextInput } from 'react-native';
import { Panel, styles } from '@/components/ui';
import { Button, demoStyles } from '@/course';

export default function NameForm() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [saved, setSaved] = useState('');

  const save = () => {
    setSaved(`${first} ${last}`.trim());
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled" contentContainerStyle={styles.screen}>
      <Text style={{ fontSize: 28, fontWeight: '800', textAlign: 'center' }}>{saved || 'Anonymous'}</Text>
      <Panel>
        <Text style={styles.label}>Name</Text>
        <TextInput value={first} onChangeText={setFirst} style={demoStyles.input} autoComplete="given-name" returnKeyType="next" accessibilityLabel="Name" />
        <Text style={styles.label}>Last Name</Text>
        <TextInput value={last} onChangeText={setLast} style={demoStyles.input} autoComplete="family-name" onSubmitEditing={save} accessibilityLabel="Last Name" />
        <Button title="Save" onPress={save} />
      </Panel>
    </ScrollView>
  );
}
