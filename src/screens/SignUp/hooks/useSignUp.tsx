import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import RegisterSchema from '../schemas/RegisterSchema';
import {IRegister} from '../interfaces/IRegister';

export default function useSignUp() {
  const {control, handleSubmit} = useForm<IRegister>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterSchema),
  });

  function onSubmit(data: IRegister) {
    console.log(data);
  }

  return {control, onSubmit, handleSubmit};
}
