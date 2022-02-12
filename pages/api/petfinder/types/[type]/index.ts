import { NextApiRequest, NextApiResponse } from "next";
import Petfinder from "../../../../../helpers/petfinder";
import { AnimalTypeResponse } from "../../../../../shared/interfaces/petfinder.interface";

export async function getType(
  type: string,
  token?: string
): Promise<AnimalTypeResponse> {
  return await Petfinder.fetchFromApi<AnimalTypeResponse>({
    route: `/types/${type}`,
    token,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { type } = await getType(
        req.query.type as string,
        req.cookies.token
      );

      res.status(200).json(type);
    } catch (err) {
      res
        .status(err.info.status)
        .json({ message: err.message, info: err.info });
    }
  } else {
    res.status(404).json({
      message: `Endpoint ${req.method} /api/petfinder/types/${req.query.type} could not be found. Did you mean to send a request to GET /api/petfinder/types/${req.query.type}?`,
    });
  }
}
