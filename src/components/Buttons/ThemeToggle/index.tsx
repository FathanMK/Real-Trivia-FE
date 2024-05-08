import { Moon, Sun } from 'lucide-react-native';

import colors from '../../../styles/colors';
import useTheme from '../../../hooks/useTheme';
import IconButton from '../Icon';

export default function ThemeToggle() {
  const { isLight, handleTheme } = useTheme();
  return (
    <IconButton variant="primary" onPress={handleTheme}>
      {isLight ? (
        <Sun color={isLight ? colors.light() : colors.dark()} size={20} />
      ) : (
        <Moon color={isLight ? colors.light() : colors.dark()} size={20} />
      )}
    </IconButton>
  );
}
