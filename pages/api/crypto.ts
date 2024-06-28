import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let response = null;
  const { start = 1, limit = 25, sort, sort_dir = "desc" } = req.query;
  try {
    response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: {
          start,
          limit,
          sort,
          sort_dir,
        },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.API_KEY,
        },
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
    return;
  }
  if (response) {
    res.json(response.data);
  }
}
