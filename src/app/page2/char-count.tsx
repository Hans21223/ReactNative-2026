import { useState } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import { Panel, styles } from '@/components/ui';
import { Button, demoStyles } from '@/course';

export const letters = (s: string) => s.replace(/\s/g, '').length;

export default function CharCount() {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState('');

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" keyboardShouldPersistTaps="handled" contentContainerStyle={styles.screen}>
      <Text style={{ fontSize: 28, fontWeight: '800', textAlign: 'center' }}>{saved || 'Anonymous'}</Text>
      <Text style={[styles.body, { textAlign: 'center' }]}>{letters(saved)} Characters</Text>
      <Panel>
        <Text style={styles.label}>Your Name</Text>
        <TextInput value={name} onChangeText={setName} style={demoStyles.input} onSubmitEditing={() => setSaved(name.trim())} accessibilityLabel="Your Name" />
        <Button title="Save" onPress={() => setSaved(name.trim())} />
      </Panel>
    </ScrollView>
  );
}
