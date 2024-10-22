import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Metaplex, keypairIdentity, toMetaplexFile, bundlrStorage} from "@metaplex-foundation/js";
import fs from 'fs'

export async function uploadImage(metaplex: Metaplex, data: any){
    const imgBuffer = fs.readFileSync(data.imgPath);

    const imgMetaplexFile = toMetaplexFile(imgBuffer, data.imgPath);

    const imgUri = await metaplex.storage().upload(imgMetaplexFile);

    console.log("Image URI:", imgUri);

    const { uri } = await metaplex.nfts().uploadMetadata({
        name: data.name,
        symbol: data.symbol,
        description: data.description,
        image: imgUri
    })

    console.log("Metadata URI:", uri);
    return imgUri
}
