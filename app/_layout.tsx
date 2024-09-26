import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, Text, ScrollView, ViewStyle } from 'react-native';
// import Video from 'react-native-video';
import { useVideoPlayer, VideoView } from 'expo-video';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Video = ({
  source,
  style,
  paused,
  resizeMode,
}: {
  source: { uri: string };
  style: ViewStyle;
  paused: boolean;
  repeat: boolean;
  resizeMode: 'contain' | 'cover' | 'fill';
}) => {
  const player = useVideoPlayer(source, (player) => {
    player.play();
  });
  return <VideoView player={player} style={style} contentFit={resizeMode} nativeControls={false} />;
};

const verticalOne = (
  <View style={{ width: 200, height: 200, borderWidth: 2, borderColor: 'red', overflow: 'hidden' }}>
    <Video
      source={{ uri: 'https://videos.pexels.com/video-files/4678261/4678261-hd_1080_1920_25fps.mp4' }}
      style={{ width: '100%', height: '100%' }}
      paused={false}
      resizeMode="cover"
      repeat
    />
  </View>
);

const verticalTwo = (
  <View style={{ width: 200, height: 200, borderWidth: 2, borderColor: 'blue', overflow: 'hidden' }}>
    <Video
      source={{ uri: 'https://videos.pexels.com/video-files/4434242/4434242-uhd_1440_2560_24fps.mp4' }}
      style={{ width: '100%', height: '100%' }}
      paused={false}
      resizeMode="cover"
      repeat
    />
  </View>
);

const landscapeOne = (
  <View style={{ width: 200, height: 200, borderWidth: 2, borderColor: 'red', overflow: 'hidden' }}>
    <Video
      source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }}
      style={{ width: '100%', height: '100%' }}
      paused={false}
      resizeMode="cover"
      repeat
    />
  </View>
);

const landscapeTwo = (
  <View style={{ width: 200, height: 200, borderWidth: 2, borderColor: 'blue', overflow: 'hidden' }}>
    <Video
      source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }}
      style={{ width: '100%', height: '100%' }}
      paused={false}
      resizeMode="cover"
      repeat
    />
  </View>
);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack> */}
      <ScrollView>
        <Text style={{ marginTop: 50 }}>vertical stacked vertical resizeMode="cover" videos (BUG)</Text>
        <View>
          {verticalOne}
          {verticalTwo}
        </View>
        <Text style={{ marginTop: 50 }}>horizontal stacked horizontal resizeMode="cover" videos (BUG)</Text>
        <View style={{ flexDirection: 'row' }}>
          {landscapeOne}
          {landscapeTwo}
        </View>
        {/* <Text style={{ marginTop: 50 }}>horizontal stacked vertical resizeMode="cover" videos</Text>
        <View style={{ flexDirection: 'row' }}>
          {verticalOne}
          {verticalTwo}
        </View>
        <Text style={{ marginTop: 50 }}>vertical stacked horizontal resizeMode="cover" videos</Text>
        <View>
          {landscapeOne}
          {landscapeTwo}
        </View> */}
      </ScrollView>
    </ThemeProvider>
  );
}
