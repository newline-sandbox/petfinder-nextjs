import { NextApiRequest, NextApiResponse } from "next";
import Petfinder from "../../../../../helpers/petfinder";
import { AnimalTypeBreedsResponse } from "../../../../../shared/interfaces/petfinder.interface";

export async function getTypeBreeds(
  type: string,
  token?: string
): Promise<AnimalTypeBreedsResponse> {
  return await Petfinder.fetchFromApi<AnimalTypeBreedsResponse>({
    route: `/types/${type}/breeds`,
    token,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { breeds } = await getTypeBreeds(
        req.query.type as string,
        req.cookies.token
      );

      res.status(200).json(breeds);
    } catch (err) {
      res
        .status(err.info.status)
        .json({ message: err.message, info: err.info });
    }
  } else {
    res.status(404).json({
      message: `Endpoint ${req.method} /api/petfinder/types/${req.query.type}/breeds could not be found. Did you mean to send a request to GET /api/petfinder/types/${req.query.type}/breeds?`,
    });
  }
}
