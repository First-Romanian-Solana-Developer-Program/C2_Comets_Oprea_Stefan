import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, toMetaplexFile, bundlrStorage} from "@metaplex-foundation/js";
import fs from 'fs'
import { uploadImage } from "./uploadMetadata";
import { createNft } from "./createNFT";

export function loadWalletKey(keypairFile:string): Keypair {
    const loaded = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
    return loaded;
}

const nftData = {
    name: "rug time",
    symbol: "RUG",
    description: "Rug time random test nft",
    imgPath: "image.png",
}
        

async function createNFT() : Promise<void> {
    const SOLANA_CONNECTION = new Connection("https://api.devnet.solana.com", "confirmed");
    const devWallet = loadWalletKey("secret.json")

    const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
    .use(keypairIdentity(devWallet))
    .use(bundlrStorage())
    
    const uri = await uploadImage(METAPLEX, nftData)
    console.log('Image URI: ', uri)
    await createNft(METAPLEX, uri, nftData)
    console.log("NFT created")
}

createNFT().then((): void => {
    console.log("NFT created");
})