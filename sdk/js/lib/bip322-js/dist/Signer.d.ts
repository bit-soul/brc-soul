/// <reference types="node" />
import * as bitcoin from 'bitcoinjs-lib';
/**
 * Class that signs BIP-322 signature using a private key.
 * Reference: https://github.com/LegReq/bip0322-signatures/blob/master/BIP0322_signing.ipynb
 */
declare class Signer {
    /**
     * Sign a BIP-322 signature from P2WPKH, P2SH-P2WPKH, and single-key-spend P2TR address and its corresponding private key.
     * @param privateKey Private key used to sign the message
     * @param address Address to be signing the message
     * @param message message_challenge to be signed by the address
     * @param network Network that the address is located, defaults to the Bitcoin mainnet
     * @returns BIP-322 simple signature, encoded in base-64
     */
    static sign(privateKey: string, address: string, message: string, network?: bitcoin.Network): string | Buffer;
    /**
     * Check if a given public key is the public key for a claimed address.
     * @param publicKey Public key to be tested
     * @param claimedAddress Address claimed to be derived based on the provided public key
     * @returns True if the claimedAddress can be derived by the provided publicKey, false if otherwise
     */
    private static checkPubKeyCorrespondToAddress;
}
export default Signer;
