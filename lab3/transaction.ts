
import 'dotenv/config'
import secret from './secret.json'
import { Transaction, SystemProgram, sendAndConfirmTransaction, Connection, PublicKey, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount, createTransferInstruction } from '@solana/spl-token';

async function createTransaction(){
    const solanaConnection = new Connection("https://devnet.helius-rpc.com/?api-key=c3f33946-3012-4d3d-bd1e-b8f2da31a29e", "confirmed")

    const walletPublicKey = new PublicKey("Stef5nMVQmKg1XGKD4bsb5tXue2QKFaxkC2MXybdnre");
    const devWallet = Keypair.fromSecretKey(new Uint8Array(secret)); 
    console.log(devWallet.publicKey.toBase58())
    const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: devWallet.publicKey,
          toPubkey: walletPublicKey,
          lamports: 0.002 * LAMPORTS_PER_SOL,
        })
      );
      const solFeeSignature =await sendAndConfirmTransaction(solanaConnection, transaction, [devWallet]);
    
      if (!solFeeSignature) {
        console.error("SOL fee transfer failed");
      }
      console.log(solFeeSignature);
}

createTransaction()


