import { gql } from '@apollo/client';

export const GET_USER_PROFILE = gql`
  query GetUser($walletId: String!) {
    getUser(walletId: $walletId) {
      discordId
      username
      previousRank
      currentRank
      ninjaHolding
      discordId
      description
      signDate
      profilePicture
      banner
      social {
        instagram
        twitter
        youtube
        discord 
        facebook
      }
      roles {
        id
        name
      }
    }
  }
`;
