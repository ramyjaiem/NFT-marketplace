import { Spin } from 'antd';
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components';
import AppButton from '../AppButton';
import { DISCORD_AUTH0_URL, DISCORD_DEVELOP_URL } from '../../constants';

interface PillProps {
  color?: string;
}

const ProfileCard = styled.div`
  height: auto;
  min-height: 354px;
  padding: 130px 3% 0px;
  border-radius: 4px;
  border: 1px solid #851cef;
  position: relative;
  margin-top: 30px;
  background-color: ${(props) => props.theme.colors.cardBG};

  .title {
    font-weight: 500;
    font-size: ${(props) => props.theme.fontSizes[3]};
    color: ${(props) => props.theme.colors.white};
    margin-bottom: 20px;
    text-align: center;
    margin-top: 25px;
  }

  @media (max-width: 700px) {
    padding: 100px 5% 0px !important;
    .title {
      margin-top: 0px !important;
    }
  }
`;

const BadgesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Pill = styled.div<PillProps>`
  padding: 8px 27px;
  border-radius: 40px;
  background-color: ${(props) => props.color ?? props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  text-align: center;
  margin: 0 20px 10px 0;
`;

const Holdings = styled.div`
  display: flex;
  align-items: center;
  color: #f8f5f5;
  margin-bottom: 25px;
  margin-top: 10px;

  div:nth-child(1) {
    background: ${(props) => props.theme.colors.red};
    color: ${(props) => props.theme.colors.red};
    height: 16px;
    width: 16px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const AchivementBar = styled.div`
  display: flex;
  padding: 12px 26px;
  font-size: 18px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.grey2};
  text-transform: capitalize;
  margin-bottom: 20px;

  div:nth-child(2) {
    margin-left: auto;
  }
`;

const ProfilePicture = styled.div`
  height: 288px;
  width: 288px;
  border-radius: 50%;
  position: absolute;
  top: -40%;
  left: 16%;
  overflow: hidden;
  border: ${(props) => `8px solid ${props.theme.colors.black}`};
  @media (max-width: 1134px) {
    height: 200px;
    width: 200px;
    top: -35%;
    left: 10%;
  }
`;

const Discord = styled.div`
  width: auto;
  float: left;
  display: block;
  text-align: center;
  border-radius: 10px;
  margin: 5px;
  padding: 4px 12px;
`;

interface ProfileInfoProps {
  loading: boolean;
  userData: any;
  ninjaTokens: number;
}

const roleColor: { [key: string]: string } = {
  'WEAPONS MASTER': '#000000',
  'TRAINEE': '#914500',
  'BABY NINJA': '#8C91A7',
  'FULL NINJA': '#00D455',
  'NINJA WARRIOR': "'#D000FF",
  'PAY-2-WIN NINJA WARRIOR': '#522EBD',
  'LEGENDARY NINJA': '#FFFF00',
  'NINJA OG': '#2ECC71',
  'NINJA WARRIOR (P2W)': '#A84EFF',
  'CLAN NINJA': '#02A800',
  'NINJA APPRENTICE': '#556AFF',
  'NINJA BOOST': '#A58EAC',
  'NINJA RECRUITER': '#FF6DDC',
  'NINJA MASTER': '#DD0000',
  'MASTER SENSEI': '#FFA500',
};

export default function ProfileInfoCard({ userData, ninjaTokens, loading }: ProfileInfoProps) {

  const connectDiscord = () => {
    window.location.href = DISCORD_AUTH0_URL;
  };

  const showBadges = () => {
    if (loading) {
      return <Spin />;
    } else if (userData && userData?.discordId) {
      return (
        <BadgesWrapper>
          {userData?.roles?.map((role: any, index: number) => (
            <Pill key={index} color={roleColor[role.name.toUpperCase()]}>
              {role.name}
            </Pill>
          ))}
        </BadgesWrapper>
      );
    } else {
      return <AppButton onClick={connectDiscord}>Link Discord Account</AppButton>;
    }
  };

  return (
    <>
      <div className="card bg-dark border-primary mr-10 h-100 ">
        <div className="card-body card-body-image">
          <img src={userData?.profilePicture ? userData.profilePicture : '/profile.jpg'} id="clip" className="rounded-circle" alt="" width="250" height="250" />
          <div className="px-4  specs-text">
            <h5 className="card-title text-white fs-3 mb-3 mx-3" style={{ textAlign: 'center' }}>{userData?.username ? userData.username : 'Discord ID'}</h5>
            <div className="flex mb-3">
              {showBadges()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
