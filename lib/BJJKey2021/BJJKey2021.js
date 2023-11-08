"use strict";
// @ts-ignore
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BabyJubJubKeys2021 = void 0;
const crypto_ld_1 = require("crypto-ld");
const js_crypto_1 = require("@iden3/js-crypto");
const utils_1 = require("./utils");
const multibase_1 = __importDefault(require("multibase"));
const SUITE_ID = "BabyJubJubKey2021";
class BabyJubJubKeys2021 extends crypto_ld_1.LDKeyPair {
    constructor(options) {
        super(Object.assign({}, options));
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
    convertMultiBase(key) {
        const buffer = Buffer.from(key, "hex");
        const multibaseConverted = multibase_1.default.encode("base58btc", buffer);
        return Buffer.from(multibaseConverted).toString();
    }
    static generate(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const mnemonic = yield (0, utils_1.generateMnemonic)(256);
            return this.from(mnemonic, options);
        });
    }
    static multibaseToKey(key) {
        return multibase_1.default.decode(key);
    }
    static fromKeys(options) {
        if (!options.publicKeyMultibase) {
            throw new Error("publicKeyMultibase is required");
        }
        const { publicKeyMultibase, privateKeyMultibase } = options;
        const publicKey = Buffer.from(this.multibaseToKey(publicKeyMultibase)).toString("hex");
        let privateKeyT;
        if (privateKeyMultibase) {
            privateKeyT = this.multibaseToKey(privateKeyMultibase);
            return new BabyJubJubKeys2021({
                publicKey: js_crypto_1.PublicKey.newFromHex(publicKey),
                privateKey: new js_crypto_1.PrivateKey(Buffer.from(privateKeyT)),
            });
        }
    }
    static from(mnemonic, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mnemonic) {
                throw new Error("mnnemonic is required");
            }
            const keys = yield (0, utils_1.generateKeyPairFromMnemonic)(mnemonic);
            return new BabyJubJubKeys2021(Object.assign(Object.assign(Object.assign({}, keys), { mnemonic }), options));
        });
    }
    fingerprint() {
        return this.publicKeyMultibase;
    }
    verifyFingerprint(options) {
        return this.publicKeyMultibase === options.fingerprint;
    }
    signer() {
        const privateKey = this.privateKey;
        return {
            sign(options) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!privateKey) {
                        throw Error("Private key is not available for signing");
                    }
                    const signature = privateKey.signPoseidon(options.data);
                    return signature;
                });
            },
            id: this.id,
        };
    }
    verifier() {
        const publicKey = this.publicKey;
        return {
            verify(options) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!publicKey) {
                        throw Error("Private key is not available for signing");
                    }
                    const verified = publicKey.verifyPoseidon(options.data, options.signature);
                    return verified;
                });
            },
            id: this.id,
        };
    }
}
exports.BabyJubJubKeys2021 = BabyJubJubKeys2021;
//# sourceMappingURL=BJJKey2021.js.map