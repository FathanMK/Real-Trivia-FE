import {render, screen} from '@testing-library/react-native';

import MainButton from '../src/components/Buttons/Main';

test('renders button correctly', () => {
  render(<MainButton />);
  expect(screen.getByRole('button')).toBeOnTheScreen();
});
