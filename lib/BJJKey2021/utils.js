"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMnemonic = exports.generateKeyPairFromMnemonic = void 0;
const js_crypto_1 = require("@iden3/js-crypto");
const bip39 = require("bip39");
const crypto = require("crypto");
const { Hex } = require("@iden3/js-crypto");
const generateMnemonic = (size) => {
    if (size == 128 || size == 256) {
        return bip39.generateMnemonic(size, crypto.randomBytes);
    }
    else {
        throw new Error("Invalide length for mnemonic");
    }
};
exports.generateMnemonic = generateMnemonic;
const generateFromMnemonic = (mnemonic) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bip39.mnemonicToEntropy(mnemonic);
});
const generateKeyPairFromMnemonic = (mnemonic) => __awaiter(void 0, void 0, void 0, function* () {
    const seed = yield generateFromMnemonic(mnemonic);
    const privateKey = new js_crypto_1.PrivateKey(Buffer.from(seed, "hex"));
    const publicKey = js_crypto_1.PublicKey.newFromHex(privateKey.public().hex());
    return { publicKey, privateKey };
});
exports.generateKeyPairFromMnemonic = generateKeyPairFromMnemonic;
//# sourceMappingURL=utils.js.map