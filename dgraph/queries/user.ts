import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query queryUser($filter: UserFilter, $first: Int, $offset: Int, $order: UserOrder) {
    queryUser(filter: $filter, first: $first, offset: $offset, order: $order) {
      walletId
      discordId
      ninjaHolding
      avatar
      currentRank
      previousRank
      username
      description
      email
      description
      profilePicture
      banner
      signDate
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
