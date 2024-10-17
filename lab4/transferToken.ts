import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

export function loadWalletKey(keypairFile:string): Keypair {
    const fs = require("fs");
    const loaded = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
    return loaded;
}


async function createToken(){
    const solanaConnection = new Connection("https://devnet.helius-rpc.com/?api-key=c3f33946-3012-4d3d-bd1e-b8f2da31a29e", "confirmed")

    const devWallet = loadWalletKey("secret.json")
    
    //console.log('devWallet', devWallet.publicKey.toString())

    const tokenMintAddress = new PublicKey('3tmfJs1t6bsWqtfrvtb5W72DH91z8chdXbzeGE1qBbD8')
    const destPublicKey = new PublicKey("Stef5nMVQmKg1XGKD4bsb5tXue2QKFaxkC2MXybdnre")

    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        solanaConnection,
        devWallet,
        tokenMintAddress,
        devWallet.publicKey
    )

    const destTokenAccount = await getOrCreateAssociatedTokenAccount(
        solanaConnection,
        devWallet,
        tokenMintAddress,
        destPublicKey
    )

    await transfer(
        solanaConnection,
        devWallet,
        fromTokenAccount.address,
        destTokenAccount.address,
        devWallet.publicKey,
        2 * (10 ** 6)
    )
}

createToken()

