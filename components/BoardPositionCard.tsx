import styled from "styled-components";
import {CaretUpFilled, CaretDownFilled} from "@ant-design/icons";
const CardWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  & .rank {
    margin-right: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & :first-child {
        color: ${(props) => props.theme.colors.white};
        font-weight: 500;
    }
  }

  & .card-render {
    border-radius: 40px;
    border: 2px solid #52332f;
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    font-weight: 500;
    height: 52px;
    position: relative;
    width: 100%;
    padding: 10px;

    & .profile-picture {
      height: 52px;
      width: 52px;
      border-radius: 50%;
      border: 2px solid #52332f;
      position: absolute;
      top: -1px;
      left: -1px;
    }
  }
`;

const CardImage = styled.img`
height: 100%;
width: 100%;
border-radius: 50%;
`;

interface Props {
  user?: User
}


export default function BoardPositionCard({user}:Props) {
  const showRankPointer = () => {
    if (user.currentRank < user.previousRank ) {
    return <CaretUpFilled style={{color:"#00D455"}}/>;
    }
    else if (user.currentRank > user.previousRank) {
      return  <CaretDownFilled style={{color:"#e74c3c"}} />;
    }
    return <CaretUpFilled style={{color: "#555"}}/>;
  };
  
  return (
    <CardWrapper>
      <div className="rank">
        <div>{user.currentRank}</div>
       {showRankPointer()}
      </div>

      <div className="card-render">
        {user.ninjaHolding}
        <div className="profile-picture">
          <CardImage src="/profile.jpg"/>
        </div>
      </div>
    </CardWrapper>
  );
}
