import {Control, Controller, FieldValues} from 'react-hook-form';
import {Pressable, Text, TextInput, View} from 'react-native';
import {Eye, EyeOff} from 'lucide-react-native';
import {useState} from 'react';

import colors from '../../../styles/colors';
import useTheme from '../../../hooks/useTheme';

interface Props {
  name: string;
  control: Control<FieldValues>;
  placeholder?: string;
}

export default function Password({name, control, placeholder}: Props) {
  const {isLight} = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: error
                ? colors.error()
                : isLight
                ? colors.dark()
                : colors.light(),
              borderRadius: 8,
              paddingHorizontal: 16,
            }}>
            <TextInput
              secureTextEntry={!showPassword}
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{
                paddingVertical: 12,
                paddingHorizontal: 0,
                flex: 1,
                fontFamily: 'Inter-Regular',
                color: isLight ? colors.dark() : colors.light(),
              }}
              placeholderTextColor={
                isLight ? colors.dark('0.75') : colors.light('0.75')
              }
            />
            <Pressable onPress={handleShowPassword}>
              {showPassword ? (
                <EyeOff
                  color={isLight ? colors.dark() : colors.light()}
                  size={20}
                />
              ) : (
                <Eye
                  color={isLight ? colors.dark() : colors.light()}
                  size={20}
                />
              )}
            </Pressable>
          </View>
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
