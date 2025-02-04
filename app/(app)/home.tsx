import {
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ChatList from "@/components/ChatList";
import { userRef } from "@/firebaseConfig";
import { CollectionReference, DocumentData, QuerySnapshot, query, where, getDocs } from "firebase/firestore";

interface User {
  email: string;
  userId: string;
}

const Home: React.FC = () => {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, [user]);

  const getUsers = async () => {
    try {
      const q = query(userRef, where('userId', '!=', user.uid));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      const data: User[] = [];
      
      querySnapshot.forEach(doc => {
        data.push({ ...doc.data() } as User);
      });
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const handleLogOut = async () => {
    await logout();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default Home;
