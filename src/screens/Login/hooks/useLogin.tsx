import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ToastAndroid } from 'react-native';

import LoginSchema from '../schemas/LoginSchema';
import { ILogin } from '../interfaces/ILogin';
import { useLoginUserMutation } from '../../../stores/services/user';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { setSavedAccount } from '../../../stores/slices/savedUser';

export default function useLogin() {
  const dispatch = useAppDispatch()
  const { control, handleSubmit, getValues } = useForm<ILogin>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  });
  const [loginUser, { isLoading }] = useLoginUserMutation();

  async function onSubmit(data: ILogin) {
    await loginUser(data)
      .unwrap()
      .then(() => {
        dispatch(setSavedAccount({ username: getValues("username"), password: getValues("password") }))
        ToastAndroid.show("Successfully logged in!", ToastAndroid.SHORT);
      })
      .catch(res => ToastAndroid.show(res.data.message!, ToastAndroid.SHORT));
  }

  return { control, onSubmit, handleSubmit, isLoading };
}
