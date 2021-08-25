import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import { fromUnixTime, format } from 'date-fns';
import { Spin } from 'antd';
import { useAuth } from '../../utils/auth';

import { Button } from '../AppButton';
import { getTransactions } from '../../utils/getTransactions';

const TableWrapper = styled.div`
  .ant-table {
    background: ${(props) => props.theme.colors.cardBG};
  }
  .ant-table table {
    background: ${(props) => props.theme.colors.cardBG};
    border: 1px solid #851cef;
    color: ${(props) => props.theme.colors.white};
    border-radius: 4px;
    overflow: hidden;
  }

  .ant-table-thead > tr > th {
    border-bottom: none;
    background: ${(props) => props.theme.colors.cardBG};
    color: ${(props) => props.theme.colors.white};
    font-weight: 600;
  }

  .ant-table-tbody > tr.ant-table-row {
    &:hover > td {
      background-color: ${(props) => props.theme.colors.black};
    }
  }

  .ant-table-tbody > tr > td {
    border-bottom: none;
    cursor: pointer;
  }
`;

const ButtonSpin = styled.div`
  margin: 0;
  height: 45px;
  display: grid;
  place-items: center;
`;

const MoreButton = styled(Button)``;
interface ActionTextProps {
  in: boolean;
}

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

const ActionText = styled.div<ActionTextProps>`
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => (props.in ? `#0EE9A7` : `#FF4747`)};
`;

const columns: any = [
  {
    title: 'Icon',
    dataIndex: 'txType',
    key: 'txType',
    render: (txType: string) => <div>{txType === 'in' ? <img src="/txIn.svg" /> : <img src="/txOut.svg" />}</div>,
  },
  {
    title: 'Date',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: (text: any) => <div>{format(fromUnixTime(text), 'MMM dd, yyyy')}</div>,
  },
  {
    title: 'Action',
    dataIndex: 'txType',
    key: 'txType',
    render: (txType: string) => (
      <div>{txType === 'in' ? <ActionText in>RECEIVED</ActionText> : <ActionText in={false}>SEND</ActionText>}</div>
    ),
  },
  {
    title: 'Address',
    dataIndex: 'destAddress',
    key: 'destAddress',
    render: (text: string) => (
      <a target="_blank" href={`https://explorer.solana.com/address/${text}`}>
        {text}
      </a>
    ),
  },
  {
    title: 'Amount',
    dataIndex: ['amount', 'tokenSymbol'],
    key: 'amount',
    render: (text: string, row: any) => (
      <a>
        {row['amount']} {row['tokenSymbol']}
      </a>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'txType',
    key: 'txType',
    render: (txType: string) => (
      <div>{txType === 'in' ? <ActionText in>RECEIVED</ActionText> : <ActionText in={false}>SEND</ActionText>}</div>
    ),
  },
];

export default function TransactionsTable() {
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
    <TableWrapper>
      <Table
        onRow={(record) => ({
          onClick: () => {
            window.open(`https://explorer.solana.com/tx/${record.signature}`, '_blank');
          },
        })}
        scroll={{ x: '100%' }}
        columns={columns}
        dataSource={localTransactions}
        pagination={false}
      />
      <div style={{ marginTop: 50 }}>
        {transactions && transactionsLoading ? (
          <ButtonSpin>
            <Spin />
          </ButtonSpin>
        ) : (
          ''
        )}
      </div>
    </TableWrapper>
  );
}
