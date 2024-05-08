import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import RegisterSchema from '../schemas/RegisterSchema';
import { IRegister } from '../interfaces/IRegister';
import { useRegisterUserMutation } from '../../../stores/services/user';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function useSignUp() {
  const navigation = useNavigation()
  const { control, handleSubmit } = useForm<IRegister>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterSchema),
  });
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  async function onSubmit(data: IRegister) {
    await registerUser(data)
      .unwrap()
      .then(res => {
        navigation.navigate("Login")
        ToastAndroid.show(res.message!, ToastAndroid.SHORT);
      })
      .catch(res => ToastAndroid.show(res.data.message!, ToastAndroid.SHORT));
  }

  return { control, onSubmit, handleSubmit, isLoading };
}
