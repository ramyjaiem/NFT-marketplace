import styled from 'styled-components';
import AppButton from './AppButton';

const Card = styled.div`
  border-radius: 20px;
  border: ${(props) => `4px solid ${props.theme.colors.purple}`};
  padding: 24px;

  .pack-name {
    font-weight: bold;
    font-size: ${(props) => props.theme.fontSizes[3]};
    color: ${(props) => props.theme.colors.white};
    margin-top: 10px;
    text-align: center;
  }

  .pack-image {
    margin: 54px auto;
    text-align: center;
  }

  .content-and-price {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    color: ${(props) => props.theme.colors.white};

    .title {
      font-weight: bold;
      font-size: ${(props) => props.theme.fontSizes[1]};
    }

    & > :nth-child(2) {
      margin-left: auto;
      align-self: flex-end;
      font-weight: bold;
      font-size: ${(props) => props.theme.fontSizes[2]};
    }
  }
`;

export default function PacksCard() {
  return (
    <Card>
      <div className="pack-name">Legendary Pack</div>
      <div className="pack-image">
        <img src="/packIcon.svg" alt="pack-icon" />
      </div>
      <div className="content-and-price">
        <div>
          <div className="title">Contains 10 items</div>
          <div>5 super rare</div>
          <div>3 rare</div>
          <div>2 common</div>
        </div>
        <div>1500 NINJA</div>
      </div>
      <AppButton heavyText>Buy</AppButton>
    </Card>
  );
}
