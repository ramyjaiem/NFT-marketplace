import type { NextApiRequest, NextApiResponse } from 'next';
import { PublicKey, clusterApiUrl, Connection } from '@solana/web3.js';
import { SOLANA_MAINNET_CLUSTER } from '../constants';

import SYMBOLS_LIST from "../public/token_symbol.json";

type TX = {
  timestamp: number;
  signature: string;
  feeInSol: number;
  txType: string;
  srcAddress: string;
  destAddress: string;
  tokenSymbol: string;
  mintAddress: string;
  amount: number;
};

type Transactions = {
  txs: TX[];
  lastSignature: string;
};

type Data = {
  msg?: any;
  data?: Transactions;
};

const getAccountInfo = async (connection: Connection, publicKey: string) => {
  const data = await connection.getParsedAccountInfo(new PublicKey(publicKey), 'single');

  return data;
};

const TOKEN_SYMBOL: any = SYMBOLS_LIST;

export const getTransactions =  async (publicKey: string, user_limit: number , signature: any) => {
  try {
    let limit = 5;
    let before: string;
    if (user_limit) {
      limit = user_limit;
    }
    if (signature) {
      before = signature;
    }

    const connection = new Connection(clusterApiUrl(SOLANA_MAINNET_CLUSTER), 'confirmed');
    const confirmedSignatures = await connection.getConfirmedSignaturesForAddress2(new PublicKey(publicKey), {
      before,
      limit,
    });

    const txSignatures: string[] = [];
    for (const signature of confirmedSignatures) {
      txSignatures.push(signature.signature);
    }

    const txDatas: any = await connection.getParsedConfirmedTransactions(txSignatures, 'confirmed');

    const txs: TX[] = [];

    let lastSignature: string;
    for (const txData of txDatas) {
      if (!txData) {
        continue;
      }
      try {
        lastSignature = txData.transaction.signatures[0];

        // Ignore if transaction type is not transfer
        const instruction: any = txData.transaction.message.instructions[0];
        if (
          instruction.parsed &&
          instruction.parsed.type !== 'transfer' &&
          instruction.parsed.type !== 'transferChecked') {
          continue;
        }

        const programId = txData.transaction.message.instructions[0].programId.toString();
        // SOL Transfer or Token Transfer
        if (
          programId === '11111111111111111111111111111111' ||
          programId === 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        ) {
          let srcAddress = txData.transaction.message.instructions[0].parsed.info.source;
          let destAddress = txData.transaction.message.instructions[0].parsed.info.destination;
          let mintAddress;
          let symbol = 'SOL';
          let decimal = 9;
          let amount = 0;

          let txType = 'in';

          if (txData.transaction.message.instructions[0].programId.toString() === '11111111111111111111111111111111') {
            amount = txData.transaction.message.instructions[0].parsed.info.lamports / 10 ** decimal;
            if (srcAddress === publicKey) {
              txType = 'out';
              if (destAddress === publicKey) {
                txType = 'self';
              }
            }
          } else {
            // console.log(txData.transaction.message.instructions[0].programId.toString());
            mintAddress = txData.meta.preTokenBalances[0].mint;
            symbol = TOKEN_SYMBOL[mintAddress].symbol;
            decimal = txData.meta.preTokenBalances[0].uiTokenAmount.decimals;
            if (instruction.parsed.type === 'transferChecked') {
              amount = txData.transaction.message.instructions[0].parsed.info.tokenAmount.uiAmount;
            } else {
              amount = txData.transaction.message.instructions[0].parsed.info.amount / 10 ** decimal;
            }

            const srcAccountInfo: any = await getAccountInfo(connection, srcAddress);
            const destAccountInfo: any = await getAccountInfo(connection, destAddress);

            if (srcAccountInfo.value.data.parsed.info.owner === publicKey) {
              txType = 'out';
              srcAddress = publicKey;
              if (destAccountInfo.value.data.parsed.info.owner === publicKey) {
                txType = 'self';
                destAddress = publicKey;
              }
            }
          }
          txs.push({
            timestamp: txData.blockTime,
            signature: txData.transaction.signatures[0],
            feeInSol: txData.meta.fee / 10 ** 9,
            txType,
            srcAddress,
            destAddress,
            tokenSymbol: symbol,
            mintAddress,
            // amount: txData.transaction.message.instructions[0].parsed.info.lamports / (10 ** decimal),
            amount,
          });
          // console.log(txs.slice(-1));
        } else {
          for (const innerInstruction of txData.meta.innerInstructions) {
            for (const instruction of innerInstruction.instructions) {
              if (instruction.parsed.type !== 'transfer') {
                continue;
              }
              if (instruction.parsed.info.amount === '0') {
                continue;
              }
              const srcAccountInfo: any = await getAccountInfo(connection, instruction.parsed.info.source);
              const destAccountInfo: any = await getAccountInfo(connection, instruction.parsed.info.destination);
              let srcAddress = instruction.parsed.info.source;
              let destAddress = instruction.parsed.info.destination;
              const { decimals } = srcAccountInfo.value.data.parsed.info.tokenAmount;
              const mintAddress = srcAccountInfo.value.data.parsed.info.mint;
              let symbol;
              if (TOKEN_SYMBOL[mintAddress]) {
                symbol = TOKEN_SYMBOL[mintAddress].symbol;
              }
              // console.log(srcAddress, destAddress, instruction.parsed.info.amount);
              let txType = 'in';
              if (srcAccountInfo.value.data.parsed.info.owner === publicKey) {
                txType = 'out';
                srcAddress = publicKey;
                if (destAccountInfo.value.data.parsed.info.owner === publicKey) {
                  txType = 'self';
                  destAddress = publicKey;
                }
              }

              txs.push({
                timestamp: txData.blockTime,
                signature: txData.transaction.signatures[0],
                feeInSol: txData.meta.fee / 10 ** 9,
                txType,
                srcAddress,
                destAddress,
                tokenSymbol: symbol,
                mintAddress,
                amount: instruction.parsed.info.amount / 10 ** decimals,
              });
            }
          }
        }
      } catch (e) {
          // Don't return error here, simply skip the signature and move to next signature
          // return "error";
      }
    }
    const data: Transactions = { txs: txs, lastSignature: lastSignature };
    return data;
  } catch (err) {
    console.log(err);
    return "error";
  }
};
