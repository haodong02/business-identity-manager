import { NativeModules } from 'react-native';

const { BusinessDataModule } = NativeModules;

export default BusinessDataModule as {
  saveBusinesses(json: string): void;
  clearBusinesses(): void;
  openAutofillSettings(): void;
};
