import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAppSelector from '../../hooks/useAppSelector';
import HomeScreen from '../../screens/Home';
import SignOptionsScreen from '../../screens/SignOptions';
import SignUpScreen from '../../screens/SignUp';
import LoginScreen from '../../screens/Login';
import PlayScreen from '../../screens/Play';
import LoadingScreen from '../../screens/Loading';
import AgainstBotScreen from '../../screens/Play/AgainstBot';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { token, isLoading } = useAppSelector((state) => state.user)
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? <Stack.Screen name="Loading" component={LoadingScreen} /> : token ?
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Play" component={PlayScreen} />
            <Stack.Screen name="AgainstBot" component={AgainstBotScreen} />
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
