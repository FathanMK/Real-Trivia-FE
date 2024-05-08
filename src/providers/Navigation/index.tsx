import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignOptionsPage from '../../screens/SignOptions';
import SignUpPage from '../../screens/SignUp';
import LoginPage from '../../screens/Login';
import HomePage from '../../screens/Home';
import useAppSelector from '../../hooks/useAppSelector';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { token } = useAppSelector((state) => state.user)
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ?
          <Stack.Screen name="Home" component={HomePage} /> :
          <>
            <Stack.Screen name="SignOptions" component={SignOptionsPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
            <Stack.Screen
              name="Login"
              component={LoginPage}
            />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
