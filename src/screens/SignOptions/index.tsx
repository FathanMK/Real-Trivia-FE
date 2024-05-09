import { ToastAndroid, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Container from '../../components/Layouts/Container';
import ThemeToggle from '../../components/Buttons/ThemeToggle';
import MainButton from '../../components/Buttons/MainButton';
import useAppSelector from '../../hooks/useAppSelector';
import { useLoginUserMutation } from '../../stores/services/user';

export default function SignOptionsScreen() {
  const navigation = useNavigation();
  const { username, password } = useAppSelector((state) => state.savedUser)
  const [loginUser, { isLoading }] = useLoginUserMutation()

  async function handleContinue() {
    await loginUser({ username, password })
      .unwrap()
      .then(() => {
        ToastAndroid.show("Successfully logged in!", ToastAndroid.SHORT);
      })
      .catch(res => ToastAndroid.show(res.data.message!, ToastAndroid.SHORT));
  }

  return (
    <Container style={{ flex: 1 }}>
      <View style={{ margin: 16 }}>
        <ThemeToggle />
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ padding: 16, gap: 20 }}>
        {username &&
          <MainButton isLoading={isLoading} variant="primary" width="100%" onPress={handleContinue}>
            Continue as {username}
          </MainButton>
        }
        <MainButton isLoading={isLoading} variant="primary" width="100%" onPress={() => navigation.navigate('Login')}>
          Login
        </MainButton>
        <MainButton
          isLoading={isLoading}
          variant="secondary"
          width="100%"
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </MainButton>
      </View>
    </Container>
  );
}
