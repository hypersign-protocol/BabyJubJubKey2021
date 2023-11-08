import { PrivateKey, PublicKey } from "@iden3/js-crypto";

const bip39 = require("bip39");
const crypto = require("crypto");

const { Hex } = require("@iden3/js-crypto");

const generateMnemonic = (size: number) => {
  if (size == 128 || size == 256) {
    return bip39.generateMnemonic(size, crypto.randomBytes);
  } else {
    throw new Error("Invalide length for mnemonic");
  }
};

const generateFromMnemonic = async (mnemonic: string) => {
  return await bip39.mnemonicToEntropy(mnemonic);
};

const generateKeyPairFromMnemonic = async (
  mnemonic: string
): Promise<{ publicKey: PublicKey; privateKey: PrivateKey }> => {
  const seed = await generateFromMnemonic(mnemonic);

  const privateKey = new PrivateKey(Buffer.from(seed, "hex"));
  const publicKey = PublicKey.newFromHex(privateKey.public().hex());

  return { publicKey, privateKey };
};

export { generateKeyPairFromMnemonic,generateMnemonic };
