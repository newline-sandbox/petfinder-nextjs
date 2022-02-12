import queryString from "query-string";

class ApiClient {
  async refreshPetfinderToken() {
    const res = await fetch(`/api/petfinder/auth`, {
      method: "POST",
    });

    if (!res.ok) {
      throw await res.json(); // Errors only contain a `message`.
    }
  }

  async fetchPetfinderAnimals(queryParams) {
    const stringifiedQuery = queryString.stringify(queryParams);

    const res = await fetch(
      `/api/petfinder/animals${stringifiedQuery ? `?${stringifiedQuery}` : ""}`
    );

    const data = await res.json();

    if (!res.ok) {
      throw data; // Errors only contain a `message`.
    }

    return data;
  }
}

export default new ApiClient();
