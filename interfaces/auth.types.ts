export interface AuthState {
  isLoggedIn: boolean;
  setLoggedIn: (val: boolean) => void;
  checkLoginStatus: () => Promise<void>;
  logout: () => Promise<void>;
}
