import {ReactNode} from 'react';
import {Text as RNText, StyleProp, TextStyle} from 'react-native';

import colors from '../../../styles/colors';
import useTheme from '../../../hooks/useTheme';

interface Props {
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  btnVariant?: 'primary' | 'secondary';
}

export default function Text({
  children,
  style,
  weight = 400,
  btnVariant,
}: Props) {
  const {isLight} = useTheme();
  const styles = {
    //@ts-ignore
    ...style,
    color: btnVariant
      ? btnVariant === 'primary'
        ? isLight
          ? colors.light()
          : colors.dark()
        : isLight
        ? colors.dark()
        : colors.light()
      : isLight
      ? colors.dark()
      : colors.light(),
    fontFamily:
      weight === 400
        ? 'Inter-Regular'
        : weight === 500
        ? 'Inter-Medium'
        : weight === 600
        ? 'Inter-SemiBold'
        : weight === 700
        ? 'Inter-Bold'
        : weight === 800
        ? 'Inter-ExtraBold'
        : 'Inter-Black',
  };

  return <RNText style={styles}>{children}</RNText>;
}
