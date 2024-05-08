import { View } from 'react-native';

import Container from '../../components/Layouts/Container';
import BackButton from '../../components/Buttons/BackButton';
import ThemeToggle from '../../components/Buttons/ThemeToggle';
import LoginProvider from './providers';
import Form from './components/Form';

export default function LoginScreen() {
  return (
    <Container style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 16,
          marginHorizontal: 16,
          marginBottom: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <BackButton />
        <ThemeToggle />
      </View>
      <LoginProvider>
        <Form />
      </LoginProvider>
    </Container>
  );
}
