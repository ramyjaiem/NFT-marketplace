import styled from 'styled-components';

const Synopsis = styled.div`
  display: flex;
  flex-wrap: wrap;
  img {
    border-radius: 10px;
  }

  & > :nth-child(2) {
    margin-left: 12px;
    .news-title {
      width: 60%;
      font-size: ${(props) => props.theme.fontSizes[2]};
      color: ${(props) => props.theme.colors.white};
      font-weight: 500;
      text-transform: capitalize;
    }

    .preview-text {
      width: 60%;
      font-size: ${(props) => props.theme.fontSizes[1]};
      color: #969696;
    }
  }
`;

export default function FeaturedNewsSynopsis() {
  return (
    <Synopsis>
      <div>
        <img src="/news_img2.png" alt="news-image" />
      </div>
      <div>
        <p className="news-title">Ninja the NFT token you can't afford to miss out on</p>
        <p className="preview-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
      </div>
    </Synopsis>
  );
}
