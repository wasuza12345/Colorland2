// IdUserContext.js
import React, { createContext, useState, useContext } from 'react';

// สร้าง Context
const IdUserContext = createContext();

// Component ที่ให้ Context
export const IdUserProvider = ({ children }) => {
  const [idUser, setIdUser] = useState('');

  const updateIdUser = (newIdUser) => {
    setIdUser(newIdUser);
  };

  return (
    <IdUserContext.Provider value={{ idUser, updateIdUser }}>
      {children}
    </IdUserContext.Provider>
  );
};

// Hook สำหรับใช้งาน idUser ใน components อื่น
export const useIdUser = () => {
  const context = useContext(IdUserContext);
  if (!context) {
    throw new Error('useIdUser must be used within an IdUserProvider');
  }
  return context;
};
