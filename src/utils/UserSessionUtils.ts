import { StorageParams } from '../constants/StorageParams';
import { User, Country, Language, FullSession, UserSettings } from './user-session-types';

export class UserSessionUtils {
  // Authentication tokens
  static getBearerToken(): string | null {
    return localStorage.getItem(StorageParams.ACCESS_TOKEN);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(StorageParams.REFRESH_TOKEN);
  }

  static setUserAuthToken(token: string | null): void {
    if (token) {
      localStorage.setItem(StorageParams.ACCESS_TOKEN, token);
    } else {
      localStorage.removeItem(StorageParams.ACCESS_TOKEN);
    }
  }

  static setUserRefreshToken(token: string | null): void {
    if (token) {
      localStorage.setItem(StorageParams.REFRESH_TOKEN, token);
    } else {
      localStorage.removeItem(StorageParams.REFRESH_TOKEN);
    }
  }

  // User details
  static setUserDetails(details: User): void {
    localStorage.setItem("user", JSON.stringify(details));
  }

  static getUserDetails(): User | null {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  // Permissions and roles
  static setUserPermissions(permissions: string[]): void {
    localStorage.setItem(
      StorageParams.PERMISSIONS,
      JSON.stringify(permissions)
    );
  }

  static getPermissions(): string[] {
    try {
      const value = localStorage.getItem(StorageParams.PERMISSIONS);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Permissions parse error:', error);
      return [];
    }
  }

  static setSuperAdmin(isSuperAdmin: boolean): void {
    localStorage.setItem(
      StorageParams.IS_SUPER_ADMIN,
      JSON.stringify(isSuperAdmin)
    );
  }

  static getSuperAdmin(): boolean {
    try {
      const value = localStorage.getItem(StorageParams.IS_SUPER_ADMIN);
      return value ? JSON.parse(value) : false;
    } catch (error) {
      console.error('Super admin status parse error:', error);
      return false;
    }
  }

  // Session management
  static clearLocalStorageAndLogout(): void {
    localStorage.clear();
  }

  static isLoggedIn(): boolean {
    return localStorage.getItem(StorageParams.IS_LOGGED_IN) === 'true';
  }

  static setLoggedIn(loggedIn: boolean): void {
    localStorage.setItem(
      StorageParams.IS_LOGGED_IN,
      loggedIn.toString()
    );
  }

  // Device management
  static getDeviceId(): string | null {
    return localStorage.getItem(StorageParams.EXPO_DEVICE_ID);
  }

  static setDeviceId(deviceId: string): void {
    localStorage.setItem(StorageParams.EXPO_DEVICE_ID, deviceId);
  }

  // Localization
  static setUserCountry(country: Country): void {
    localStorage.setItem(
      StorageParams.COUNTRY,
      JSON.stringify(country)
    );
  }

  static getUserCountry(): Country | null {
    try {
      const value = localStorage.getItem(StorageParams.COUNTRY);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Country parse error:', error);
      return null;
    }
  }

  static setUserLanguage(language: Language): void {
    localStorage.setItem(
      StorageParams.LANGUAGE,
      JSON.stringify(language)
    );
  }

  static getUserLanguage(): Language | null {
    try {
      const value = localStorage.getItem(StorageParams.LANGUAGE);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Language parse error:', error);
      return null;
    }
  }

  // Session tracking
  static setLoginTime(time: Date): void {
    localStorage.setItem(
      StorageParams.LOGIN_TIME,
      time.toISOString()
    );
  }

  static getLoginTime(): Date | null {
    const time = localStorage.getItem(StorageParams.LOGIN_TIME);
    return time ? new Date(time) : null;
  }

  // Full session management
  static setFullSessionObject<T extends FullSession>(session: T): void {
    localStorage.setItem(
      StorageParams.FULL_LOGIN_DETAILS_JSON,
      JSON.stringify(session)
    );
  }

  static getFullSessionObject<T extends FullSession>(): T | null {
    try {
      const value = localStorage.getItem(StorageParams.FULL_LOGIN_DETAILS_JSON);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Full session parse error:', error);
      return null;
    }
  }

  // User settings
  static setUserSettings(settings: UserSettings): void {
    localStorage.setItem(
      StorageParams.USER_SETTINGS,
      JSON.stringify(settings)
    );
  }

  static getUserSettings<T extends UserSettings>(): T | null {
    try {
      const value = localStorage.getItem(StorageParams.USER_SETTINGS);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('User settings parse error:', error);
      return null;
    }
  }

  // Authentication status
  static isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  // Logout
  static logout(): void {
    this.clearLocalStorageAndLogout();
  }
}