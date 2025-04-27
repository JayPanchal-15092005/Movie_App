import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

const TrailerScreen = () => {
  const { videoKey } = useLocalSearchParams();

  return (
    <View className="flex-1 bg-black">
        <WebView
        source={{ uri: `https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=1` }}
        style={{ flex: 1 }}
        allowsFullscreenVideo={true}
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default TrailerScreen;
