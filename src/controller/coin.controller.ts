import { Request, Response } from "express";
import { ApiResponseHandler } from "../utils/apiResponse";
import prisma from "../service/prismaClient";

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
