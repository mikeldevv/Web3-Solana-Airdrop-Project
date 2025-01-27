const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
  } = require("@solana/web3.js");

// Generate a new wallet
const wallet = new Keypair();

const publicKey = wallet.publicKey;
const secretKey = wallet.secretKey;

const getWalletBalance = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const walletBalance = await connection.getBalance(publicKey);
      console.log(`Wallet Balance: ${walletBalance / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
      console.error("Error fetching wallet balance:", err);
    }
  };

  const airDropSol = async () => {
    try {
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  
      // Request an airdrop of 2 SOL
      const fromAirDropSignature = await connection.requestAirdrop(
        publicKey,
        2 * LAMPORTS_PER_SOL
      );
  
      // Get the latest blockhash
      const latestBlockHash = await connection.getLatestBlockhash();
  
      // Confirm the transaction
      await connection.confirmTransaction({
        signature: fromAirDropSignature,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      });
  
      console.log("Airdrop of 2 SOL successful!");
    } catch (err) {
      console.error("Airdrop failed:", err);
    }
  };

  const main = async () => {
    console.log("Initial Wallet Balance:");
    await getWalletBalance();
  
    console.log("Requesting Airdrop...");
    await airDropSol();
  
    console.log("Final Wallet Balance:");
    await getWalletBalance();
  };
  
  main();