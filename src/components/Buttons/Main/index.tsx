import {ReactNode} from 'react';
import {ActivityIndicator, DimensionValue, Pressable} from 'react-native';

import colors from '../../../styles/colors';
import useTheme from '../../../hooks/useTheme';
import Text from '../../Layouts/Text';

interface Props {
  children?: ReactNode;
  width?: DimensionValue;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
  isLoading?: boolean;
}

export default function MainButton({
  children,
  width,
  variant,
  isLoading,
  onPress,
}: Props) {
  const {isLight} = useTheme();
  return (
    <Pressable
      disabled={isLoading}
      style={{
        backgroundColor:
          variant === 'primary'
            ? isLight
              ? colors.dark()
              : colors.light()
            : 'transparent',
        width,
        borderWidth: variant === 'secondary' ? 2 : 0,
        borderColor:
          variant === 'secondary'
            ? isLight
              ? colors.dark()
              : colors.light()
            : 'transparent',
        padding: 8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        borderRadius: 10,
        opacity: isLoading ? 0.75 : 1,
      }}
      android_ripple={{
        color: isLight ? colors.light('0.15') : colors.dark('0.15'),
      }}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={isLight ? colors.light() : colors.dark()} />
      ) : (
        <Text
          weight={900}
          btnVariant={variant}
          style={{
            fontSize: 16,
          }}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}
