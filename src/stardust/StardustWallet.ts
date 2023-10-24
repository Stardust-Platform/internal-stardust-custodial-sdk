/* eslint-disable no-unused-vars */
import EthersSigner from '../signers/EthersSigner';
import StardustKeyPair from './KeyPair/AbstractStardustKeyPair';

type StardustKeyPairs = {
  [key: string]: StardustKeyPair;
};

export default class StardustWallet {
  public signers: { ethers: EthersSigner };

  public sui: StardustKeyPairs;

  constructor(
    public readonly id: string,
    public readonly apiKey: string,
    public readonly createdAt: Date,
    public readonly lastUsedAt: Date | null = null
  ) {
    this.signers = {
      ethers: new EthersSigner(this),
    };

    this.sui = {
      ed25519: new StardustKeyPair(id, apiKey, 'ed25519'),
      secp256k1: new StardustKeyPair(id, apiKey, 'secp256k1'),
      secp256r1: new StardustKeyPair(id, apiKey, 'secp256r1'),
    };
  }
}
