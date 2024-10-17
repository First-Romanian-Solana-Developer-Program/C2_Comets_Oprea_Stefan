import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
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
    const DECIMALS = 6
    // const tokenMint = await createMint(
    //     solanaConnection,
    //     devWallet,
    //     devWallet.publicKey,
    //     null,
    //     DECIMALS
    // )
    // console.log('https://explorer.solana.com/address/' + tokenMint.toBase58() + '?cluster=devnet')

    const tokenMintAddress = new PublicKey('3tmfJs1t6bsWqtfrvtb5W72DH91z8chdXbzeGE1qBbD8')
    const destPublicKey = new PublicKey("LAB2ikQZKDxTHpzMpiSL9JVEt68kavxG6NuX9PQ2ah2")

    // const destTokenAccount = await getOrCreateAssociatedTokenAccount(
    //     solanaConnection,
    //     devWallet,
    //     tokenMintAddress,
    //     destPublicKey
    // )

    const destTokenAccount = new PublicKey("C6uoWe1epZqqBt26f3NvGGhpS1HCrWb4jfTw7tL3V1Q")

    const signiture = await mintTo(
        solanaConnection,
        devWallet,
        tokenMintAddress,
        destTokenAccount,
        devWallet.publicKey,
        10 * (10 ** DECIMALS)
    )

    console.log('https://explorer.solana.com/address/' + signiture + '?cluster=devnet')


    // spl-token create-account CA
    // spl-token min CA #

}

createToken()

