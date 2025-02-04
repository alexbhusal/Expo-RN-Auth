import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import Loading from "@/components/loading";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { register } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const UserRegister = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    const response = 
    await register
    (emailRef.current,passwordRef.current);
    setLoading(false);
    console.log(response);
  };

  return (
    <View>
      <View>
        <Text className="text-3xl font-bold text-center mt-5">Register</Text>
      </View>

      <View className="flex items-center mx-4 space-y-4">
        <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
          <TextInput
            onChangeText={(value) => (emailRef.current = value)}
            placeholder="Email"
            placeholderTextColor={"red"}
            autoCapitalize="none"
          />
        </View>
        <View className="bg-black/5 p-5 rounded-2xl w-full mb-3">
          <TextInput
            onChangeText={(value) => (passwordRef.current = value)}
            placeholder="Password"
            placeholderTextColor={"red"}
            secureTextEntry
          />
        </View>
        <View className="w-full items-end">
          <TouchableOpacity onPress={() => {}}>
            <Text className="text-blue-500 mb-5">Forget Password?</Text>
          </TouchableOpacity>
        </View>
        <View>
          {loading ? (
            <View className="flex-row justify-center">
              <Loading />
            </View>
          ) : (
            <View className="w-2/4">
              <TouchableOpacity
                className="w-full bg-yellow-500 p-3 rounded-3xl mb-3"
                onPress={UserRegister}
              >
                <Text className="text-white text-xl font-bold text-center">
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View className="flex-row justify-center">
          <Text>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/login"); // Adjust this route as needed
            }}
          >
            <Text className="mx-1 text-green-600">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
