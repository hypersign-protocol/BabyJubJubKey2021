// @ts-ignore

import { LDKeyPair } from "crypto-ld";
import { Merklizer, PoseidonHasher } from "@iden3/js-jsonld-merklization";
import {
  PrivateKey,
  PublicKey,
  Eddsa,
  Hash,
  Poseidon,
  poseidon,
  Signature,
} from "@iden3/js-crypto";
import { generateKeyPairFromMnemonic, generateMnemonic } from "./utils";
import multibase from "multibase";

const SUITE_ID = "BabyJubJubKey2021";

class BabyJubJubKeys2021 extends LDKeyPair {
  type: string;

  publicKeyMultibase: string | undefined;
  privateKeyMultibase: string | undefined;
  controller: string | undefined;
  id: any;
  privateKey: PrivateKey | undefined;
  publicKey: PublicKey;
  mnemonic: string | undefined;
  constructor(options: {
    id?: any;
    controller?: any;
    revoked?: any;
    publicKeyMultibase?: string;
    privateKeyMultibase?: string;
    privateKey?: PrivateKey;
    publicKey: PublicKey;
    mnemonic?: string;
  }) {
    super({
      ...options,
    });
    this.id = options.id;
    this.controller = options.controller;

    this.type = SUITE_ID;
    this.mnemonic = options.mnemonic;
    const { publicKeyMultibase, privateKeyMultibase } = options;
    const { privateKey, publicKey } = options;
    if (!publicKey) {
      throw new Error("publicKey required");
    }

    this.privateKey = privateKey;
    this.publicKey = publicKey;

    // assign valid key values
    this.publicKeyMultibase = this.convertMultiBase(publicKey.hex());
    this.privateKeyMultibase = privateKey
      ? this.convertMultiBase(privateKey.hex())
      : "";

    if (this.controller && !this.id) {
      this.id = `${this.controller}#${this.fingerprint()}`;
    }
  }

  convertMultiBase(key: string) {
    const buffer = Buffer.from(key, "hex");
    const multibaseConverted = multibase.encode("base58btc", buffer);
    return Buffer.from(multibaseConverted).toString();
  }

  static async generate(options?: {
    id?: string;
    controller?: string;
    publicKeyMultibase?: string;
  }): Promise<BabyJubJubKeys2021> {
    const mnemonic = await generateMnemonic(256);
    return this.from(mnemonic, options);
  }

  static multibaseToKey(key: string) {
    return multibase.decode(key);
  }
  static fromKeys(options: {
    publicKeyMultibase: string;
    privateKeyMultibase?: string;
  }) {
    if (!options.publicKeyMultibase) {
      throw new Error("publicKeyMultibase is required");
    }
    const { publicKeyMultibase, privateKeyMultibase } = options;
    const publicKey = Buffer.from(
      this.multibaseToKey(publicKeyMultibase)
    ).toString("hex");
    let privateKeyT;
    if (privateKeyMultibase) {
      privateKeyT = this.multibaseToKey(privateKeyMultibase);

      return new BabyJubJubKeys2021({
        publicKey: PublicKey.newFromHex(publicKey),
        privateKey: new PrivateKey(Buffer.from(privateKeyT)),
      });
    }
  }
  static async from(
    mnemonic: string,
    options?: {
      id?: any;
      controller?: any;
      publicKeyMultibase?: string;
    }
  ): Promise<BabyJubJubKeys2021> {
    if (!mnemonic) {
      throw new Error("mnnemonic is required");
    }
    const keys = await generateKeyPairFromMnemonic(mnemonic);

    return new BabyJubJubKeys2021({
      ...keys,
      mnemonic,
      ...options,
    });
  }

  fingerprint() {
    return this.publicKeyMultibase;
  }

  verifyFingerprint(options: { fingerprint: string }) {
    return this.publicKeyMultibase === options.fingerprint;
  }

  signer() {
    const privateKey = this.privateKey;
    return {
      async sign(options: { data: bigint }): Promise<Signature> {
        if (!privateKey) {
          throw Error("Private key is not available for signing");
        }
        const signature = privateKey.signPoseidon(options.data);
        return signature;
      },
      id: this.id,
    };
  }

  verifier() {
    const publicKey = this.publicKey;
    return {
      async verify(options: { data: bigint; signature: Signature }) {
        if (!publicKey) {
          throw Error("Private key is not available for signing");
        }
        const verified = publicKey.verifyPoseidon(
          options.data,
          options.signature
        );
        return verified;
      },
      id: this.id,
    };
  }
}

export { BabyJubJubKeys2021 };
