import React from 'react';
import { View } from 'react-native';

export default function Extra() {
  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {/* Top section: flex 1 */}
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1, backgroundColor: '#FFEBB6' }} />
        <View style={{ flex: 2, backgroundColor: '#FFEBB6' }} />
      </View>

      {/* Bottom section: flex 2 */}
      <View style={{ flex: 2, flexDirection: 'row' }}>
        {/* Left column: flex 1 */}
        <View style={{ flex: 1, backgroundColor: '#8BD7B1' }} />

        {/* Right column: flex 2 */}
        <View style={{ flex: 2, flexDirection: 'column' }}>
          {/* Top of right column: flex 1 */}
          <View style={{ flex: 1, backgroundColor: '#FE706E' }} />

          {/* Bottom of right column: flex 1 */}
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, backgroundColor: '#FFCB65' }} />
            <View style={{ flex: 1, backgroundColor: '#FE706E' }} />
          </View>
        </View>
      </View>
    </View>
  );
}
