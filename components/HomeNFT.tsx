import { Row, Col, Space } from 'antd';
import styled from 'styled-components';
import NFTArtCard from './NFTArtCard';
import AppButton from './AppButton';
import StyledInput from './StyledInput';

const SectionWrapper = styled.div`
  .description {
    font-weight: 500;
    font-size: ${(props) => props.theme.fontSizes[2]};
    color: ${(props) => props.theme.colors.white};
    text-align: center;
    text-transform: capitalize;
    margin-bottom: 30px;
  }

  .ant-row {
    margin: 0 !important;
  }
`;

export default function HomeNFT() {
  return (
    <SectionWrapper>
      <div className="description">the most rare NFTs</div>
      <StyledInput />
      <Space size="large" direction="vertical">
        <Row justify="center" gutter={[12, 16]}>
          {Array.from(new Array(12)).map((_, index) => (
            <Col key={index} xs={24} md={8}>
              <NFTArtCard />
            </Col>
          ))}
        </Row>
        <AppButton heavyText>Load More</AppButton>
      </Space>
    </SectionWrapper>
  );
}
