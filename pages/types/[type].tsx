import { useEffect, useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import queryString from "query-string";
import AnimalsCardsList from "../../components/AnimalsCardsList";
import Breadcrumb from "../../components/Breadcrumb";
import RefreshTokenButton from "../../components/RefreshTokenButton";
import TypeBreedsTags from "../../components/TypeBreedsTags";
import { getTypes } from "../api/petfinder/types";
import { getType } from "../api/petfinder/types/[type]";
import { getTypeBreeds } from "../api/petfinder/types/[type]/breeds";
import ApiClient from "../../helpers/api-client";
import Petfinder from "../../helpers/petfinder";
import {
  Animal,
  AnimalType,
} from "../../shared/interfaces/petfinder.interface";
import { getAnimals } from "../api/petfinder/animals";

const { PETFINDER_ACCESS_TOKEN } = process.env;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { type } = await getType(params.type as string, PETFINDER_ACCESS_TOKEN);
  const { breeds } = await getTypeBreeds(
    params.type as string,
    PETFINDER_ACCESS_TOKEN
  );
  const { animals } = await getAnimals(
    queryString.stringify({
      type: params.type,
      status: "adopted",
      limit: 5,
    }),
    PETFINDER_ACCESS_TOKEN
  );

  return {
    props: {
      type: {
        ...type,
        id: params.type,
        breeds,
      },
      adoptedAnimals: animals,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { types } = await getTypes(PETFINDER_ACCESS_TOKEN);

  return {
    paths: Petfinder.addTypeSlugsToTypes(types).map((type) => ({
      params: { type: type.id },
    })),
    fallback: false, // Return a 404 page for a non-existent type.
  };
};

export interface TypePageProps {
  type: AnimalType;
  adoptedAnimals: Animal[];
}

const TypePage: NextPage<TypePageProps> = ({ type, adoptedAnimals }) => {
  const [adoptableAnimals, setAdoptableAnimals] = useState([]);
  const [isUpdatingAdoptableListings, setIsUpdatingAdoptableListings] =
    useState(false);
  const [isTokenRefreshShown, setIsTokenRefreshShown] = useState(false);

  useEffect(() => {
    const fetchAdoptableAnimals = async () => {
      try {
        setIsUpdatingAdoptableListings(true);

        await ApiClient.refreshPetfinderToken();

        const animals = await ApiClient.fetchPetfinderAnimals({
          type: type.id,
          status: "adoptable",
          limit: 5,
        });

        setAdoptableAnimals(animals);
      } catch (err) {
        console.error(err.message);

        setAdoptableAnimals([]);
      } finally {
        setIsUpdatingAdoptableListings(false);
      }
    };

    fetchAdoptableAnimals();
  }, []);

  const updateAdoptableListings = async (_evt) => {
    try {
      setIsUpdatingAdoptableListings(true);

      const animals = await ApiClient.fetchPetfinderAnimals({
        type: type.id,
        status: "adoptable",
        limit: 5,
      });

      setAdoptableAnimals(animals);
    } catch (err) {
      console.error(err.message);

      if (err.info?.status === 401) {
        setIsTokenRefreshShown(true);
      }
    } finally {
      setIsUpdatingAdoptableListings(false);
    }
  };

  const handleSuccessfulTokenRefresh = () => {
    setIsTokenRefreshShown(false);
  };

  return (
    <>
      <Breadcrumb
        className="mb-7"
        pages={[
          {
            name: "Types",
            url: `/`, // TODO: Create a page for `/types`.
          },
          {
            name: type.name,
            url: `/types/${type.id}`,
          },
        ]}
      />
      <main>
        <section className="relative mb-7" id="overview">
          <h1 className="text-7xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
            {type.name}
          </h1>
          <p className="mt-7 text-2xl text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>
        <section className="relative mb-7" id="recently-adopted">
          <h3 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-7">
            Recently Adopted
          </h3>
          <p>
            <AnimalsCardsList animals={adoptedAnimals} />
          </p>
        </section>
        <section className="relative mb-7" id="for-adoption">
          <h3 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-7">
            For Adoption
          </h3>
          <button
            type="button"
            className={`inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-purple-600 hover:bg-purple-500 transition ease-in-out duration-150${
              isUpdatingAdoptableListings ? " cursor-not-allowed" : ""
            } absolute top-3.5 right-0`}
            onClick={updateAdoptableListings}
            disabled={isUpdatingAdoptableListings}
          >
            {isUpdatingAdoptableListings && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isUpdatingAdoptableListings
              ? "Updating Listings..."
              : "Update Listings"}
          </button>
          {isTokenRefreshShown && (
            <div className="mb-6">
              <p className="text-lg text-gray-400 mb-3">
                Uh Oh! Your Petfinder access token has expired. Please refresh
                the token.
              </p>
              <RefreshTokenButton onSuccess={handleSuccessfulTokenRefresh} />
            </div>
          )}
          <div className="relative">
            {isUpdatingAdoptableListings && (
              <div className="absolute top-0 right-0 left-0 bottom-0 bg-white opacity-60 rounded-md z-[1]" />
            )}
            <AnimalsCardsList animals={adoptableAnimals} />
          </div>
        </section>
        <section className="relative mb-7" id="available-breeds">
          <h3 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-7">
            Available Breeds
          </h3>
          <TypeBreedsTags className="mt-7 mb-7" breeds={type.breeds} />
        </section>
      </main>
    </>
  );
};

export default TypePage;
