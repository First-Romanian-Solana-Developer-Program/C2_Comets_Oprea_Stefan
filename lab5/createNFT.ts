import { Metaplex } from "@metaplex-foundation/js";

export async function createNft(metaplex: Metaplex, uri: string, nftData: any): Promise<void> {

    const { nft } = await metaplex.nfts().create({
        uri: uri,
        name: nftData.name,
        sellerFeeBasisPoints: 500,
        symbol: nftData.symbol,
        isCollection: false,
    }, {commitment: "finalized"});

    console.log("NFT created: https://explorer.solana.com/address", nft.address.toString(),'?cluster=devnet');
}