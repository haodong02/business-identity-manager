# Business Identity Manager

A React Native (Expo) application to help Malaysian businesses manage their identity profiles and autofill them into E-invoicing and other forms on Android.

## Features

*   **Manage Profiles:** Store multiple business profiles (Name, BRN, TIN, SST, Address, etc.).
*   **Local Storage:** Data is encrypted and stored locally on your device.
*   **Android Autofill Service:** Integrates natively with the Android OS to autofill forms in browsers and other apps.
*   **Assisted Fill:** Floating overlay for apps that don't support standard autofill.

## Development Setup

This project uses **Expo Prebuild** (CNG) to support the custom Android Native Autofill service. You cannot use the standard "Expo Go" app to test the native autofill features.

### Prerequisites

*   Node.js (LTS)
*   Java Development Kit (JDK 17)
*   Android Studio & Android SDK
*   An Android Device or Emulator

### getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/haodong02/business-identity-manager.git
    cd business-identity-manager
    git checkout Pre-Merge
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Build and Run on Android:**
    Since this project has custom native code, you must build the development client:

    ```bash
    npx expo run:android
    ```
    *This command will compile the Kotlin code and install the app on your connected device/emulator.*

4.  **Start the Metro Bundler:**
    The previous command usually starts this automatically, but if not:
    ```bash
    npx expo start --dev-client
    ```

### Testing Autofill

1.  Open the app and add a Business Profile.
2.  Go to **Settings**.
3.  Tap **Enable System Autofill**.
4.  In the Android System Settings that open, select **Business Identity Manager** as your autofill service.
5.  Open Chrome or another app with a form.
6.  Tap a field (e.g., "Name" or "Address"). You should see the autofill suggestion.

## Project Structure

*   `app/`: Expo Router screens.
*   `components/`: Reusable UI components.
*   `services/`: Logic for storage and data management.
*   `modules/`: Interface for Native Modules.
*   `android/`: **(Generated)** Native Android project containing the Kotlin Autofill Service.
    *   `src/main/java/com/pcsm/businessidentitymanager/BusinessAutofillService.kt`: The core autofill logic.
    *   `src/main/java/com/pcsm/businessidentitymanager/BusinessDataModule.kt`: Bridge to save data from JS to Native.