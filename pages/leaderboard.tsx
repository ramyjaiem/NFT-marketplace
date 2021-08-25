import Head from 'next/head';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import Layout from "../components/Layout";
import LeaderBoardCard from '../components/LeaderBoardCard';
import StyledInput from '../components/StyledInput';
import Carousel from '../components/Carousel';
import { useQuery } from "@apollo/client";
import { throttle } from 'lodash';
import { QUERY_USER } from '../dgraph/queries/user';
import { LeaderboardType } from '../constants';
import { useWallet } from '../utils/wallet';
const FETCH_LIMIT = 15;

const PageWrapper = styled.main`
  align-items: center;
  justify-content: center;
  margin: 0 5%;
`;
const Container = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;

const Main = styled.main``;

const ContentWrapper = styled.div`
  margin: 20px 0%;
  .title {
    font-size: ${(props) => props.theme.fontSizes[7]};
    color: ${(props) => props.theme.colors.white};
    margin: 0 0 45px;
  }
`;
interface ToggleProps {
  selected?: boolean;
}

export const ClearButton = styled.div<ToggleProps>`
  background: transparent;
  padding: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${(props) => (props.selected ? props.theme.colors.blue : props.theme.colors.grey)};
`;

const WeeklySeasonalToggle = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.fontSizes[4]};

  div:nth-child(2) {
    margin: 0 15px;
    color: ${(props) => props.theme.colors.grey};
  }
`;

const SearchBarWrapper = styled.div`
  margin: 35px 0;
`;

export default function LeaderBoard() {
  const [leaderboardType, setLeaderBoardType] = useState<LeaderboardType>(LeaderboardType.Weekly);
  const [rankings, setUserRankings] = useState<any>([1, 2, 3]);
  const [allFetched, setAllFetched] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const { connected } = useWallet();
  const { loading, error, called, fetchMore } = useQuery(QUERY_USER,
    {
      variables: { first: FETCH_LIMIT, offset, order: { asc: 'currentRank' }, filter: { currentRank: { gt: 0 } } },
      onCompleted: (data) => {
        if (called && data?.queryUser.length < FETCH_LIMIT) {
          setAllFetched(true);
        }
        setUserRankings([...rankings, ...data?.queryUser]);
      }
    });

  const withThrottleBoardScroll = useCallback(
    throttle((totalHeight, currentHeigth) => {
      if (currentHeigth >= totalHeight && !loading && !allFetched) {
        const newOffset = offset + FETCH_LIMIT;
        fetchMore({ variables: { offset: newOffset } });
        setOffset(newOffset);
      }
    }, 1000),
    [offset, loading, fetchMore, allFetched],
  );

  const onScroll = (event: any) => {
    const maxScrollPosition = (event.currentTarget.scrollHeight - event.currentTarget.clientHeight) * 0.75;
    const scrollBarPosition = event.currentTarget.scrollTop;
    withThrottleBoardScroll(maxScrollPosition, scrollBarPosition);
  }

  if (!called) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>Error fetching data</p>
  }

  return (
    <Container onScroll={onScroll}>
      <Head>
        <title>LeaderBoard - Ninja NFT</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PageWrapper className={connected ? 'height-f' : 'height-v'}>
          <Carousel />
          <ContentWrapper>
            <div className="container-fluid g-md-0 my-3">
              <div className="d-flex justify-content-center align-items-center">
                <div className="my-3">
                  <h1 className="leader-heading text-center">Leaderboard</h1>
                  <p className="leader-text text-center">The Top Holders on NINJA PROTOCOL</p>
                </div>
              </div>
            </div>
            <div className="row mb-3 leaderboar-form">
              <div className="col-6 col-md-3 col-lg-2 leftbtn h-100">
                <div className="mr-lg-1 h-100">
                  <select className="form-control text-white bg-dark" id="exampleFormControlSelect1">
                    <option>Weekly</option>
                    <option>Seasonal</option>
                  </select>
                </div>
              </div>
              <div className="col-6 col-lg-2 col-md-3 rightbtn h-100">
                <div className="mx-lg-2">
                  <select className="form-control text-white bg-dark" id="exampleFormControlSelect2">

                    <option value="">Last 7 Days</option>
                    <option value="">Last 24 Hours</option>
                    <option value="">Last 30 Days</option>
                    <option value="">All Time</option>


                  </select>
                </div>
              </div>
              <StyledInput />
            </div>
            {/* <WeeklySeasonalToggle>
              <ClearButton onClick={() => setLeaderBoardType(LeaderboardType.Weekly)} selected={leaderboardType === LeaderboardType.Weekly}>
                Weekly
              </ClearButton>
              <div>|</div>
              <ClearButton onClick={() => setLeaderBoardType(LeaderboardType.Seasonal)} selected={leaderboardType === LeaderboardType.Seasonal}>
                Seasonal
              </ClearButton>
            </WeeklySeasonalToggle> */}



            <div className="row no-gutters leader-row mb-3 py-2">
              <div className="col-md-4  d-none d-md-block ">
                <div className="d-flex justify-content-md-start">
                  <b>Holders<img className="ml-1" width={12} height={12} src='/sort_icon.svg' alt='sort-icon' /></b>
                </div>

              </div>
              <div className="col-md-5  d-none d-md-block ">
                <div className="row no-gutters h-100">
                  <div className="col-md-4">
                    <div className="d-flex justify-content-center align-items-center h-100 w-100">
                      <div className="align-self-center">
                        <b>Ninja</b>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex justify-content-center align-items-center h-100 w-100">
                      <div className="align-self-center">
                        <b>24h</b>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex justify-content-center align-items-center h-100 w-100">
                      <div className="align-self-center">
                        <b>7d</b>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2  d-none d-md-block ">
                <div className="d-flex justify-content-center align-items-center h-100 w-100">
                  <div className="align-self-center">
                    <b>Rewards</b>
                  </div>

                </div>
              </div>
              <div className="col-md-1  d-none d-md-block ">
                <div className="d-flex justify-content-center align-items-center h-100 w-100">


                </div>
              </div>
            </div>
            {rankings.map((user: User) => {
              return (
                <LeaderBoardCard key={user.discordId} user={user} />
              )
            })}
            <div className="container-fluid" style={{ marginBottom: '5%' }}>
              <div className="row no-gutters">
                <div className="col-12">
                  <nav aria-label="Page navigation example">
                    <div className="d-flex justify-content-md-end justify-content-center">
                      <ul className="pagination">
                        <li className="page-item bg-dark">
                          <a className="page-link" href="#" aria-label="Previous">
                            <img src='/chevron_left.svg' alt='left' />
                            <span className="sr-only">Previous</span>
                          </a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#" style={{ color: '#851cef !important' }}>1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                        <li className="page-item"><a className="page-link" href="#">...</a></li>
                        <li className="page-item"><a className="page-link" href="#">100</a></li>
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Next">
                            <img src='/chevron_right.svg' alt='right' />
                            <span className="sr-only">Next</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>

          </ContentWrapper>
        </PageWrapper>
      </Layout>
    </Container>
  );
}