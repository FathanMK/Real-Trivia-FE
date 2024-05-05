import {View} from 'react-native';
import {useForm} from 'react-hook-form';

import Container from '../../components/Layouts/Container';
import ThemeToggle from '../../components/Buttons/ThemeToggle';
import BackButton from '../../components/Buttons/BackButton';
import Form from './components/Form';
import SignUpProvider from './providers';

export default function SignUpPage() {
  const {control} = useForm();
  return (
    <Container style={{flex: 1}}>
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
      <SignUpProvider>
        <Form />
      </SignUpProvider>
    </Container>
  );
}
