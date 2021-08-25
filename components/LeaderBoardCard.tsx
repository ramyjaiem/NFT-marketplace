import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
interface LeaderBoardCardProps {
  user: User;
}

// const Card = styled.div`
//   margin-top: 50px;
//   border-radius: 20px;
//   height: 120px;
//   display: flex;
//   padding: 20px 50px;
//   background-color: ${(props) => props.theme.colors.white};
//   align-items: center;

//   &.userRank1 {
//     height: 200px;
//     background-color: ${(props) => props.theme.colors.gold};
//   }

//   &.userRank2 {
//     height: 180px;
//     background-color: ${(props) => props.theme.colors.grey};
//   }

//   &.userRank3 {
//     height: 160px;
//     background-color: #cd7f32;
//   }

//   div:nth-child(1) {
//     color: ${(props) => props.theme.colors.black};
//     font-size: ${(props) => props.theme.fontSizes[8]};
//   }

//   div:nth-child(2) {
//     height: 80px;
//     width: 80px;
//     border-radius: 50%;
//     border: 1px solid #ffb800;
//     margin-left: 4%;
//   }

//   div:nth-child(3) {
//     color: ${(props) => props.theme.colors.black};
//     font-size: ${(props) => props.theme.fontSizes[3]};
//     margin-left: 4%;
//   }

//   div:nth-child(4) {
//     color: ${(props) => props.theme.colors.black};
//     font-size: ${(props) => props.theme.fontSizes[3]};
//     font-weight: bold;
//     text-align: right;
//     margin-left: auto;
//   }
// `;

export default function LeaderBoardCard({ user }: LeaderBoardCardProps) {
  return (
    // <Card className={`userRank${user.currentRank}`}>
    //   <div>{user.currentRank}</div>
    //   <div></div>
    //   <div>{user.name}</div>
    //   <div>{user.ninjaHolding} NINJA</div>
    // </Card>
    <div className="row no-gutters bg-dark leader-row  mb-3">
      <div className="col-10 col-md-4 ">
        <div className="d-flex bg-dark justify-content-md-start">
          <div className="bg-dark1">
            <div className="bg-dark profile-image">
              <img className="image-leader" src="/leaderboard-icons/profile-icon.png" alt="profile-icon" />
            </div>
          </div>

          <div className="self-ml-board align-self-center">
            <p className="discord-text">Discord ID:12345612345612345</p>
            <div>
              <div>
                <p className="name-text w-100">1. Dany | NINJA</p>
                <hr className='yellow-line' />
              </div>
            </div>
            <p className="title-text d-none d-md-block">Legenday 25/11/2021</p>

          </div>
        </div>

      </div>
      <div className="col-md-5  d-none d-md-block ">
        <div className="row no-gutters h-100">
          <div className="col-md-4">
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
              <div className="align-self-center">
                <img className="mr-2" src="/leaderboard-icons/LOGO_SOL_NOBG.png" width={18} height={18} alt="LOGO_SOL_NOBG" />
                <span>71,840</span>
              </div>

            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
              <div className="align-self-center" style={{ color: '#1ca27f' }}>
                +100
              </div>

            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-center align-items-center h-100 w-100">
              <div className="align-self-center" style={{ color: '#1ca27f' }}>
                +258
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2  d-none d-md-block ">
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
          <div className="align-self-center" style={{ color: '#1ca27f' }}>
            508
          </div>

        </div>
      </div>
      <div className="col-md-1 col-2">
        <div className="d-flex justify-content-center align-items-center h-100 w-100">
          <div className="align-self-center  right-icon">
            {/* <span className="check rounded-circle bg-danger pt-1 pb-1 px-2">
              <i className="fas fa-caret-up" style={{ fontSize: '1.3em', color: 'white !important' }}></i>
            </span> */}
            <img src='/up-icon.svg' alt='icon' />
          </div>

        </div>
      </div>
    </div>
  );
}
