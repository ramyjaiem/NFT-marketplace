import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global';
import { lightTheme, darkTheme } from '../styles/theme';
import type { AppProps } from 'next/app';
import { ConnectionProvider } from "../utils/connection";
import { WalletProvider } from "../utils/wallet";
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from "../utils/auth";
import { useApollo } from '../lib/apolloClient';
import 'antd/dist/antd.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "bootstrap/dist/css/bootstrap.css";


const LIGHT_THEME = 'light';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  const theme = LIGHT_THEME;
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme === LIGHT_THEME ? lightTheme : darkTheme}>
        <ApolloProvider client={apolloClient}>
          <ConnectionProvider>
            <WalletProvider>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </WalletProvider>
          </ConnectionProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}
export default MyApp;
