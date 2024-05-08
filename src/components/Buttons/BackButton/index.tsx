import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';

import useTheme from '../../../hooks/useTheme';
import colors from '../../../styles/colors';
import IconButton from '../Icon';

export default function BackButton() {
  const { isLight } = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <IconButton onPress={handleBack} variant="secondary">
      <ArrowLeft color={isLight ? colors.dark() : colors.light()} size={22} />
    </IconButton>
  );
}
