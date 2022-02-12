import { AnimalType } from "../shared/interfaces/petfinder.interface";

const { NEXT_PUBLIC_PETFINDER_API_URL } = process.env;

class PetfinderApiError extends Error {
  info: object;

  constructor(info, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PetfinderApiError);
    }

    this.name = "PetfinderApiError";
    this.info = info;
  }
}

interface FetchFromApiOptions {
  method?: "GET" | "POST";
  route: string;
  body?: object;
  token?: string;
}

class Petfinder {
  async fetchFromApi<PetfinderApiResponse>({
    method = "GET",
    route,
    body,
    token,
  }: FetchFromApiOptions): Promise<PetfinderApiResponse> {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (body) {
      options["body"] = JSON.stringify(body);
    }

    const res = await fetch(
      `${NEXT_PUBLIC_PETFINDER_API_URL}${route}`,
      options
    );

    if (!res.ok) {
      throw new PetfinderApiError(
        {
          status: res.status,
        },
        `Petfinder API has responded with an error: ${res.statusText}`
      );
    }

    return (await res.json()) as Promise<PetfinderApiResponse>;
  }

  extractTypeSlug(type: AnimalType) {
    return type._links.self.href.match(/\/types\/([\w-]+)$/)[1];
  }

  addTypeSlugsToTypes(types: AnimalType[]) {
    return types.map((type) => ({
      ...type,
      id: this.extractTypeSlug(type),
    }));
  }
}

export default new Petfinder();
