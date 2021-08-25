import Wallet from '@project-serum/sol-wallet-adapter';

export function SolletExtensionAdapter(_: any, network: any) {
  const sollet = (window as any).sollet;
  if (sollet) {
    return new Wallet(sollet, network);
  }

  return {
    on: () => {},
    connect: () => {
      alert('Sollet Extension Error, Please install Sollet Extension for Chrome');
    },
  };
}
