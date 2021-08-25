import styled from 'styled-components';

import Footer from './Footer';
import Header from './Header';

const AppWrapper = styled.div`
  background: ${(props) => props.theme.colors.black};
`;

const PageWrap = styled(AppWrapper)`
  max-width: 100%;
  
`;
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AppWrapper>
      <PageWrap>
        <Header />
        {children}
        <Footer />
      </PageWrap>
    </AppWrapper>
  );
}
