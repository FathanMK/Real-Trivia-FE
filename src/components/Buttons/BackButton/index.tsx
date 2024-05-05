import {Pressable} from 'react-native';
import useTheme from '../../../hooks/useTheme';
import colors from '../../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeft} from 'lucide-react-native';

export default function BackButton() {
  const {isLight} = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  return (
    <Pressable
      style={{
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      android_ripple={{
        color: isLight ? colors.light('0.15') : colors.dark('0.15'),
      }}
      onPress={handleBack}>
      <ArrowLeft color={isLight ? colors.dark() : colors.light()} size={22} />
    </Pressable>
  );
}
