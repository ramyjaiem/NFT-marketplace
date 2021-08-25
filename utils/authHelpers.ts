import {USER_LOCAL_KEY, WALLET_LOCAL_KEY} from "../constants";


export const resetLocalStorage = () => {
    localStorage.removeItem(USER_LOCAL_KEY);
    localStorage.removeItem(USER_LOCAL_KEY);
};