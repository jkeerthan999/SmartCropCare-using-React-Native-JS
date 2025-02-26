import { Stack } from 'expo-router'

const AuthoLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign" />
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default AuthoLayout;
