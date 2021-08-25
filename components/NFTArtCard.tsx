import styled from "styled-components";

const Card = styled.div`
  border: 4px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(180deg, #ffb800 0%, #9e41c6 100%);
  background-color: ${(props) => props.theme.colors.black};
  height: 292px;
  padding: 15px;
  width: 100%;


img.img-container {
    height: 163px;
    width: 163px;
    border-radius: 10px;
    padding: 15px 15px 20px;
}

  .nft-name {
    font-weight: 500;
    font-size: 20px;
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 9px;
  }
  .artist-and-price {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: ${(props) => props.theme.colors.white};

    div:nth-child(2) {
      margin-left: auto;
    }
  }

  .price {
    color: ${(props) => props.theme.colors.blue};
    font-size: 14px;
    margin-right: 4px;
  }
  .quantity {
    color: ${(props) => props.theme.colors.grey};
    font-size: 12px;
  }
`;

export default function NFTArtCard() {
  return (
    <Card>
        <img className="img-container" src="/NFT_sample.png" />
      <div className="nft-name">NFT Name</div>
      <div className="artist-and-price">
        <div>Artist</div>
        <div>Price</div>
      </div>
      <div className="artist-and-price">
        <div>Hattori</div>
        <div>
          <span className="price">5 NINJA</span>
          <span className="quantity">1 of 5</span>
        </div>
      </div>
    </Card>
  );
}
