import {Moon, Sun} from 'lucide-react-native';
import {Pressable} from 'react-native';

import colors from '../../../styles/colors';
import useTheme from '../../../hooks/useTheme';

export default function ThemeToggle() {
  const {isLight, handleTheme} = useTheme();
  return (
    <Pressable
      style={{
        backgroundColor: isLight ? colors.dark() : colors.light(),
        padding: 8,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
      }}
      android_ripple={{
        color: isLight ? colors.light('0.15') : colors.dark('0.15'),
      }}
      onPress={handleTheme}>
      {isLight ? (
        <Sun color={isLight ? colors.light() : colors.dark()} size={20} />
      ) : (
        <Moon color={isLight ? colors.light() : colors.dark()} size={20} />
      )}
    </Pressable>
  );
}
