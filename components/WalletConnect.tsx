import React from 'react';
import { useWallet } from '../utils/wallet';
import AppButton from './AppButton';
import { Button } from 'react-bootstrap'

export default function WalletConnect() {
  const { connected, connect, disconnect } = useWallet();

  const onConnect = () => {
    if (!connected) {
      connect();
    } else {
      disconnect();
    }
  };
  return (
    <AppButton width={100} onClick={onConnect}>
      {connected ? 'Disconnect' : 'Connect'}
    </AppButton>
  );
}
