import { Stack } from "expo-router"

const RootLayout = () => {
  return (
    <Stack>
    <Stack.Screen name="index"
    options={{headerShown:false}}
    />
    <Stack.Screen name="(tabs)"
    options={{headerShown:false,animation:"slide_from_right"}}
    />

    <Stack.Screen name="(auth)"
    options={{headerShown:false}} 
    />

    </Stack>
    
  )
}

export default RootLayout
