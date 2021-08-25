import React, { useState, useContext, useEffect, useMemo } from 'react';
import { Keypair, Connection } from '@solana/web3.js';

const ENDPPOINT = 'https://solana-api.projectserum.com';
const ConnectionContext: React.Context<null | ConnectionContextValues> =
  React.createContext<null | ConnectionContextValues>(null);

interface ProviderProps {
  children: React.ReactNode;
}

export function ConnectionProvider({ children }: ProviderProps) {
  const [endpoint, setEndpoint] = useState(ENDPPOINT);

  const connection = useMemo(() => new Connection(endpoint, 'recent'), [endpoint]);
  const sendConnection = useMemo(() => new Connection(endpoint, 'recent'), [endpoint]);

  useEffect(() => {
    const id = connection.onAccountChange(new Keypair().publicKey, () => {});
    return () => {
      connection.removeAccountChangeListener(id);
    };
  }, [connection]);

  useEffect(() => {
    const id = connection.onSlotChange(() => null);
    return () => {
      connection.removeSlotChangeListener(id);
    };
  }, [connection]);

  useEffect(() => {
    const id = sendConnection.onAccountChange(new Keypair().publicKey, () => {});
    return () => {
      sendConnection.removeAccountChangeListener(id);
    };
  }, [sendConnection]);

  useEffect(() => {
    const id = sendConnection.onSlotChange(() => null);
    return () => {
      sendConnection.removeSlotChangeListener(id);
    };
  }, [sendConnection]);

  return (
    <ConnectionContext.Provider
      value={{
        endpoint,
        setEndpoint,
        connection,
        sendConnection,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  return context.connection;
}

export function useSendConnection() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  return context.sendConnection;
}

export function useConnectionConfig() {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('Missing connection context');
  }
  return {
    endpoint: context.endpoint,
    setEndpoint: context.setEndpoint,
  };
}
