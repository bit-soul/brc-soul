"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
const BIP322_1 = __importDefault(require("./BIP322"));
const ecpair_1 = __importDefault(require("ecpair"));
const helpers_1 = require("./helpers");
const bitcoin = __importStar(require("bitcoinjs-lib"));
const secp256k1_1 = __importDefault(require("@bitcoinerlab/secp256k1"));
const bitcoinMessage = __importStar(require("bitcoinjs-message"));
/**
 * Class that signs BIP-322 signature using a private key.
 * Reference: https://github.com/LegReq/bip0322-signatures/blob/master/BIP0322_signing.ipynb
 */
class Signer {
    /**
     * Sign a BIP-322 signature from P2WPKH, P2SH-P2WPKH, and single-key-spend P2TR address and its corresponding private key.
     * @param privateKey Private key used to sign the message
     * @param address Address to be signing the message
     * @param message message_challenge to be signed by the address
     * @param network Network that the address is located, defaults to the Bitcoin mainnet
     * @returns BIP-322 simple signature, encoded in base-64
     */
    static sign(privateKey, address, message, network = bitcoin.networks.bitcoin) {
        // Initialize private key used to sign the transaction
        const ECPair = (0, ecpair_1.default)(secp256k1_1.default);
        let signer = ECPair.fromWIF(privateKey, network);
        // Check if the private key can sign message for the given address
        if (!this.checkPubKeyCorrespondToAddress(signer.publicKey, address)) {
            throw new Error(`Invalid private key provided for signing message for ${address}.`);
        }
        // Handle legacy P2PKH signature
        if (helpers_1.Address.isP2PKH(address)) {
            // For P2PKH address, sign a legacy signature
            // Reference: https://github.com/bitcoinjs/bitcoinjs-message/blob/c43430f4c03c292c719e7801e425d887cbdf7464/README.md?plain=1#L21
            return bitcoinMessage.sign(message, signer.privateKey, signer.compressed);
        }
        // Convert address into corresponding script pubkey
        const scriptPubKey = helpers_1.Address.convertAdressToScriptPubkey(address);
        // Draft corresponding toSpend using the message and script pubkey
        const toSpendTx = BIP322_1.default.buildToSpendTx(message, scriptPubKey);
        // Draft corresponding toSign transaction based on the address type
        let toSignTx;
        if (helpers_1.Address.isP2SH(address)) {
            // P2SH-P2WPKH signing path
            // Derive the P2SH-P2WPKH redeemScript from the corresponding hashed public key
            const redeemScript = bitcoin.payments.p2wpkh({
                hash: bitcoin.crypto.hash160(signer.publicKey),
                network: network
            }).output;
            toSignTx = BIP322_1.default.buildToSignTx(toSpendTx.getId(), redeemScript, true);
        }
        else if (helpers_1.Address.isP2WPKH(address)) {
            // P2WPKH signing path
            toSignTx = BIP322_1.default.buildToSignTx(toSpendTx.getId(), scriptPubKey);
        }
        else {
            // P2TR signing path
            // Extract the taproot internal public key
            const internalPublicKey = signer.publicKey.subarray(1, 33);
            // Tweak the private key for signing, since the output and address uses tweaked key
            // Reference: https://github.com/bitcoinjs/bitcoinjs-lib/blob/1a9119b53bcea4b83a6aa8b948f0e6370209b1b4/test/integration/taproot.spec.ts#L55
            signer = signer.tweak(bitcoin.crypto.taggedHash('TapTweak', signer.publicKey.subarray(1, 33)));
            // Draft a toSign transaction that spends toSpend transaction
            toSignTx = BIP322_1.default.buildToSignTx(toSpendTx.getId(), scriptPubKey, false, internalPublicKey);
            // Set the sighashType to bitcoin.Transaction.SIGHASH_ALL since it defaults to SIGHASH_DEFAULT
            toSignTx.updateInput(0, {
                sighashType: bitcoin.Transaction.SIGHASH_ALL
            });
        }
        // Sign the toSign transaction
        const toSignTxSigned = toSignTx.signAllInputs(signer, [bitcoin.Transaction.SIGHASH_ALL]).finalizeAllInputs();
        // Extract and return the signature
        return BIP322_1.default.encodeWitness(toSignTxSigned);
    }
    /**
     * Check if a given public key is the public key for a claimed address.
     * @param publicKey Public key to be tested
     * @param claimedAddress Address claimed to be derived based on the provided public key
     * @returns True if the claimedAddress can be derived by the provided publicKey, false if otherwise
     */
    static checkPubKeyCorrespondToAddress(publicKey, claimedAddress) {
        // Derive the same address type from the provided public key
        let derivedAddresses;
        if (helpers_1.Address.isP2PKH(claimedAddress)) {
            derivedAddresses = helpers_1.Address.convertPubKeyIntoAddress(publicKey, 'p2pkh');
        }
        else if (helpers_1.Address.isP2SH(claimedAddress)) {
            derivedAddresses = helpers_1.Address.convertPubKeyIntoAddress(publicKey, 'p2sh-p2wpkh');
        }
        else if (helpers_1.Address.isP2WPKH(claimedAddress)) {
            derivedAddresses = helpers_1.Address.convertPubKeyIntoAddress(publicKey, 'p2wpkh');
        }
        else if (helpers_1.Address.isP2TR(claimedAddress)) {
            derivedAddresses = helpers_1.Address.convertPubKeyIntoAddress(publicKey, 'p2tr');
        }
        else {
            throw new Error('Unable to sign BIP-322 message for unsupported address type.'); // Unsupported address type
        }
        // Check if the derived address correspond to the claimedAddress
        return (derivedAddresses.mainnet === claimedAddress) || (derivedAddresses.testnet === claimedAddress);
    }
}
exports.default = Signer;
//# sourceMappingURL=Signer.js.map