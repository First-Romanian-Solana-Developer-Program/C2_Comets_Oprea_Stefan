import "dotenv/config"
import { Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction } from "@solana/web3.js"
import { airdropIfRequired } from "@solana-developers/helpers"

async function getFaucet(){

  const connection = new Connection("https://devnet.helius-rpc.com/?api-key=c3f33946-3012-4d3d-bd1e-b8f2da31a29e", "confirmed")
  console.log('Connected to', connection.rpcEndpoint)

  const publicKey = new PublicKey("Stef5nMVQmKg1XGKD4bsb5tXue2QKFaxkC2MXybdnre")

  let balance = await connection.getBalance(publicKey)

  console.log('Balance before aidrop:', balance / LAMPORTS_PER_SOL)

  await airdropIfRequired(connection, publicKey,1 * LAMPORTS_PER_SOL, 4 * LAMPORTS_PER_SOL)

  let balance2 = await connection.getBalance(publicKey)

  console.log('Balance after balance:', balance2 / LAMPORTS_PER_SOL)

}

getFaucet()