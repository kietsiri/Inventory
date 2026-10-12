import { useState } from 'react';
import { Alert } from 'react-native';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === '1234') {
      setIsLoggedIn(true);
      return true;
    }
    Alert.alert('เข้าสู่ระบบไม่สำเร็จ', 'Username หรือ Password ไม่ถูกต้อง');
    return false;
  };

  const logout = () => setIsLoggedIn(false);

  return { isLoggedIn, login, logout };
}