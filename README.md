# 📌 Movies21 - Mobile App

[![GitHub contributors](https://img.shields.io/github/contributors/Dwifakhri/movies21-app?style=for-the-badge&color=blue)](https://github.com/Dwifakhri/orbittechindo-mobile/graphs/contributors)

**Movies21-app** is a mobile application that displays a list of now-playing movies.

---

## 🚀 Introduction  
Movies21-app is a **mobile application** built using **React Native** and **Expo**. It fetches movie data from **TMDB API** and allows users to:  
✅ Browse now-playing movies  
✅ View detailed information about movies  
✅ Search for movies by keywords  
✅ Authenticate users  

---

## 🛠️ Tech Stack & Tools  
- **React Native**: For building the mobile UI  
- **Expo**: For easy mobile development and deployment  
- **Expo Router**: For handling navigation  
- **Formik**: For form validation  
- **TanStack Query**: For handling HTTP requests  
- **React Native Async Storage**: For storing user data securely  
- **Tailwind CSS**: For styling  

---

## ⚡ Quick Start  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/Dwifakhri/orbittechindo-mobile.git
cd orbittechindo-mobile
```

### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Install Expo CLI (if not installed)**  
```sh
npm install -g expo-cli
```

### **4️⃣ Start the Development Server**  
```sh
npx expo start
```
This will open Expo DevTools in your browser.  

### **5️⃣ Run the App on Your Device**  
- **On Android**:  
  - Install the **Expo Go** app from the Play Store  
  - Scan the QR code from Expo DevTools  

- **On iOS**:  
  - Use the **Expo Go** app (for development)  
  - Or run on an iOS simulator using Xcode  

---

## 🏗️ Building for Production  
To generate an APK or IPA file, use Expo’s build commands:  
```sh
eas build --platform android
```
or  
```sh
eas build --platform ios
```
Make sure you have [Expo Application Services (EAS)](https://expo.dev/eas) configured.  

---

Now your README includes **Expo support** for mobile development! 🚀
