import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fromUnixTime, format } from 'date-fns';
import { Spin } from 'antd';
import { useAuth } from '../../utils/auth';

import { Button } from '../AppButton';
import { getTransactions } from '../../utils/getTransactions';

const RecentTransaction = styled.div`
  .header {
    font-size: 26px;
    font-weight: 500px;
    color: ${(props) => props.theme.colors.white};
    padding-bottom: 15px;
    border-bottom: 2px solid #6f6f6f;
    margin-bottom: 20px;
  }

  .transactions-wrapper {
    height: 500px;
    overflow-y: auto;
    box-shadow: inset 5px 5px 15px 5px rgb(0 0 0 / 10%);
    padding: 20px;
    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  }
`;

const TransactionDetails = styled.div`
  color: ${(props) => props.theme.colors.white};
  padding-bottom: 30px;
  border-bottom: 2px solid #6f6f6f;

  .date {
    margin: 18px 0 12px;
    font-size: 20px;
  }
  .info {
    display: flex;
    align-items: center;
    font-size: 20px;
    flex-wrap: wrap;
    @media (max-width: 629px) {
      flex-direction: column;
      align-items: start;
    }

    .transaction-type {
      font-weight: bold;
      font-size: 18px;
    }

    .transaction-details {
      font-size: 16px;
      color: ${(props) => props.theme.colors.gold};
    }

    div:nth-child(2) {
      margin-left: 30px;
      @media (max-width: 629px) {
        margin-left: 0;
        margin: 10px 0;
      }
    }

    div:nth-child(3) {
      margin-left: auto;
      @media (max-width: 629px) {
        margin-left: 0;
      }
    }
  }
`;

const LoadingContainer = styled.div`
  margin: 80px 0;
  display: grid;
  place-items: center;
`;

const ButtonSpin = styled(LoadingContainer)`
  margin: 0;
  height: 45px;
`;

const MoreButton = styled(Button)``;

interface TransactionParams {
  publicKey: string;
  limit: number;
  lastSignature: string;
}

interface TransactionData {
  amount: number;
  destAddress: string;
  feeInSol: number;
  mintAddress: string;
  signature: string;
  srcAddress: string;
  timestamp: number;
  tokenSymbol: string;
  txType: string;
}

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState(null);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const { userWalletId, isAuthenticated } = useAuth();

  const [transactionParams, setTransactionParams] = useState<Partial<TransactionParams>>({
    publicKey: userWalletId,
    limit: 10,
    lastSignature: '',
  });

  const [localTransactions, setLocalTransactions] = useState<Array<TransactionData>>();

  useEffect(() => {
    const fetchTransactions = async () => {
      setTransactionsLoading(true);
      const result = await getTransactions(userWalletId, transactionParams.limit, transactionParams.lastSignature);
      console.log(result);
      if (result !== 'error') {
        setTransactions(result);
        if (localTransactions?.length > 0) {
          const updatedTransactionList = [...localTransactions, ...result.txs];
          const uniqueList = updatedTransactionList.filter(
            (v, i, a) => a.findIndex((t) => t.signature === v.signature) === i,
          );
          setLocalTransactions(uniqueList);
        } else {
          setLocalTransactions(result.txs);
        }
      }
      setTransactionsLoading(false);
    };

    if (userWalletId && isAuthenticated) {
      fetchTransactions();
    }
  }, [userWalletId, isAuthenticated, transactionParams.limit, transactionParams.lastSignature]);
  return (
    <RecentTransaction>
      <div className="header">Recent Transactions</div>
      <div className="transactions-wrapper">
        {!localTransactions ? (
          <LoadingContainer>
            <Spin />{' '}
          </LoadingContainer>
        ) : (
          <>
            {localTransactions?.map((transaction: any, index: number) => (
              <TransactionDetails key={index}>
                <div className="date">{format(fromUnixTime(transaction.timestamp), 'MMM dd, yyyy')}</div>
                <div className="info">
                  <div>
                    <img
                      src={
                        transaction.txType === 'in' ? '/transaction_received_icon.svg' : '/transaction_sent_icon.svg'
                      }
                    />
                  </div>
                  <div>
                    <span className="transaction-type">{transaction.txType === 'in' ? 'Received' : 'Sent'}</span>
                    <br />
                    <span>
                      {transaction.txType === 'in' ? `From ` : `To `}
                      <a
                        className="transaction-address"
                        href={`https://explorer.solana.com/address/${transaction.destAddress}`}
                        target="_blank"
                        style={{ fontSize: 14 }}
                        rel="noreferrer"
                      >
                        {transaction.destAddress}
                      </a>
                    </span>
                    <br />
                    <span className="transaction-details">
                      <a
                        href={`https://explorer.solana.com/tx/${transaction.signature}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Transaction details
                      </a>
                    </span>
                  </div>
                  <div>
                    {transaction.amount} {transaction.tokenSymbol ?? `UNKNOWN`}
                  </div>
                </div>
              </TransactionDetails>
            ))}
          </>
        )}
      </div>
      <br />
      <br />
      {transactions && transactionsLoading ? (
        <ButtonSpin>
          <Spin />
        </ButtonSpin>
      ) : (
        <MoreButton
          primary
          onClick={() => {
            setTransactionParams((prevState) => ({
              ...prevState,
              lastSignature: transactions?.lastSignature ?? '',
            }));
          }}
        >
          Load More
        </MoreButton>
      )}
    </RecentTransaction>
  );
}
