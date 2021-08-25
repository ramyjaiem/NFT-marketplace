// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Connection, clusterApiUrl, PublicKey} from '@solana/web3.js';
import { SPL_TOKEN_PROGRAM_ID, NINJA_TOKEN_MINT } from '../../../constants';
const NETWORK = 'mainnet-beta';
const connection = new Connection(clusterApiUrl(NETWORK));
const commitment = "processed";
const SPL_PUBKEY = new PublicKey(SPL_TOKEN_PROGRAM_ID);
const NINJA_MINT_PUBKEY = new PublicKey(NINJA_TOKEN_MINT);

type Data = {
  msg?: any,
  data?: {holdings: number},
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id} = req.query;
  try {
    let userBalance = 0;

    let accountPubKey = new PublicKey(id);
    let tokenAccounts = await connection.getTokenAccountsByOwner(accountPubKey, {programId:  SPL_PUBKEY, mint: NINJA_MINT_PUBKEY}, commitment);

    let userTokenKey = tokenAccounts?.value[0]?.pubkey;
    if (userTokenKey) {
      let userTokenAccount = await connection.getTokenAccountBalance(userTokenKey, commitment);
      userBalance = userTokenAccount?.value?.uiAmount;
    }
    return res.status(200).json({ msg:"success", data: {holdings: userBalance ?? 0}});
  }
  catch(err) {
    res.status(500).json({msg: "Error getting user holdings "});
  }
}
