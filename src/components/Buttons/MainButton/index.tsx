import { ReactNode } from 'react';
import { ActivityIndicator, DimensionValue, StyleProp, ViewStyle, Pressable } from 'react-native';

import colors from '../../../styles/colors';
import useTheme from '../../../hooks/useTheme';
import Text from '../../Layouts/Text';

interface Props {
  children?: ReactNode;
  width?: DimensionValue;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function MainButton({
  children,
  width,
  variant,
  isLoading,
  style,
  onPress,
}: Props) {

  const { isLight } = useTheme();
  const styles = {
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
    //@ts-ignore
    ...style
  }

  return (
    <Pressable
      disabled={isLoading}
      style={styles}
      android_ripple={{
        color: variant === "primary" ? isLight ? colors.light('0.15') : colors.dark('0.15') : isLight ? colors.dark('0.15') : colors.light('0.15'),
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
