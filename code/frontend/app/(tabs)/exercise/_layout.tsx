import { Stack } from "expo-router";

const Layout = () => {
  return <Stack>
    <Stack.Screen name="trainingPlanModal" options={{presentation: 'modal'}} />
  </Stack>;
};

export default Layout;