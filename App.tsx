import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as theme } from './styles/theme.json';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { FirebaseContextProvider } from './context/provider/FirebaseProvider';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <SafeAreaProvider>
          <FirebaseContextProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </FirebaseContextProvider>
        </SafeAreaProvider>
      </ApplicationProvider>
    );
  }
}
