// Mock cryptocurrency data
export const cryptoAssets = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 67423.18,
    change24h: 2.34,
    change7d: 5.12,
    marketCap: 1327000000000,
    volume24h: 28400000000,
    circulatingSupply: 19700000,
    color: "#f7931a",
    emoji: "₿",
    description:
      "Bitcoin is a decentralized digital currency that enables peer-to-peer transactions without the need for intermediaries like banks. Created in 2009 by the pseudonymous Satoshi Nakamoto, it operates on a blockchain — a distributed ledger secured by cryptographic proof-of-work.",
    sparkline: [62000, 63500, 61800, 64200, 65100, 63800, 66200, 67423],
    logo: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3521.44,
    change24h: 1.87,
    change7d: 3.45,
    marketCap: 423000000000,
    volume24h: 14200000000,
    circulatingSupply: 120200000,
    color: "#627eea",
    emoji: "Ξ",
    description:
      "Ethereum is a decentralized, open-source blockchain with smart contract functionality. It was proposed in 2013 by programmer Vitalik Buterin. ETH is the native cryptocurrency of the Ethereum platform and the second-largest cryptocurrency by market capitalization.",
    sparkline: [3200, 3150, 3280, 3320, 3400, 3380, 3450, 3521],
    logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 182.67,
    change24h: 4.21,
    change7d: 8.93,
    marketCap: 80100000000,
    volume24h: 3200000000,
    circulatingSupply: 438500000,
    color: "#9945ff",
    emoji: "◎",
    description:
      "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale. It uses a unique proof-of-history consensus combined with proof-of-stake to achieve fast transaction speeds with low fees.",
    sparkline: [155, 162, 158, 168, 172, 175, 178, 182],
    logo: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: 0.6234,
    change24h: -0.87,
    change7d: 2.14,
    marketCap: 21800000000,
    volume24h: 420000000,
    circulatingSupply: 35000000000,
    color: "#0033ad",
    emoji: "₳",
    description:
      "Cardano is a proof-of-stake blockchain platform that aims to allow changemakers, innovators and visionaries to bring about positive global change. It was founded in 2017 by Ethereum co-founder Charles Hoskinson.",
    sparkline: [0.58, 0.59, 0.60, 0.61, 0.62, 0.615, 0.618, 0.623],
    logo: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.1842,
    change24h: -2.14,
    change7d: -3.21,
    marketCap: 26000000000,
    volume24h: 1100000000,
    circulatingSupply: 141000000000,
    color: "#c3a634",
    emoji: "Ð",
    description:
      "Dogecoin is a cryptocurrency that was created as a joke in 2013 but has grown to have a large community and real-world usage. It features the Shiba Inu dog from the 'Doge' meme as its logo.",
    sparkline: [0.19, 0.185, 0.192, 0.188, 0.186, 0.184, 0.183, 0.184],
    logo: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png",
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    price: 9.34,
    change24h: 1.23,
    change7d: 4.56,
    marketCap: 12800000000,
    volume24h: 280000000,
    circulatingSupply: 1370000000,
    color: "#e6007a",
    emoji: "●",
    description:
      "Polkadot is a multi-chain network that enables cross-blockchain transfers of any type of data or asset. It was created by Ethereum co-founder Gavin Wood and connects multiple specialized blockchains into a unified network.",
    sparkline: [8.8, 8.9, 9.0, 9.1, 9.15, 9.2, 9.28, 9.34],
    logo: "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
  },
  {
    id: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    price: 38.92,
    change24h: 3.67,
    change7d: 6.82,
    marketCap: 15900000000,
    volume24h: 520000000,
    circulatingSupply: 408000000,
    color: "#e84142",
    emoji: "A",
    description:
      "Avalanche is an open, programmable smart contracts platform for decentralized applications. It aims to be the fastest smart contracts platform in the blockchain industry and features three built-in blockchains.",
    sparkline: [34, 35, 36, 37, 37.5, 38, 38.5, 38.92],
    logo: "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png",
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    price: 14.27,
    change24h: -0.54,
    change7d: 1.23,
    marketCap: 8700000000,
    volume24h: 310000000,
    circulatingSupply: 587000000,
    color: "#2a5ada",
    emoji: "⬡",
    description:
      "Chainlink is a decentralized oracle network that enables smart contracts to securely interact with real-world data, services, and payments. It bridges the gap between blockchain-based smart contracts and real-world data.",
    sparkline: [13.8, 14.0, 14.1, 14.05, 14.2, 14.15, 14.22, 14.27],
    logo: "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
  },
  {
    id: "uniswap",
    symbol: "UNI",
    name: "Uniswap",
    price: 10.84,
    change24h: 2.91,
    change7d: 5.33,
    marketCap: 6500000000,
    volume24h: 180000000,
    circulatingSupply: 598000000,
    color: "#ff007a",
    emoji: "🦄",
    description:
      "Uniswap is a decentralized trading protocol known for its role in facilitating automated trading of decentralized finance tokens. It uses an automated market maker model to allow direct swaps between tokens.",
    sparkline: [10.1, 10.2, 10.35, 10.5, 10.6, 10.7, 10.78, 10.84],
    logo: "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png",
  },
  {
    id: "litecoin",
    symbol: "LTC",
    name: "Litecoin",
    price: 84.63,
    change24h: -1.32,
    change7d: 0.87,
    marketCap: 6300000000,
    volume24h: 410000000,
    circulatingSupply: 74500000,
    color: "#bfbbbb",
    emoji: "Ł",
    description:
      "Litecoin is a peer-to-peer cryptocurrency and open-source software project. It was an early Bitcoin spinoff and aimed to be the silver to Bitcoin's gold. Litecoin offers faster transaction times and a larger supply.",
    sparkline: [82, 83, 83.5, 84, 84.2, 84.5, 84.6, 84.63],
    logo: "https://assets.coingecko.com/coins/images/2/small/litecoin.png",
  },
];

export const learnArticles = [
  {
    id: "what-is-bitcoin",
    title: "What is Bitcoin?",
    subtitle: "Understand the world's first cryptocurrency",
    category: "Bitcoin",
    readTime: "5 min read",
    level: "Beginner",
    description:
      "Learn how Bitcoin works, how it's different from traditional money, and why it matters. We'll cover blockchain technology, mining, and how to get started.",
    icon: "₿",
    color: "#f7931a",
  },
  {
    id: "what-is-ethereum",
    title: "What is Ethereum?",
    subtitle: "Beyond digital currency — programmable money",
    category: "Ethereum",
    readTime: "7 min read",
    level: "Beginner",
    description:
      "Ethereum goes beyond Bitcoin by enabling smart contracts and decentralized applications. Discover how Ethereum works and what makes it special.",
    icon: "Ξ",
    color: "#627eea",
  },
  {
    id: "what-is-defi",
    title: "What is DeFi?",
    subtitle: "Decentralized finance explained",
    category: "DeFi",
    readTime: "8 min read",
    level: "Intermediate",
    description:
      "DeFi is reinventing financial services using blockchain technology. Learn about lending, borrowing, and earning yield without banks.",
    icon: "⚡",
    color: "#05b169",
  },
  {
    id: "what-are-nfts",
    title: "What are NFTs?",
    subtitle: "Non-fungible tokens and digital ownership",
    category: "NFTs",
    readTime: "6 min read",
    level: "Beginner",
    description:
      "NFTs represent unique digital ownership on the blockchain. Explore how they work, why they're valuable, and how artists and creators use them.",
    icon: "🎨",
    color: "#9945ff",
  },
  {
    id: "crypto-wallet",
    title: "Crypto Wallets Explained",
    subtitle: "How to store and secure your crypto",
    category: "Security",
    readTime: "6 min read",
    level: "Beginner",
    description:
      "Understanding crypto wallets is essential for anyone in crypto. We explain hot and cold wallets, seed phrases, and best security practices.",
    icon: "🔐",
    color: "#0052ff",
  },
  {
    id: "proof-of-stake",
    title: "Proof of Stake vs Proof of Work",
    subtitle: "How blockchains reach consensus",
    category: "Blockchain",
    readTime: "9 min read",
    level: "Intermediate",
    description:
      "Discover the two main consensus mechanisms that power cryptocurrencies, their environmental impacts, and how they affect network security.",
    icon: "⛓",
    color: "#e6007a",
  },
];

export const formatPrice = (price) => {
  if (price >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  } else if (price >= 1) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(price);
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    }).format(price);
  }
};

export const formatMarketCap = (value) => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};

export const formatVolume = (value) => {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString()}`;
};
