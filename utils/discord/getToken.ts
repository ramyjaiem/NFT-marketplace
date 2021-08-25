import axios from "axios";
import qs from "qs";
import {DISCORD_TOKEN_URL, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET,DISCORD_REDIRECT_URI, DISCORD_DEVELOP_REDIRECT_URI} from "../../constants";

const GRANT_TYPE = "authorization_code";

const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
};

export const getToken = async (code: string) => { 
  try {
     const data =  {
        'client_id': DISCORD_CLIENT_ID,
        'client_secret': DISCORD_CLIENT_SECRET,
        'grant_type': GRANT_TYPE,
        'code': code,
        'redirect_uri': process.env.DISCORD_REDIRECT_URL ,
    };
     const result = await axios.post(DISCORD_TOKEN_URL, qs.stringify(data));
     return ({msg:"success", accessToken: result?.data?.access_token});
  }
  catch(err) {
    return ({msg:"error getting access token"});
  }
  
}