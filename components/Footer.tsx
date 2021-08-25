import styled from 'styled-components';
import { useWallet } from '../utils/wallet';
const FooterWrapper = styled.div`
  margin-top: 60px;
  color: ${(props) => props.theme.colors.white};
  font-size: 18px;
`;

const UpperFooter = styled.div`
  border-top: 0.5px solid #898989;
  border-bottom: 0.5px solid #898989;
  padding: 30px 5% 10px;
  display: flex;
  flex-wrap: wrap;

  div:nth-child(1) {
    @media (max-width: 978px) {
      width: 100%;
      margin-bottom: 20px;
    }
  }

  div:nth-child(2) {
    margin-left: 7%;
    @media (max-width: 978px) {
      margin-left: 0;
    }
    @media (max-width: 407px) {
      width: 100%;
      margin-top: 20px;
    }
  }

  div:nth-child(3) {
    margin-left: 18%;
    @media (max-width: 407px) {
      margin-left: 0;
    }
  }

  .footer-title {
    font-weight: bold;
    font-size: 20px;
  }

  .footer-column {
    display: flex;
    flex-direction: column;
    @media (max-width: 407px) {
      margin-top: 20px;
    }

    a {
      margin-top: 5px;
      font-size: 16px;
    }
  }
`;

const LowerFooter = styled.div`
  padding: 20px 5% 3%;
  display: grid;
  background: #1f2331;

  @media (max-width: 700px) {
    padding-left: 10% !important;
    flex-direction: column-reverse;
    align-items: center;
  }
  div:nth-child(1) {
    @media (max-width: 700px) {
      font-size: 14px;
    }
  }

  div:nth-child(2) {
    margin-left: auto;
    float: right;
    @media (max-width: 700px) {
      margin-left: 0;
      margin-bottom: 20px;
    }
  }

  .social-links {
    display: block;
    justify-content: space-between;

    a {
      margin-right: 32px;
    }
    @media (max-width: 700px) {
      a {
        margin-right: 20px;
      }
  }
`;

export default function Footer() {
  const { connected, connect, disconnect } = useWallet();
  return (
    <div className={connected ? 'c-footer py-3' : "u-footer py-3"} style={{ backgroundColor: '#1f2332', marginTop: 27 }}>
      < div className="container-fluid g-0" style={{ padding: '0 5%' }} >
        <div className="row g-0">
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-md-start footer-text">
              <span className="text-white " >&copy; Ninja Protocol All Rights Reserved. 2021</span>
            </div>

          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex justify-content-md-end footer-icons">
              <ul className="nav navbar-nav list-inline" style={{ display: 'inline' }}>
                <li className="list-inline-item mx-2"><a className="text-white" href="#"><img src="/socialLinkIcons/discord.svg" alt="" /></a></li>
                <li className="list-inline-item mx-2"><a className="text-white" href="#"><img src="/socialLinkIcons/twtr.svg" alt="" /></a></li>
                <li className="list-inline-item mx-2"><a className="text-white" href="#"><img src="/socialLinkIcons/twitch.svg" alt="" /></a></li>
                <li className="list-inline-item mx-2"><a className="text-white" href="#"><img src="/socialLinkIcons/tiktok.svg" alt="" /></a></li>
                <li className="list-inline-item mx-2"><a className="text-white" href="#"><img src="/socialLinkIcons/insta.svg" alt="" /></a></li>
                <li className="list-inline-item mx-2"><a className="text-white" href="#"><img src="/socialLinkIcons/youtube.svg" alt="" /></a></li>
              </ul>

            </div>
          </div>
        </div>
      </div >
    </div >

  );
}
