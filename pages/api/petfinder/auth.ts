import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import Petfinder from "../../../helpers/petfinder";
import { TokenResponse } from "../../../shared/interfaces/petfinder.interface";

const {
  NEXT_PUBLIC_PETFINDER_CLIENT_ID,
  NEXT_PUBLIC_PETFINDER_CLIENT_SECRET,
  NODE_ENV,
} = process.env;

export async function getToken(): Promise<TokenResponse> {
  return await Petfinder.fetchFromApi<TokenResponse>({
    method: "POST",
    route: "/oauth2/token",
    body: {
      grant_type: "client_credentials",
      client_id: NEXT_PUBLIC_PETFINDER_CLIENT_ID,
      client_secret: NEXT_PUBLIC_PETFINDER_CLIENT_SECRET,
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (req.cookies.token) {
      res.status(200).json({ success: true }); // The client already has a valid access token.
    } else {
      try {
        const { access_token, expires_in } = await getToken();

        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", access_token, {
            path: "/", // Without this, subsequent fetch requests will not include the cookie in the header.
            httpOnly: true,
            secure: NODE_ENV !== "development",
            maxAge: expires_in, // 3600 Seconds = 1 Hour
          })
        );

        res.status(200).json({ success: true });
      } catch (err) {
        res
          .status(err.info.status)
          .json({ message: err.message, info: err.info });
      }
    }
  } else {
    res.status(404).json({
      message: `Endpoint ${req.method} /api/petfinder/auth could not be found. Did you mean to send a request to POST /api/petfinder/auth?`,
    });
  }
}
