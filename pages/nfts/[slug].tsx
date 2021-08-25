import { Row, Col, Grid } from 'antd';
import styled from 'styled-components';
import { Pill } from '../../components/Profile/ProfileCard';
import { ClearButton } from '../leaderboard';
import AppButton from '../../components/AppButton';
import Image from 'next/image';
import Layout from '../../components/Layout';

const { useBreakpoint } = Grid;

const PageWrapper = styled.div`
  min-height: 100vh;
  margin: 45px 5%;
`;

const NFTImage = styled.img``;

const NFTInfo = styled.div`
  .nft-name {
    font-size: ${(props) => props.theme.fontSizes[7]};
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 18px;
    font-weight: bold;
  }

  .price-and-quantity {
    font-weight: bold;
    margin-bottom: 22px;
    font-size: ${(props) => props.theme.fontSizes[4]};
    color: ${(props) => props.theme.colors.white};

    span {
      color: ${(props) => props.theme.colors.grey};
      font-size: 20px;
      margin-left: 12px;
      margin-bottom: 22px;
    }
  }

  .nft-description {
    padding-bottom: 20px;
    border-bottom: ${(props) => `2px solid ${props.theme.colors.grey}`};
    margin-bottom: 35px;
    color: ${(props) => props.theme.colors.white};
    .title {
      font-weight: bold;
      margin-bottom: 16px;
      font-size: ${(props) => props.theme.fontSizes[3]};
    }
    .content {
      font-size: ${(props) => props.theme.fontSizes[2]};
      margin-bottom: 12px;
    }
  }

  .bid-and-price {
    margin-top: 35px;
    color: ${(props) => props.theme.colors.white};

    .title {
      font-size: 22px;
    }

    .price {
      color: ${(props) => props.theme.colors.blue};
      font-weight: bold;
      font-size: ${(props) => props.theme.fontSizes[8]};
      margin-bottom: 30px;
    }
    .countdown {
      margin: 0 4% 25px 4%;
      display: flex;
      justify-content: space-between;

      .time {
        font-size: 18px;
      }

      .duration {
        color: ${(props) => props.theme.colors.blue};
        font-size: ${(props) => props.theme.fontSizes[5]};
        text-align: center;
      }
    }
  }
`;

const NFTPills = styled(Pill)`
  width: fit-content;
`;

const ReadMore = styled(ClearButton)`
  color: ${(props) => props.theme.colors.blue};
  font-size: 18px;
`;

export default function NFTDetails() {
  const screen = useBreakpoint();

  return (
    <Layout>
      <PageWrapper>
        <Row gutter={[12, 16]}>
          <Col xs={24} md={24} lg={11}>
            <Image layout="fill" src="/largeNFT.png" alt="nft-image" />
          </Col>
          <Col xs={24} md={24} lg={12} offset={screen.md ? 1 : 0}>
            <NFTInfo>
              <div className="nft-name">NFT Name Example</div>
              <div className="price-and-quantity">
                1200 NINJA<span>/ 1 of 10</span>
              </div>
              <NFTPills>Art</NFTPills>
              <div className="nft-description">
                <div className="title">Description</div>
                <div className="content">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam Duis aute irure dolor in reprehenderit in voluptate velit
                  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                </div>
                <ReadMore>Read more</ReadMore>
              </div>
              <div className="bid-and-price">
                <Row>
                  <Col span={11}>
                    <div className="title">Highest Bid</div>
                    <div className="price">800 NINJA</div>
                    <AppButton size="large" primary heavyText>
                      Buy
                    </AppButton>
                  </Col>
                  <Col span={11} offset={2}>
                    <div className="title">Auction ending in</div>
                    <div className="countdown">
                      <div>
                        <div className="duration">8</div>
                        <div className="time">hours</div>
                      </div>
                      <div>
                        <div className="duration">4</div>
                        <div className="time">minutes</div>
                      </div>
                      <div>
                        <div className="duration">1</div>
                        <div className="time">seconds</div>
                      </div>
                    </div>
                    <AppButton size="large" primary={false} heavyText>
                      Place a bid
                    </AppButton>
                  </Col>
                </Row>
              </div>
            </NFTInfo>
          </Col>
        </Row>
      </PageWrapper>
    </Layout>
  );
}
