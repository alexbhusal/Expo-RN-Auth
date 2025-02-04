import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Router } from 'expo-router';

interface ChatItemProps {
  item: {
    email: string;
    userId: string;
  };
  router: Router;
  noBorder: boolean;
}

const ChatItem: React.FC<ChatItemProps> = ({ item, router, noBorder }) => {
  const openChatRoom = () => {
    router.push({
      pathname: '/chatRoom',
      params: item,
    });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={openChatRoom}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 16,
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
          paddingBottom: 8,
          borderBottomWidth: noBorder ? 0 : 1, // Adjust border based on noBorder
        }}
      >
        <View style={{ flex: 1, gap: 4 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text>{item?.email}</Text>
            <Text>{item?.userId}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatItem;
