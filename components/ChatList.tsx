import { View, FlatList } from 'react-native';
import React from 'react';
import ChatItem from './ChatItem';
import { router } from 'expo-router';

interface User {
  email: string;
  userId: string;
}

interface ChatListProps {
  users: User[];
}

const ChatList: React.FC<ChatListProps> = ({ users }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item) => item.userId} // Changed to userId for a stable key
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            noBorder={index + 1 === users.length}
            router={router}
            item={item}
            index={index}
          />
        )}
      />
    </View>
  );
};

export default ChatList;
