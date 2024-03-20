import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Link href="/(tabs)/exercise">
          <Text style={styles.linkText}>Get Started</Text>
      </Link>
      <Link href="/(auth)/login">
          <Text style={styles.linkText}>Log In</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2123',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  linkText: {
    fontSize: 35,
    color: '#2e78b7',
  },
});
