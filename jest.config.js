module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo(nent)?|@expo(nent)?/.*|expo-splash-screen|react-native-reanimated|@react-native-async-storage/async-storage)"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/e2e/"
  ],
};