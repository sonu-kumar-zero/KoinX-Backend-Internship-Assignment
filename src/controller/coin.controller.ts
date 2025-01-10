import { Request, Response } from "express";
import { ApiResponseHandler } from "../utils/apiResponse";
import prisma from "../service/prismaClient";
import { calculateStandardDeviation } from "../utils/utilFunc";

export const fetchStatsOfGivenCoin = async (req: Request, res: Response) => {
  try {
    const coin = req.query.coin as string;
    if (!coin.trim()) {
      ApiResponseHandler.badRequest(res, "coin param not found.", undefined);
      return;
    }

    const data = await prisma.currency.findFirst({
      where: {
        cryptocurrencyName: coin,
      },
      take: 100,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!data) {
      ApiResponseHandler.notFound(res, "Data not found.");
      return;
    }

    ApiResponseHandler.success(res, "Fetched data of given coin", {
      priceUSD: data.priceUsd,
      marketCapUSD: data.marketCapUsd,
      "24hChange": data.percentChange24h,
    });
  } catch (error) {
    ApiResponseHandler.error(
      res,
      "Error Occured During Stats fetching of a coin",
      error
    );
  }
};

export const fetchDeviationOfCoins = async (req: Request, res: Response) => {
  try {
    const coin = req.query.coin as string;
    if (!coin.trim()) {
      ApiResponseHandler.badRequest(res, "coin param not found.", undefined);
      return;
    }

    const latest100Records = await prisma.currency.findMany({
      where: {
        cryptocurrencyName: coin,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (latest100Records.length === 0) {
      ApiResponseHandler.badRequest(
        res,
        "Coin you are finding is not present in database."
      );
      return;
    }

    const priceArray: number[] = latest100Records.map((record) => {
      return parseFloat(record.priceUsd);
    });

    const deviation = calculateStandardDeviation(priceArray);

    ApiResponseHandler.success(res, `Deviation of given coin ${coin}`, {
      deviationInUSD: deviation,
    });
  } catch (error) {
    ApiResponseHandler.error(
      res,
      "Error Occured during deviation of coin price fetching",
      error
    );
  }
};
