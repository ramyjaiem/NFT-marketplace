import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Drawer, Dropdown, Menu, Button as AntdButton } from 'antd';
import { useRouter } from 'next/router';
import { SettingOutlined } from '@ant-design/icons';
import WalletConnectHeader from './WalletConnectHeader';
import { Nav } from 'react-bootstrap'
import { useAuth } from '../utils/auth';
import { useWallet } from '../utils/wallet';
import LinkAddress from './LinkAddress';

interface LinkProp {
  forSideBar?: boolean;
}
const navItems = [
  {
    text: 'Home',
    link: 'https://ninjaprotocol.io/',
  },
  {
    text: 'Profile ',
    link: '/',
  },
  {
    text: 'Leaderboard',
    link: 'https://ninjaprotocol.io/leaderboard/',
  },
  {
    text: 'About Us',
    link: 'https://docs.ninjaprotocol.io/',
  },
  // {
  //   text: 'Packs',
  //   link: '/packs',
  // },
  // {
  //   text: 'News',
  //   link: '/news',
  // },
];
const Button = styled(AntdButton)`
	background: transparent;
	border: 0px;
	padding: 5px;
	color: #fff;
	&:hover {
		background: transparent;
		color: '#21073c'
    };
	}
	`;

const Container = styled.div`
	  display: flex;
	  background: #851cef;
	  border-radius: 6px;
	  min-height: 38px;
	  align-items: center;
	  padding: 0 5px;
	`;

export default function Header() {
  const { isAuthenticated } = useAuth();
  const { connected, wallet, connect, disconnect, select } = useWallet();
  const [mobilemenu, setMobilemenu] = useState(false)
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';


  const showmobilemenu = () => {
    setMobilemenu(!mobilemenu)
  };
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  const handleCloseSidebar = () => {
    setVisible(false);
  };

  const showSidebar = () => {
    setVisible(true);
  };



  const menu = (
    <Menu style={{ backgroundColor: '#1a2029' }} className="change_wallet-wrapper">
      {connected && <LinkAddress shorten={true} address={publicKey} />}
      <Menu.Item key="3" onClick={select} style={{ color: 'white', backgroundColor: 'tranparent' }}>
        Change Wallet
      </Menu.Item>
    </Menu>
  );

  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow mb-4 w-100" >
      <div className="container-fluid g-0 topnav">
        <div className="row no-gutters margin-nav-auto p-1">
          <div className="col-4" id="logo-div">
            <img src="/LOGO_SOL_NOBG.png" id="brand" alt="" className="d-inline-block align-text-top" width="40" height="40" />
          </div>
          <div className="col-6" style={{ marginTop: 5 }}>
            <a className="navbar-brand text-uppercase text-bold p-0 fw-bold" href="#">Ninja-DEX</a>
          </div>
        </div>
        <button className="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span onClick={showmobilemenu} className="navbar-toggler-icon py-3"></span>
        </button>
        <div className={mobilemenu ? "collapse navbar-collapse row show" : "collapse navbar-collapse row"} id="navbarNav">
          <div className="col-12 col-md-7">
            <ul className="navbar-nav mx-4">

              {navItems.map((navItem, index) => (
                <li key={index} className="nav-item  py-3 px-0">
                  <Link key={index} href={navItem?.link}>
                    <a target="_blank" href={navItem?.link} className={router.pathname === navItem?.link ? 'nav-link fs-6 text-bold font-18 text-white active' : 'nav-link fs-6 text-bold font-18 text-white'}>
                      {navItem?.text}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-12 col-md-5">
            <ul className="navbar-nav right-nav">
              <li> <span><a href="#"> <SettingOutlined style={{ fontSize: 26, color: '#ffff', marginRight: 30, marginTop: 8 }} /></a></span></li>
              <li className="nav-item">
                <Container>
                  <img src='/ion_wallet-outline.png' alt="wallet_icon" />
                  <Button onClick={connected ? disconnect : connect}>
                    <span
                      style={{ paddingLeft: '10px', paddingRight: '5', fontWeight: 'bold' }}
                    >
                      {connected ? 'Disconnect' : 'Connect'}
                    </span>
                  </Button>
                  <Dropdown overlay={menu} >
                    <Button>
                      <img src='/limit_arrow.svg' alt="" height="20px" width="15px" />
                    </Button>
                  </Dropdown>
                </Container>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Nav>
  );
}
