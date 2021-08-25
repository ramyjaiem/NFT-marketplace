// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PublicKey } from '@solana/web3.js';
import { GraphQLClient } from 'graphql-request';
import { GET_USER_PROFILE } from '../../dgraph/queries/userProfile';
import { UPDATE_USER } from '../../dgraph/mutations/user';
import { DGRAPH_AUTH_TOKEN, DGRAPH_URL } from '../../constants';
import { verifySignature } from '../../utils/verifySignature';
import { isBefore } from 'date-fns';

const client = new GraphQLClient(DGRAPH_URL, { headers: { 'DG-Auth': DGRAPH_AUTH_TOKEN } });

const checkSignData = async (walletId: string, signDate: string) => {
  try {
    const userData = await client.request(GET_USER_PROFILE, { walletId });
    if (userData?.getUser) {
      if (userData?.getUser?.signDate) {
        return isBefore(new Date(userData?.getUser?.signDate), new Date(signDate));
      } else return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { signature, encodedData, publicKey: key } = req.body;
    const data = new Uint8Array(Object.values(encodedData));
    const signatureArray = new Uint8Array(signature.data);
    const pubKey = new PublicKey(key);
    if (verifySignature(data, signatureArray, pubKey)) {
      const decodedData = JSON.parse(new TextDecoder().decode(data));
      const signVerified = await checkSignData(pubKey.toBase58(), decodedData?.signDate);
      if (signVerified) {
        await client.request(UPDATE_USER, { input: decodedData.input });
        return res.status(200).json({ msg: 'success', data: [] });
      }
    }
    return res.status(400).json({ msg: 'success', data: [] });
  } catch (err) {
    console.log('err', err);
    res.status(500).json({ msg: 'Error updating info' });
  }
};
