
interface User {
    __typename?: 'User';
    walletId?: number,
    discordId?: number,
    name?: string,
    avatar?: string,
    roles?: string[],
    currentRank?: number
    previousRank?: number;
    ninjaHolding?: number;
    description: string;
    profilePicture: string;
    banner: string;
    social: {
      facebook: string;
      instagram: string;
      twitter: string;
      discord: string;
    }
  };


  interface TokenData {
    tokenSymbol: string;
    amountInUSD: string;
  }