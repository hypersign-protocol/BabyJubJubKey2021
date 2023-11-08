import { LDKeyPair } from "crypto-ld";
import { PrivateKey, PublicKey, Signature } from "@iden3/js-crypto";
declare class BabyJubJubKeys2021 extends LDKeyPair {
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
    });
    convertMultiBase(key: string): string;
    static generate(options?: {
        id?: string;
        controller?: string;
    }): Promise<BabyJubJubKeys2021>;
    static multibaseToKey(key: string): Uint8Array;
    static fromKeys(options: {
        publicKeyMultibase: string;
        privateKeyMultibase?: string;
        options?: {
            id: any;
            controller: any;
        };
    }): BabyJubJubKeys2021;
    static from(mnemonic: string, options?: {
        id?: any;
        controller?: any;
    }): Promise<BabyJubJubKeys2021>;
    fingerprint(): string | undefined;
    verifyFingerprint(options: {
        fingerprint: string;
    }): boolean;
    signer(): {
        sign(options: {
            data: bigint;
        }): Promise<Signature>;
        id: any;
    };
    verifier(): {
        verify(options: {
            data: bigint;
            signature: Signature;
        }): Promise<boolean>;
        id: any;
    };
}
export { BabyJubJubKeys2021 };
//# sourceMappingURL=BJJKey2021.d.ts.map