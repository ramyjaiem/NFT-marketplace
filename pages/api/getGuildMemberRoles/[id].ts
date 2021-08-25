// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";
import {DISCORD_API_URL,DISCORD_BOT_TOKEN, DISCORD_NINJA_GUILD_ID} from "../../../constants";

const CONFIG = {
  headers: {
    'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
  }
}

type Role =  {
  id: string,
  name: string,
}

type Data = {
  msg?: any,
  data?: Role[],
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {id} = req.query;
  try {
  let guildRoles =  axios.get(`${DISCORD_API_URL}/guilds/${DISCORD_NINJA_GUILD_ID}/roles`, CONFIG);
  let memberInfo =  axios.get(`${DISCORD_API_URL}/guilds/${DISCORD_NINJA_GUILD_ID}/members/${id}`, CONFIG);
   
  let result = await Promise.all([guildRoles, memberInfo]);

  if (result[1]?.data?.roles && result[1]?.data?.roles.length > 0 ) {
    const roles = result[1]?.data?.roles.map((id:string) => {
      let roleDetails = result[0]?.data.find((item: any) => item.id === id);
      return {id: roleDetails.id, name: roleDetails.name};
    });
    return res.status(200).json({ msg:"success", data: roles});
  }
  return res.status(200).json({ msg:"success", data: []})
  }
  catch(err) {
    res.status(500).json({msg: "Error getting member info"});
  }
}
