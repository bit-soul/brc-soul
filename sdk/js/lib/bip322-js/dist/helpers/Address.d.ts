/// <reference types="node" />
/**
 * Class that implement address-related utility functions.
 */
declare class Address {
    /**
     * Check if a given Bitcoin address is a pay-to-public-key-hash (p2pkh) address.
     * @param address Bitcoin address to be checked
     * @returns True if the provided address correspond to a valid P2PKH address, false if otherwise
     */
    static isP2PKH(address: string): boolean;
    /**
     * Check if a given Bitcoin address is a pay-to-script-hash (P2SH) address.
     * @param address Bitcoin address to be checked
     * @returns True if the provided address correspond to a valid P2SH address, false if otherwise
     */
    static isP2SH(address: string): boolean;
    /**
     * Check if a given Bitcoin address is a pay-to-witness-public-key-hash (P2WPKH) address.
     * @param address Bitcoin address to be checked
     * @returns True if the provided address correspond to a valid P2WPKH address, false if otherwise
     */
    static isP2WPKH(address: string): boolean;
    /**
     * Check if a given Bitcoin address is a taproot address.
     * @param address Bitcoin address to be checked
     * @returns True if the provided address is a taproot address, false if otherwise
     */
    static isP2TR(address: string): boolean;
    /**
     * Check if a given witness stack corresponds to a P2WPKH address.
     * @param witness Witness data associated with the toSign BIP-322 transaction
     * @returns True if the provided witness stack correspond to a valid P2WPKH address, false if otherwise
     */
    static isP2WPKHWitness(witness: Buffer[]): boolean;
    /**
     * Check if a given witness stack corresponds to a single-key-spend P2TR address.
     * @param witness Witness data associated with the toSign BIP-322 transaction
     * @returns True if the provided address and witness stack correspond to a valid single-key-spend P2TR address, false if otherwise
     */
    static isSingleKeyP2TRWitness(witness: Buffer[]): boolean;
    /**
     * Convert a given Bitcoin address into its corresponding script public key.
     * Reference: https://github.com/buidl-bitcoin/buidl-python/blob/d79e9808e8ca60975d315be41293cb40d968626d/buidl/script.py#L607
     * @param address Bitcoin address
     * @returns Script public key of the given Bitcoin address
     * @throws Error when the provided address is not a valid Bitcoin address
     */
    static convertAdressToScriptPubkey(address: string): Buffer;
    /**
     * Convert a given public key into a corresponding Bitcoin address.
     * @param publicKey Public key for deriving the address, or internal public key for deriving taproot address
     * @param addressType Bitcoin address type to be derived, must be either 'p2pkh', 'p2sh-p2wpkh', 'p2wpkh', or 'p2tr'
     * @returns Bitcoin address that correspond to the given public key in both mainnet and testnet
     */
    static convertPubKeyIntoAddress(publicKey: Buffer, addressType: 'p2pkh' | 'p2sh-p2wpkh' | 'p2wpkh' | 'p2tr'): {
        mainnet: string;
        testnet: string;
    };
    /**
     * Validates a given Bitcoin address.
     * This method checks if the provided Bitcoin address is valid by attempting to decode it
     * for different Bitcoin networks: mainnet, testnet, and regtest. The method uses the
     * bitcoinjs-lib's address module for decoding.
     *
     * The process is as follows:
     * 1. Attempt to decode the address for the Bitcoin mainnet. If decoding succeeds,
     *    the method returns true, indicating the address is valid for mainnet.
     * 2. If the first step fails, catch the resulting error and attempt to decode the
     *    address for the Bitcoin testnet. If decoding succeeds, the method returns true,
     *    indicating the address is valid for testnet.
     * 3. If the second step fails, catch the resulting error and attempt to decode the
     *    address for the Bitcoin regtest network. If decoding succeeds, the method returns
     *    true, indicating the address is valid for regtest.
     * 4. If all attempts fail, the method returns false, indicating the address is not valid
     *    for any of the checked networks.
     *
     * @param address The Bitcoin address to validate.
     * @return boolean Returns true if the address is valid for any of the Bitcoin networks,
     *                 otherwise returns false.
     */
    static isValidBitcoinAddress(address: string): boolean;
    /**
     * Compresses an uncompressed public key using the elliptic curve secp256k1.
     * This method takes a public key in its uncompressed form and returns a compressed
     * representation of the public key. Elliptic curve public keys can be represented in
     * a shorter form known as compressed format which saves space and still retains the
     * full public key's capabilities. The method uses the elliptic library to convert the
     * uncompressed public key into its compressed form.
     *
     * The steps involved in the process are:
     * 1. Initialize a new elliptic curve instance for the secp256k1 curve.
     * 2. Create a key pair object from the uncompressed public key buffer.
     * 3. Extract the compressed public key from the key pair object.
     * 4. Return the compressed public key as a Buffer object.
     *
     * @param uncompressedPublicKey A Buffer containing the uncompressed public key.
     * @return Buffer Returns a Buffer containing the compressed public key.
     * @throws Error Throws an error if the provided public key cannot be compressed,
     *         typically indicating that the key is not valid.
     */
    static compressPublicKey(uncompressedPublicKey: Buffer): Buffer;
    /**
     * Uncompresses a given public key using the elliptic curve secp256k1.
     * This method accepts a compressed public key and attempts to convert it into its
     * uncompressed form. Public keys are often compressed to save space, but certain
     * operations require the full uncompressed key. This method uses the elliptic
     * library to perform the conversion.
     *
     * The function operates as follows:
     * 1. Initialize a new elliptic curve instance using secp256k1.
     * 2. Attempt to create a key pair from the compressed public key buffer.
     * 3. Extract the uncompressed public key from the key pair object.
     * 4. Return the uncompressed public key as a Buffer object.
     * If the compressed public key provided is invalid and cannot be uncompressed,
     * the method will throw an error with a descriptive message.
     *
     * @param compressedPublicKey A Buffer containing the compressed public key.
     * @return Buffer The uncompressed public key as a Buffer.
     * @throws Error Throws an error if the provided public key cannot be uncompressed,
     *         typically indicating that the key is not valid.
     */
    static uncompressPublicKey(compressedPublicKey: Buffer): Buffer;
}
export default Address;
