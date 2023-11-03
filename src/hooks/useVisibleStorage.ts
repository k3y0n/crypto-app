import { useState, useEffect } from "react";

export const useVisibleStorage = (key: string, initialValue: boolean): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) {
        setStoredValue(JSON.parse(e.newValue || "null"));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setStoredValue];
};
