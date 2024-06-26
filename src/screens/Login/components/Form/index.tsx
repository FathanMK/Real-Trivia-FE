import { ScrollView, View } from 'react-native';
import { useContext } from 'react';

import Input from '../../../../components/Form/Input';
import Password from '../../../../components/Form/Password';
import MainButton from '../../../../components/Buttons/MainButton';
import { LoginContext } from '../../providers';

export default function Form() {
  const { control, handleSubmit, onSubmit, isLoading } =
    useContext(LoginContext);

  return (
    <>
      <ScrollView>
        <View style={{ flex: 1, margin: 16, gap: 26 }}>
          <Input control={control} name="username" placeholder="Username" />
          <Password control={control} name="password" placeholder="Password" />
        </View>
      </ScrollView>
      <View style={{ marginTop: 24, marginHorizontal: 16, marginBottom: 16 }}>
        <MainButton
          isLoading={isLoading}
          variant="primary"
          width="100%"
          onPress={handleSubmit(onSubmit)}>
          Login
        </MainButton>
      </View>
    </>
  );
}
