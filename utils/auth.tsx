import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { QUERY_USER } from '../dgraph/queries/user';
import { useApolloClient } from '@apollo/client';
import { useWallet } from './wallet';
import { getToken } from './discord/getToken';
import { resetLocalStorage } from './authHelpers';

import { DISCORD_API_URL, WALLET_LOCAL_KEY } from '../constants';

const AuthContext: React.Context<null | AuthContextValues> = React.createContext<null | AuthContextValues>(null);

interface ProviderProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    solana: any;
  }
}
export function AuthProvider({ children }: ProviderProps) {
  const [initalLoading, setInitalLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>({});
  const [userWalletId, setUserWalletId] = useState<string | null>(null);
  const [dataFetchLoading, setDataFetchLoading] = useState<boolean>(false);

  const client = useApolloClient();
  const { connect, connected, wallet, disconnect } = useWallet();

  const router = useRouter();

  const getUserData = async (walletId: string) => {
    const { data } = await client.query({
      query: QUERY_USER,
      variables: { filter: { walletId: { eq: walletId } } },
    });
    return data;
  };

  const onConnectClick = () => {
    if (!isAuthenticated) {
      connect();
    } else {
      disconnect();
      resetLocalStorage();
      setUserWalletId(null);
      setIsAuthenticated(false);
    }
  };

  // useEffect will be triggerd when page loads for the first time
  useEffect(() => {
    const fetchUserState = async (walletId: string) => {
      const data = await getUserData(walletId);
      setUserData(data.queryUser[0]);
      setInitalLoading(false);
    };

    const walletId = localStorage.getItem(WALLET_LOCAL_KEY);
    if (walletId) {
      fetchUserState(walletId);
      setUserWalletId(walletId);
      setIsAuthenticated(true);
    } else {
      setInitalLoading(false);
    }
  }, []);

  // useEffect will be triggered after user wallet is connected
  useEffect(() => {
    const saveLocalStorage = () => {
      localStorage.setItem(WALLET_LOCAL_KEY, wallet.publicKey.toBase58());
    };

    const fetchUserData = async () => {
      setDataFetchLoading(true);
      const data = await getUserData(wallet.publicKey.toBase58());
      if (data?.queryUser[0]) {
        setUserData(data.queryUser[0]);
        saveLocalStorage();
      }
      setUserWalletId(wallet.publicKey.toBase58());
      setIsAuthenticated(true);
      setDataFetchLoading(false);
    };
    if (connected) {
      if (wallet.publicKey != null) {
        fetchUserData();
      }
    }
  }, [connected]);

  // useEffect will be triggered after redirect from discord auth
  useEffect(() => {
    const addUserDiscordData = async (token: string) => {
      try {
        const checkUser = await getUserData(userWalletId);
        if (checkUser?.queryUser.length === 0) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const result = await axios.get(`${DISCORD_API_URL}/users/@me`, config);
          const discordData = result?.data;
          const memberRoles = await axios.get(`/api/getGuildMemberRoles/${discordData?.id}`);
          const userData = {
            walletId: userWalletId,
            discordId: discordData?.id,
            ninjaHolding: 0,
            email: discordData?.email,
            username: discordData?.username,
            roles: memberRoles?.data?.data,
            signDate: new Date().toISOString(),
          };

          const data = JSON.stringify(userData);
          const encodedData = new TextEncoder().encode(data);
          const { publicKey } = wallet;
          const { signature } = await window.solana.signMessage(encodedData, 'hex');
          const addConfig = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
          await axios.post(
            '/api/addUserData',
            JSON.stringify({ signature, publicKey: publicKey.toString(), encodedData }),
            addConfig,
          );
          setUserData(userData);
        }
      } catch (err) {
        alert('error');
        setDataFetchLoading(false);
      }
    };

    const onCodeAccess = async (code: string) => {
      const tokenResult = await getToken(code);
      if (tokenResult?.accessToken) {
        addUserDiscordData(tokenResult?.accessToken);
      } else {
        setDataFetchLoading(false);
      }
    };

    if (!wallet && router?.query?.code) {
      connect();
    } else if (router?.query?.code && userWalletId && connected) {
      setDataFetchLoading(true);
      const { code }: any = router.query;
      onCodeAccess(code);
    }
  }, [router.query, userWalletId, wallet, connected]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        onConnectClick,
        userWalletId,
        userData,
        setUserData,
        authLoading: initalLoading || dataFetchLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Missing auth context');
  }
  return context;
}
