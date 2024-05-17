import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

import useAppSelector from '../../hooks/useAppSelector';
import HomeScreen from '../../screens/Home';
import SignOptionsScreen from '../../screens/SignOptions';
import SignUpScreen from '../../screens/SignUp';
import LoginScreen from '../../screens/Login';
import PlayScreen from '../../screens/Play';
import LoadingScreen from '../../screens/Loading';
import AgainstBotScreen from '../../screens/Play/AgainstBot';
import { useCheckTokenQuery } from '../../stores/services/user';
import ResultScreen from '../../screens/Result';
import AgainstPlayer from '../../screens/Play/AgainstPlayer';
import QuestionMultipleChoiceScreen from '../../screens/Games/QuestionMultipleChoice';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true)
  const { token } = useAppSelector((state) => state.user)
  const { isFetching } = useCheckTokenQuery()

  useEffect(() => {
    if (!isFetching) {
      setIsLoading(false)
    }
  }, [isFetching])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? <Stack.Screen name="Loading" component={LoadingScreen} /> : token ?
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Play" component={PlayScreen} />
            <Stack.Screen name="AgainstBot" component={AgainstBotScreen} />
            <Stack.Screen name="AgainstPlayer" component={AgainstPlayer} />
            <Stack.Screen name="QuestionMultipleChoice" component={QuestionMultipleChoiceScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
          </> :
          <>
            <Stack.Screen name="SignOptions" component={SignOptionsScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
