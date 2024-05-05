import {View} from 'react-native';

import Container from '../../components/Layouts/Container';
import ThemeToggle from '../../components/Buttons/ThemeToggle';
import MainButton from '../../components/Buttons/Main';
import {useNavigation} from '@react-navigation/native';

export default function SignOptionsPage() {
  const navigation = useNavigation();
  return (
    <Container style={{flex: 1}}>
      <View style={{margin: 16}}>
        <ThemeToggle />
      </View>
      <View style={{flex: 1}} />
      <View style={{padding: 16, gap: 20}}>
        <MainButton variant="primary" width="100%">
          Login
        </MainButton>
        <MainButton
          variant="secondary"
          width="100%"
          onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </MainButton>
      </View>
    </Container>
  );
}
