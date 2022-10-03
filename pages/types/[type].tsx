import { useCallback, useEffect, useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import AnimalCardsList from "../../components/AnimalCardsList";
import Breadcrumbs from "../../components/Breadcrumbs";
import Loader from "../../components/Loader";
import UpdateButton from "../../components/UpdateButton";
import { TypePath } from "../../shared/interfaces/paths.interface";
import {
  Animal,
  AnimalsResponse,
  AnimalType,
  AnimalTypeBreed,
  AnimalTypesResponse,
  TokenResponse,
} from "../../shared/interfaces/petfinder.interface";

export interface TypePageProps {
  type: AnimalType;
  adoptedAnimals: Animal[];
}

const PETFINDER_ACCESS_TOKEN = process.env.PETFINDER_ACCESS_TOKEN;
const NEXT_PUBLIC_PETFINDER_API_URL = process.env.NEXT_PUBLIC_PETFINDER_API_URL;
const NEXT_PUBLIC_PETFINDER_CLIENT_ID =
  process.env.NEXT_PUBLIC_PETFINDER_CLIENT_ID;
const NEXT_PUBLIC_PETFINDER_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_PETFINDER_CLIENT_SECRET;

interface PageProps {
  type: AnimalType;
  adoptedAnimals: Animal[];
}

interface StaticPathParams extends ParsedUrlQuery {
  type: string;
}

export const getStaticProps: GetStaticProps<
  PageProps,
  StaticPathParams
> = async ({ params }) => {
  let adoptedAnimals: Animal[] = [],
    breeds: AnimalTypeBreed[] = [],
    type!: AnimalType;

  let { type: typeParam } = params as StaticPathParams;

  try {
    ({ type } = await (
      await fetch(`${NEXT_PUBLIC_PETFINDER_API_URL}/types/${typeParam}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PETFINDER_ACCESS_TOKEN}`,
        },
      })
    ).json());

    ({ breeds } = await (
      await fetch(
        `${NEXT_PUBLIC_PETFINDER_API_URL}/types/${typeParam}/breeds`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PETFINDER_ACCESS_TOKEN}`,
          },
        }
      )
    ).json());

    ({ animals: adoptedAnimals } = await (
      await fetch(
        `${NEXT_PUBLIC_PETFINDER_API_URL}/animals?type=${typeParam}&status=adopted&limit=5`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PETFINDER_ACCESS_TOKEN}`,
          },
        }
      )
    ).json());
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      type: {
        ...(type || {}),
        id: typeParam,
        breeds,
      },
      adoptedAnimals,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: TypePath[] = [];

  try {
    const { types }: AnimalTypesResponse = await (
      await fetch(`${NEXT_PUBLIC_PETFINDER_API_URL}/types`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PETFINDER_ACCESS_TOKEN}`,
        },
      })
    ).json();

    if (types.length > 0) {
      paths = types.map((type) => ({
        params: {
          type: (type._links.self.href.match(/\/types\/([\w-]+)$/) || "")[1],
        },
      }));
    }
  } catch (err) {
    console.error(err);
  }

  return {
    paths,
    fallback: false, // Return a 404 page for a non-existent type.
  };
};

const TypePage: NextPage<TypePageProps> = ({ adoptedAnimals, type }) => {
  const [adoptableAnimals, setAdoptableAnimals] = useState<Animal[]>([]);
  const [isUpdatingAdoptableListings, setIsUpdatingAdoptableListings] =
    useState<boolean>(false);
  const [isUpdateFailed, setIsUpdateFailed] = useState<boolean>(false);

  const fetchAdoptableAnimals = useCallback(async () => {
    try {
      setIsUpdateFailed(false);
      setIsUpdatingAdoptableListings(true);

      const { access_token }: TokenResponse = await (
        await fetch(`${NEXT_PUBLIC_PETFINDER_API_URL}/oauth2/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grant_type: "client_credentials",
            client_id: `${NEXT_PUBLIC_PETFINDER_CLIENT_ID}`,
            client_secret: `${NEXT_PUBLIC_PETFINDER_CLIENT_SECRET}`,
          }),
        })
      ).json();

      const { animals }: AnimalsResponse = await (
        await fetch(
          `${NEXT_PUBLIC_PETFINDER_API_URL}/animals?type=${type.id}&status=adoptable&limit=5`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
      ).json();

      setAdoptableAnimals(animals);
    } catch (err) {
      console.error(err);

      setIsUpdateFailed(true);
    }

    setIsUpdatingAdoptableListings(false);
  }, [type]);

  const updateAdoptableListings = async () => {
    await fetchAdoptableAnimals();
  };

  useEffect(() => {
    fetchAdoptableAnimals();
  }, [fetchAdoptableAnimals]);

  return (
    <>
      <Breadcrumbs
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
          <AnimalCardsList animals={adoptedAnimals} />
        </section>
        <section className="relative mb-7" id="for-adoption">
          <h3 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-7">
            For Adoption
          </h3>
          <UpdateButton
            className="absolute top-3.5 right-0"
            isUpdating={isUpdatingAdoptableListings}
            handleOnClick={updateAdoptableListings}
            text="Update Listings"
            updateText="Updating Listings..."
          />
          <div className="relative">
            {isUpdatingAdoptableListings &&
              (adoptableAnimals.length > 0 ? (
                <div className="absolute top-0 right-0 left-0 bottom-0 bg-white opacity-60 rounded-md z-[2]">
                  <Loader className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-800" />
                </div>
              ) : (
                <Loader className="mb-7" />
              ))}
            {!isUpdatingAdoptableListings && isUpdateFailed && (
              <p className="mb-7 text-red-600">
                Uh Oh! We could not update the listings at this time. Please try
                again.
              </p>
            )}
            <AnimalCardsList animals={adoptableAnimals} />
          </div>
        </section>
      </main>
    </>
  );
};

export default TypePage;
