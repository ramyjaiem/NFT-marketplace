interface ConnectionContextValues {
  endpoint: string;
  setEndpoint: (newEndpoint: string) => void;
  connection: Connection;
  sendConnection: Connection;
}

interface WalletContextValues {
  wallet: WalletAdapter | undefined;
  connected: boolean;
  providerUrl: string;
  setProviderUrl: (newProviderUrl: string) => void;
  providerName: string;
  select: () => void;
}

interface AuthContextValues {
  isAuthenticated: boolean;
  userWalletId: string | null;
  userData: any;
  authLoading: boolean;
  onConnectClick: () => void;
  setUserData: any;
}