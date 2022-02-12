import { NextApiRequest, NextApiResponse } from "next";
import Petfinder from "../../../../helpers/petfinder";
import { AnimalResponse } from "../../../../shared/interfaces/petfinder.interface";

export async function getAnimal(
  id: string,
  token?: string
): Promise<AnimalResponse> {
  return await Petfinder.fetchFromApi<AnimalResponse>({
    route: `/animals/${id}`,
    token,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { animal } = await getAnimal(
        req.query.id as string,
        req.cookies.token
      );

      res.status(200).json(animal);
    } catch (err) {
      res
        .status(err.info.status)
        .json({ message: err.message, info: err.info });
    }
  } else {
    res.status(404).json({
      message: `Endpoint ${req.method} /api/petfinder/animals/${req.query.id} could not be found. Did you mean to send a request to GET /api/petfinder/animals/${req.query.id}?`,
    });
  }
}
