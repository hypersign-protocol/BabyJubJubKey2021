import { BabyJubJubKeys2021 } from "../src/index";
import { BabyJub, PublicKey } from "@iden3/js-crypto";

describe("BJJ Test", () => {
  it("Should be able to generate KeyPair Ranomly", async () => {
    const kp = await BabyJubJubKeys2021.generate();
    expect(kp.publicKey).toBeDefined();
    expect(kp.privateKey).toBeDefined();
    expect(kp.privateKeyMultibase).toBeDefined();
    expect(kp.publicKeyMultibase).toBeDefined();
    expect(kp.type).toEqual("BabyJubJubKey2021");
  });

  it("Should be able to generate KeyPair From mnemonic", async () => {
    const kp = await BabyJubJubKeys2021.from(
      "liberty taste budget never right tent whip menu fog shine angle habit view between art perfect razor burger fence found scatter bounce laptop cruise"
    );
    expect(kp.publicKey).toBeDefined();
    expect(kp.privateKey).toBeDefined();
    expect(kp.privateKeyMultibase).toBeDefined();
    expect(kp.publicKeyMultibase).toBeDefined();
    expect(kp.type).toEqual("BabyJubJubKey2021");
    expect(kp.publicKeyMultibase).toBe(
      "z543717GD36C5VSajKzLALZzcTakhmme2LgC1ywW1YwTM"
    );
    expect(kp.privateKeyMultibase).toBe(
      "z9gVrHQcBrGmCJ9YsdbLchc9KuEDjZnhHJ1acbJN7WRMJ"
    );
  });
});
