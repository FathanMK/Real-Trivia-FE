import {ScrollView, View} from 'react-native';
import {useContext} from 'react';

import Input from '../../../../components/Form/Input';
import Password from '../../../../components/Form/Password';
import MainButton from '../../../../components/Buttons/Main';
import {SignUpContext} from '../../providers';

export default function Form() {
  const {control, handleSubmit, onSubmit} = useContext(SignUpContext);
  return (
    <>
      <ScrollView>
        <View style={{flex: 1, margin: 16, gap: 26}}>
          <Input control={control} name="username" placeholder="Username" />
          <Input control={control} name="email" placeholder="Email" />
          <Password control={control} name="password" placeholder="Password" />
          <Password
            control={control}
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </View>
      </ScrollView>
      <View style={{marginTop: 24, marginHorizontal: 16, marginBottom: 16}}>
        <MainButton
          variant="primary"
          width="100%"
          onPress={handleSubmit(onSubmit)}>
          Sign Up
        </MainButton>
      </View>
    </>
  );
}
