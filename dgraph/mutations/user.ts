import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($input: [AddUserInput!]!) {
    addUser(input: $input) {
      user {
        avatar
        currentRank
        name
        walletId
        roles {
          id
          name
        }
        signDate
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        avatar
        currentRank
        description
        discordId
        email
        name
        ninjaHolding
        previousRank
        signDate
        roles {
          name
          id
        }
        username
        walletId
      }
    }
  }
`;

export const UPDATE_USER_BIO = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        social {
          instagram
          twitter
          youtube
        }
        description
        banner
        profilePicture
      }
    }
  }
`;
