import { EventEmitter, Injectable } from '@angular/core';
import Onboard, {
  InitOptions,
  OnboardAPI,
  WalletState,
} from '@web3-onboard/core';
import walletConnect from '@web3-onboard/walletconnect';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  connectedEvent: EventEmitter<null>;
  disconnectedEvent: EventEmitter<null>;
  chainChangedEvent: EventEmitter<number>;
  accountChangedEvent: EventEmitter<string>;
  txConfirmedEvent: EventEmitter<null>;

  assistInstance: OnboardAPI | undefined;
  state: any;
  networkID = 1;
  connectedWallets: WalletState[] = [];

  constructor() {
    this.connectedEvent = new EventEmitter<null>();
    this.disconnectedEvent = new EventEmitter<null>();
    this.chainChangedEvent = new EventEmitter<number>();
    this.accountChangedEvent = new EventEmitter<string>();
    this.txConfirmedEvent = new EventEmitter<null>();

    this.networkID = 1;
    this.state = {
      address: null,
      wallet: {
        provider: null,
      },
    };
  }

  async connect(
    onConnected: () => void,
    onError: () => void,
    isStartupMode: boolean
  ) {
    //const injected = injectedModule();
    const bncAssistConfig: InitOptions = {
      wallets: [walletConnect()],
      chains: [
        {
          id: '1',
          token: 'ETH',
          label: 'mainnet',
          rpcUrl:
            'https://eth-mainnet.g.alchemy.com/v2/PJG1MyfrI9qb_JdOJJVSa5stBo5O7uyU', // Not a secret, just for RPC usage, can always swap out or disable later
        },
      ],
      appMetadata: {
        name: 'Web3 wallet',
        icon: '',
        description: 'Please select a wallet to connect.',
      },
    };

    const _onConnected = () => {
      this.connectedEvent.emit();
      //_checkChainId();
      onConnected();
    };
    const _onError = () => {
      this.disconnectedEvent.emit();
      onError();
    };
  }
}
