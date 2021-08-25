import React from 'react';

import styled from 'styled-components';
import { useWallet } from '../utils/wallet';
import AppButton from './AppButton';
import { Button } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
const Menuiconheader = styled.div`
  background: #851cef;
  mix-blend-mode: normal;
  border-radius: 6px;
  cursor: pointer;
  color: #ffff;
  padding: 8px;
  margin: 8px;
  font-size: 16px;
  .icon-left {
    background: url(/ion_wallet-outline.png) no-repeat;
    float: left;
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .icon-right {
    background: url(/limit_arrow.svg) no-repeat;
    float: right;
    width: 20px;
    height: 20px;
    margin: 9px 10px 0px 10px;
  }
  @media only screen and (max-device-width: 480px) {
    .icon-right {
      margin: 8px 5px 0px 5px;
    }
  }
`;
export default function WalletConnectHeader() {
  const { connected, connect, disconnect } = useWallet();

  const onConnect = () => {
    if (!connected) {
      connect();
    } else {
      disconnect();
    }
  };
  return (
    // <AppButton width={100} onClick={onConnect}>
    //   {connected ? 'Disconnect' : 'Connect'}
    // </AppButton>
    <Menuiconheader>
      {/* <Button type="primary" icon={<WalletOutlined />} size={'md'}>
        Download
      </Button> */}
      <div onClick={onConnect}>
        <span className="icon-left"></span>

        {connected ? 'Disconnect' : 'Connect'}
        <span className="icon-right"></span>
      </div>
    </Menuiconheader>
  );
}
