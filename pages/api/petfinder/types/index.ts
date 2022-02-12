import { NextApiRequest, NextApiResponse } from "next";
import Petfinder from "../../../../helpers/petfinder";
import { AnimalTypesResponse } from "../../../../shared/interfaces/petfinder.interface";

export async function getTypes(token?: string): Promise<AnimalTypesResponse> {
  return await Petfinder.fetchFromApi<AnimalTypesResponse>({
    route: "/types",
    token,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { types } = await getTypes(req.cookies.token);

      res.status(200).json(types);
    } catch (err) {
      res
        .status(err.info.status)
        .json({ message: err.message, info: err.info });
    }
  } else {
    res.status(404).json({
      message: `Endpoint ${req.method} /api/petfinder/types could not be found. Did you mean to send a request to GET /api/petfinder/types?`,
    });
  }
}
