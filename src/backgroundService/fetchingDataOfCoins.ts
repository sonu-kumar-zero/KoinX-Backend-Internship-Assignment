import { cryptoIds } from "../constants";
import coinLoreClient from "../service/coinLoreApiClient";
import prisma from "../service/prismaClient";
import nodeCron from "node-cron";

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

interface CryptoDataNewFormat {
  cryptocurrencyName: string;
  marketCapUsd: string;
  percentChange24h: string;
  priceUsd: string;
}

const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const idString = Object.values(cryptoIds).join(",");
    const response = await coinLoreClient.get(`ticker/?id=${idString}`);
    const data: CryptoData[] = response.data;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching cryptocurrency data:", error.message);
    } else {
      console.error("Error fetching cryptocurrency data:", error);
    }
    return [];
  }
};

const dataConverter = (cryptoData: CryptoData[]): CryptoDataNewFormat[] => {
  const newFormat: CryptoDataNewFormat[] = cryptoData.map((crypto) => {
    const temp: CryptoDataNewFormat = {
      cryptocurrencyName: crypto.name,
      marketCapUsd: crypto.market_cap_usd,
      percentChange24h: crypto.percent_change_24h,
      priceUsd: crypto.price_usd,
    };
    return temp;
  });
  return newFormat;
};

const storeCryptoData = async (cryptoData: CryptoData[]) => {
  try {
    const formatData = dataConverter(cryptoData);
    await prisma.currency.createMany({
      data: formatData,
    });
    console.log("Crypto data stored successfully.");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error storing cryptocurrency data:", error.message);
    } else {
      console.error("Error storing cryptocurrency data:", error);
    }
  }
};

export const startBackgroundJobOfDataFetching = async () => {
  try {
    console.log("start Background Job Of Crypto Data Fetching...");
    const firstData = await fetchCryptoData();
    if (firstData.length) {
      await storeCryptoData(firstData);
    }
    nodeCron.schedule("0 */2 * * *", async () => {
      console.log("Fetching cryptocurrency data...");
      const cryptoData = await fetchCryptoData();
      if (cryptoData.length) {
        await storeCryptoData(cryptoData);
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during starting job:", error.message);
    } else {
      console.error("Error during starting job:", error);
    }
  }
};

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});
