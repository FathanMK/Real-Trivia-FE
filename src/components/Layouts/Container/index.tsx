import {StyleProp, View, ViewStyle} from 'react-native';
import {ReactNode} from 'react';

import useTheme from '../../../hooks/useTheme';
import colors from '../../../styles/colors';

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Container({children, style}: Props) {
  const {theme} = useTheme();
  const styles = {
    backgroundColor: theme === 'light' ? colors.light() : colors.dark(),
    //@ts-ignore
    ...style,
  };
  return <View style={styles}>{children}</View>;
}
