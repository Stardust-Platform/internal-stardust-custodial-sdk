import AbstractStardustAPI from './AbstractStardustAPI';
import StardustWallet from './StardustWallet';

export default class StardustWalletAPI extends AbstractStardustAPI {
  constructor(apiKey: string) {
    super(apiKey);
  }

  async create(): Promise<StardustWallet> {
    const walletData = await this.apiPost('wallet');
    return new StardustWallet(
      walletData.id,
      new Date(walletData.created_at),
      walletData.last_used_at ? new Date(walletData.last_used_at) : null
    );
  }

  async get(walletId: string): Promise<StardustWallet> {
    const walletData = await this.apiGet(`wallet/${walletId}`);
    return new StardustWallet(
      walletId,
      new Date(walletData.created_at),
      walletData.last_used_at ? new Date(walletData.last_used_at) : null
    );
  }
}
