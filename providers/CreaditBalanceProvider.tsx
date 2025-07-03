"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface CreaditBalanceContextType {
  balance: number | null;
  loading: boolean;
  error: string | null;
  refreshBalanceInBackground: () => void;
  updateBalance: (updatedBalance: number) => void;
}

export const CreaditBalanceContext = createContext<CreaditBalanceContextType>({
  balance: null,
  loading: true,
  error: null,
  refreshBalanceInBackground: () => {},
  updateBalance: () => {},
});

const fetchBalance = async () => {
  const response = await fetch("/api/user/creadits-balance");
  const data = await response.json();
  return data;
};
const CreaditBalanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!showLoading) setShowLoading(true);
      try {
        const response = await fetchBalance();
        if (response.success) {
          setBalance(response.data.balance);
          if (error) setError(null);
        } else {
          setError(response.message);
        }
      } catch {
        setError("Something went wrong");
      } finally {
        setShowLoading(false);
      }
    };
    fetchData();
  }, []);

  const refreshBalanceInBackground = () => {
    fetchBalance().then((response) => {
      if (response?.data?.success) {
        if (response?.data?.balance && response.data.balance !== balance)
          setBalance(response.data.balance);
      }
    });
  };

  const loading = showLoading || (!balance && balance !== 0);
  const updateBalance = (updatedBalance: number) => {
    if (updatedBalance != balance) setBalance(updatedBalance);
  };

  return (
    <CreaditBalanceContext.Provider
      value={{
        balance,
        loading,
        error,
        refreshBalanceInBackground,
        updateBalance,
      }}
    >
      {children}
    </CreaditBalanceContext.Provider>
  );
};
export default CreaditBalanceProvider;
export const useCreaditBalance = () => useContext(CreaditBalanceContext);
