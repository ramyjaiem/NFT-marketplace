import CoinGecko from 'coingecko-api';
import { PublicKey, clusterApiUrl, Connection } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Market } from '@project-serum/serum';
import {
  SERUM_PROGRAM_ID,
  NINJA_USDC_MARKET_ID,
  SOLANA_MAINNET_CLUSTER,
} from '../constants';

import SYMBOLS_LIST from "../public/token_symbol.json";


const TOKEN_SYMBOL: any = SYMBOLS_LIST;

export const getPortfolio = async (id: string) => {
  try {
    const publicKey = id;
    const connection = new Connection(clusterApiUrl(SOLANA_MAINNET_CLUSTER), 'max');
    const accounts = await connection.getParsedTokenAccountsByOwner(new PublicKey(publicKey), {
      programId: TOKEN_PROGRAM_ID,
    });

    const tokenBalance: any = {};
    const coinGeckoIDForPrice: any = [];
    const symToSerumV3Usdc: any = {};
    const symToSerumV3Usdt: any = {};
    const symToCoinGeckoId: any = {};
    const priceInUSD: any = {};
    let ninjaFound = false;
    for (const data of accounts.value) {
      const mintAddr = data.account.data.parsed.info.mint.toString();
      const tokenSymbol = TOKEN_SYMBOL[mintAddr];
      // Ignore tokens without Symbol
      if (tokenSymbol === undefined) {
        continue;
      }
      const symbol: any = tokenSymbol.symbol;
      if (
        tokenSymbol.coingeckoId === undefined &&
        tokenSymbol.serumV3Usdc === undefined &&
        tokenSymbol.serumV3Usdt === undefined
      ) {
        if (tokenSymbol.symbol !== 'NINJA') {
          continue;
        }
      }
      // Ignore tokens with 0 balance
      if (data.account.data.parsed.info.tokenAmount.uiAmount === 0) {
        continue;
      }
      if (tokenBalance[symbol] === undefined) {
        tokenBalance[symbol] = 0;
        priceInUSD[symbol] = 0;
        if (symbol !== 'NINJA') {
          if (tokenSymbol.coingeckoId !== undefined) {
            coinGeckoIDForPrice.push(tokenSymbol.coingeckoId);
            symToCoinGeckoId[symbol] = tokenSymbol.coingeckoId;
          } else if (tokenSymbol.serumV3Usdc !== undefined) {
            symToSerumV3Usdc[symbol] = tokenSymbol.serumV3Usdc;
          } else if (tokenSymbol.serumV3Usdt !== undefined) {
            symToSerumV3Usdt[symbol] = tokenSymbol.serumV3Usdt;
          } else {
            continue;
          }
        } else {
          ninjaFound = true;
        }
      }
      tokenBalance[symbol] += data.account.data.parsed.info.tokenAmount.uiAmount;
    }

    // Get SOL Balance
    let solBalance = await connection.getBalance(new PublicKey(publicKey));
    solBalance /= 1000000000;
    if (solBalance > 0) {
      tokenBalance.SOL = solBalance;
      priceInUSD.SOL = 0;
      symToCoinGeckoId.SOL = 'solana';
      coinGeckoIDForPrice.push('solana');
    }

    const CoinGeckoClient = new CoinGecko();
    const coinGeckoResponse = await CoinGeckoClient.simple.price({
      ids: coinGeckoIDForPrice,
      vs_currencies: ['usd'],
    });

    // Load Price IN USD from CoinGecko Response
    for (const sym in tokenBalance) {
      const cgData = coinGeckoResponse.data[symToCoinGeckoId[sym]];
      if (cgData !== undefined) {
        priceInUSD[sym] = cgData.usd;
      }
    }

    // Load Price IN USDc from Serum DEX Market
    for (const sym in symToSerumV3Usdc) {
      const market = await Market.load(
        connection,
        new PublicKey(symToSerumV3Usdc[sym]),
        {},
        new PublicKey(SERUM_PROGRAM_ID),
      );
      const bids = await market.loadBids(connection);
      const bidData = bids.getL2(1);
      if (bidData.length == 0) {
        continue
      }
      priceInUSD[sym] = bidData[0][0];
    }

    // Load Price IN USDt from Serum DEX Market
    for (const sym in symToSerumV3Usdt) {
      const market = await Market.load(
        connection,
        new PublicKey(symToSerumV3Usdt[sym]),
        {},
        new PublicKey(SERUM_PROGRAM_ID),
      );
      const bids = await market.loadBids(connection);
      const bidData = bids.getL2(1);
      if (bidData.length == 0) {
        continue
      }
      priceInUSD[sym] = bidData[0][0];
    }

    if (ninjaFound) {
      const market = await Market.load(
        connection,
        new PublicKey(NINJA_USDC_MARKET_ID),
        {},
        new PublicKey(SERUM_PROGRAM_ID),
      );
      const bids = await market.loadBids(connection);

      priceInUSD['NINJA'] = bids.getL2(1)[0][0];
    }

    const data = [];
    for (const sym in priceInUSD) {
      tokenBalance[sym] *= priceInUSD[sym];
      data.push({ tokenSymbol: sym, amountInUSD: tokenBalance[sym].toFixed(2) });
    }

    return data;
  } catch (err) {
    return "error";
  }
};
