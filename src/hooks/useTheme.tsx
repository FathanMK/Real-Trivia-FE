import {setTheme} from '../stores/slices/theme';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

export default function useTheme() {
  const {theme} = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const isLight = theme === 'light';

  function handleTheme() {
    if (isLight) {
      dispatch(setTheme('dark'));
    } else {
      dispatch(setTheme('light'));
    }
  }

  return {theme, handleTheme, isLight};
}
