import {Text, TextInput, View} from 'react-native';
import {Control, Controller, FieldValues} from 'react-hook-form';

import colors from '../../../styles/colors';
import useTheme from '../../../hooks/useTheme';

interface Props {
  name: string;
  control: Control<FieldValues>;
  placeholder?: string;
}

export default function Input({name, placeholder, control}: Props) {
  const {isLight} = useTheme();
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <View>
          <TextInput
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{
              borderWidth: 2,
              borderColor: error
                ? colors.error()
                : isLight
                ? colors.dark()
                : colors.light(),
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontFamily: 'Inter-Regular',
              color: isLight ? colors.dark() : colors.light(),
            }}
            placeholderTextColor={
              isLight ? colors.dark('0.75') : colors.light('0.75')
            }
          />
          {error && (
            <Text
              style={{
                color: error
                  ? colors.error()
                  : isLight
                  ? colors.dark()
                  : colors.light(),
                fontFamily: 'Inter-Regular',
              }}>
              {error?.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
