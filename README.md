# Welcome to the Experient app 👋

# Experient RN Test Project

## Assumptions/design choices

Several assumptions were made for this app. Given that it was just a take home assignment without a real stakeholder, and also given the assumptions were relatively minor/low stakes assumptions, I made some assumptions rather than bother people who had more consequential work to do with their time.

1. Time/features: Given the note from my recruiter that it should take 2-4 hours, I assumed this assignment was meant to show what I can do in a limited time rather than build out a lot of features that fit within the criteria. I'll mention some additional work that I would have tackled had I used more time.

2. RTK: Assumed that the userbase would eventually be fairly large, given that there is at least login/auth functionality. Therefore Redux Toolkit was used over React Context with useReducer since RTK suits a larger application better than React Context.

3. Navigation:The project boilerplate was built from Expo, and the assignment pdf mentions file based routing (which Expo Router uses). But the assignment also mentions using React Navigation. There was some confusion as to whether the app should be built purely on React Navigation or if it should be using Expo Router instead, but given that there were 2 pieces of data pointing towards Expo Router versus one for React Navigation, and given the fact that Expo Router is built on top of React Navigation, I decided to use Expo Router.

4. Project Structure: I tried to structure out the project as I would for a project that would scale larger and eventually be in production, even though this was a small project.

5. Platform Support: I assumed this app is supposed to work on iOS and Android. Given the time constraint, I tested on some of the more recent/popular mobile devices and tried to get a range: iPhone 16 Pro, iPhone 15, Pixel 4a, Pixel 6, Pixel 7 Pro.

## Features

Beyond the core features of authentication flow, there were some other features added:

1. Logout button on the home screen- mostly came about out of a need to clear tokens while testing auth flow. Logging out clears tokens and returns the user to the login screen

2. Tapping login causes loading icon to come up and login button disappears/becomes inaccessible

3. Password is masked

4. If an invalid username/password is given (in this case, if one of the fields is blank), there is a small "login failed" message that shows

## Future work

Given more time, there were other things that I would have liked to implement:

1. More robust error handling: more descriptive errors for the user

2. Form validation for the input fields- character limits, allowed characters, etc., including outlining the invalid textInput in red and displaying a message

3. Unit testing with Jest

4. Testing on tablets- prioritized phones since that seemed like more of the target audience

5. Testing on actual physical devices

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Start Contributing

Please checkout the Contrbiuting Section for more information
