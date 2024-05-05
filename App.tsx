import Navigation from './src/providers/Navigation';
import Redux from './src/providers/Redux';
import Theme from './src/providers/Theme';

export default function App() {
  return (
    <Redux>
      <Theme>
        <Navigation />
      </Theme>
    </Redux>
  );
}
