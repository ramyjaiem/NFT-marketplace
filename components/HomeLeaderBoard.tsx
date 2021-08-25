import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import AppButton from './AppButton';
import BoardPositionCard from './BoardPositionCard';
import { QUERY_USER } from '../dgraph/queries/user';

const BoardWrapper = styled.div`
  border-radius: 10px;
  border: 1px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(180deg, #ffb800 0%, #9e41c6 100%);
  padding: 40px 15px 80px;
  margin-top: 130px;
  @media (max-width: 851px) {
    margin-top: 20px;
  }
`;

const Description = styled.div`
  font-weight: 500;
  font-size: 26px;
  text-align: center;
  margin-bottom: 27px;
  color: ${(props) => props.theme.colors.white};
`;

const TopThree = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 290px;
  background: url('/sun_burn.svg') no-repeat center center;
  background-size: 500px 500px;

  .first {
    height: 140px;
    width: 140px;
    border: 4px solid #ffb800;
    border-radius: 50%;
    margin: -40px 5px 0px;
    position: relative;

    .crown {
      position: absolute;
      top: -50%;
      left: 3%;
    }
  }

  .second,
  .third {
    height: 110px;
    width: 110px;
    border: 4px solid #6f6f6f;
    border-radius: 50%;
  }
`;

const ItemsWrapper = styled.div`
  margin-bottom: 30px;
`;

const LeaderBoardImage = styled.img`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 50%;
`;
export default function HomeLeaderBoard() {
  const { data, loading } = useQuery(QUERY_USER, {
    variables: { first: 10, order: { asc: 'currentRank' }, filter: { currentRank: { gt: 0 } } },
  });
  const router = useRouter();
  const onViewAllClick = () => {
    router.push('/leaderboard');
  };

  const showRankings = () => {
    if (data && data.queryUser) {
      const userData = [...data.queryUser];
      const sorted = userData.sort((a: any, b: any) => a.currentRank - b.currentRank);
      return sorted.map((user: User) => <BoardPositionCard user={user} key={user?.walletId} />);
    }
  };

  if (loading) {
    return <p></p>;
  }

  return (
    <BoardWrapper>
      <Description>Weekly LeaderBoard</Description>
      <TopThree>
        <div className="second">{data?.queryUser[1] ? <LeaderBoardImage src="/pp1.png" /> : null}</div>
        <div className="first">
          {data?.queryUser[0] ? (
            <>
              <LeaderBoardImage src="/pp2.png" />
              <img src="/First_place_crown.png" className="crown" />
            </>
          ) : null}
        </div>
        <div className="third">{data?.queryUser[2] ? <LeaderBoardImage src="/pp3.png" /> : null}</div>
      </TopThree>
      <ItemsWrapper>{showRankings()}</ItemsWrapper>
      <AppButton onClick={onViewAllClick} heavyText>
        View All
      </AppButton>
    </BoardWrapper>
  );
}
