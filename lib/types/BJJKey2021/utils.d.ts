import { PrivateKey, PublicKey } from "@iden3/js-crypto";
declare const generateMnemonic: (size: number) => any;
declare const generateKeyPairFromMnemonic: (mnemonic: string) => Promise<{
    publicKey: PublicKey;
    privateKey: PrivateKey;
}>;
export { generateKeyPairFromMnemonic, generateMnemonic };
//# sourceMappingURL=utils.d.ts.map