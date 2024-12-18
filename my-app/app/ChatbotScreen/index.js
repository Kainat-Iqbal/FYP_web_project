import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const ChatbotScreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri:
            "https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/11/07/13/20241107134723-5N4EZCVL.json",
        }} // Simple URL for testing
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ChatbotScreen;


// import React from 'react';
// import { SafeAreaView, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <WebView
//         source={{
//           uri: 'https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/11/07/13/20241107134723-5N4EZCVL.json'
//         }}
//         injectedJavaScript={`
//           const style = document.createElement('style');
//           style.innerHTML = \`
//             body {
//               background-color: #FFFF00 !important;
//             }
//             .bp-chat-button {
//               background-color: #FFFF00 !important;
//             }
//             .bp-webchat-header {
//               background-color: #FFFF00 !important;
//             }
//           \`;
//           document.head.appendChild(style);
//         `}
//         style={{ flex: 1 }}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
