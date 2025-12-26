import AsyncStorage from '@react-native-async-storage/async-storage';
import { Business } from '../types/Business';
import BusinessDataModule from '../modules/BusinessDataModule';

const STORAGE_KEY = '@business_identity_manager_businesses';

export const StorageService = {
  /**
   * Get all businesses
   */
  getBusinesses: async (): Promise<Business[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error reading businesses from storage', e);
      return [];
    }
  },

  /**
   * Get a single business by ID
   */
  getBusinessById: async (id: string): Promise<Business | undefined> => {
    const businesses = await StorageService.getBusinesses();
    return businesses.find((b) => b.id === id);
  },

  /**
   * Add a new business
   */
  addBusiness: async (business: Business): Promise<void> => {
    const businesses = await StorageService.getBusinesses();
    
    // If this is the first business, make it primary by default
    if (businesses.length === 0) {
      business.isPrimary = true;
    } else if (business.isPrimary) {
      // If adding a new primary business, demote others
      businesses.forEach(b => b.isPrimary = false);
    }

    const newBusinesses = [...businesses, business];
    await StorageService.saveBusinesses(newBusinesses);
  },

  /**
   * Update an existing business
   */
  updateBusiness: async (updatedBusiness: Business): Promise<void> => {
    let businesses = await StorageService.getBusinesses();
    
    if (updatedBusiness.isPrimary) {
       businesses.forEach(b => {
           if (b.id !== updatedBusiness.id) b.isPrimary = false;
       });
    }

    const index = businesses.findIndex((b) => b.id === updatedBusiness.id);
    if (index !== -1) {
      businesses[index] = updatedBusiness;
      await StorageService.saveBusinesses(businesses);
    }
  },

  /**
   * Delete a business
   */
  deleteBusiness: async (id: string): Promise<void> => {
    const businesses = await StorageService.getBusinesses();
    const filteredBusinesses = businesses.filter((b) => b.id !== id);
    
    // If we deleted the primary business, make the first remaining one primary
    const wasPrimary = businesses.find(b => b.id === id)?.isPrimary;
    if (wasPrimary && filteredBusinesses.length > 0) {
        filteredBusinesses[0].isPrimary = true;
    }

    await StorageService.saveBusinesses(filteredBusinesses);
  },

  /**
   * Internal helper to save array
   */
  saveBusinesses: async (businesses: Business[]): Promise<void> => {
    try {
      const jsonString = JSON.stringify(businesses);
      await AsyncStorage.setItem(STORAGE_KEY, jsonString);
      
      // Sync to Native Module for Autofill Service
      if (BusinessDataModule) {
          try {
            BusinessDataModule.saveBusinesses(jsonString);
          } catch (nativeError) {
              console.warn("Failed to sync with native autofill service", nativeError);
          }
      }
    } catch (e) {
      console.error('Error saving businesses to storage', e);
    }
  },

  /**
   * Clear all data (useful for dev/reset)
   */
  clearAll: async (): Promise<void> => {
      try {
          await AsyncStorage.removeItem(STORAGE_KEY);
          if (BusinessDataModule) {
              BusinessDataModule.clearBusinesses();
          }
      } catch(e) {
          console.error('Error clearing storage', e);
      }
  }
};
