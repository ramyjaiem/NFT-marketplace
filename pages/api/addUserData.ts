// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PublicKey} from "@solana/web3.js";
import { GraphQLClient } from 'graphql-request';
import {ADD_USER} from "../../dgraph/mutations/user";
import {DGRAPH_AUTH_TOKEN, DGRAPH_URL} from "../../constants";
import { verifySignature } from '../../utils/verifySignature';

const client = new GraphQLClient(DGRAPH_URL, { headers: {'DG-Auth': DGRAPH_AUTH_TOKEN } });


export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    
    const {signature, encodedData, publicKey: key} = req.body;
    const data = new Uint8Array(Object.values(encodedData));
    const signatureArray = new Uint8Array(signature.data);
    const pubKey = new PublicKey(key);

    if(verifySignature(data, signatureArray, pubKey)) {
      const decodedData = JSON.parse(new TextDecoder().decode(data));
      await client.request(ADD_USER, {input: [decodedData]});
      return res.status(200).json({ msg:"success", data: []})
    };

    return res.status(400).json({ msg:"error", data: []})

  }
  catch(err) {
    res.status(500).json({msg: "Error updating info"});
  }
}
