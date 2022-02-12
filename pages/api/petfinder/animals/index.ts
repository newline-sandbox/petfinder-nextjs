import { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";
import Petfinder from "../../../../helpers/petfinder";
import { AnimalsResponse } from "../../../../shared/interfaces/petfinder.interface";

export async function getAnimals(
  stringifiedQuery?: string,
  token?: string
): Promise<AnimalsResponse> {
  return await Petfinder.fetchFromApi<AnimalsResponse>({
    route: `/animals${stringifiedQuery ? `?${stringifiedQuery}` : ""}`,
    token,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { animals } = await getAnimals(
        queryString.stringify(req.query),
        req.cookies.token
      );

      res.status(200).json(animals);
    } catch (err) {
      res
        .status(err.info.status)
        .json({ message: err.message, info: err.info });
    }
  } else {
    res.status(404).json({
      message: `Endpoint ${req.method} /api/petfinder/animals could not be found. Did you mean to send a request to GET /api/petfinder/animals?`,
    });
  }
}
