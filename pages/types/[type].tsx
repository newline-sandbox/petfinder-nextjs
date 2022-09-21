import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import AnimalCardsList from "../../components/AnimalCardsList";
import Breadcrumbs from "../../components/Breadcrumbs";
import {
  Animal,
  AnimalType,
} from "../../shared/interfaces/petfinder.interface";

export interface TypePageProps {
  type: AnimalType;
  adoptedAnimals: Animal[];
}

const {
  NEXT_PUBLIC_PETFINDER_API_URL,
  NEXT_PUBLIC_PETFINDER_CLIENT_ID,
  NEXT_PUBLIC_PETFINDER_CLIENT_SECRET,
} = process.env;

const getAccessToken = async () => {
  const { access_token } = await (
    await fetch(`${NEXT_PUBLIC_PETFINDER_API_URL}/oauth2/token`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: NEXT_PUBLIC_PETFINDER_CLIENT_ID,
        client_secret: NEXT_PUBLIC_PETFINDER_CLIENT_SECRET,
      }),
    })
  ).json();

  return access_token;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let adoptedAnimals = [],
    breeds = [],
    type = {};

  try {
    const accessToken = await getAccessToken();

    ({ type } = await (
      await fetch(`${NEXT_PUBLIC_PETFINDER_API_URL}/types/${params.type}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).json());

    ({ breeds } = await (
      await fetch(
        `${NEXT_PUBLIC_PETFINDER_API_URL}/types/${params.type}/breeds`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
    ).json());

    ({ animals: adoptedAnimals } = await (
      await fetch(
        `${NEXT_PUBLIC_PETFINDER_API_URL}/animals?type=${params.type}&status=adopted&limit=5`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
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
        ...type,
        id: params.type,
        breeds,
      },
      adoptedAnimals,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = [];

  try {
    const accessToken = await getAccessToken();

    const { types } = await (
      await fetch(`${NEXT_PUBLIC_PETFINDER_API_URL}/types`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
    ).json();

    if (types.length > 0) {
      paths = types.map((type) => ({
        params: { type: type._links.self.href.match(/\/types\/([\w-]+)$/)[1] },
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

const TypePage: NextPage<TypePageProps> = ({ adoptedAnimals, type }) => (
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
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
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
    </main>
  </>
);

export default TypePage;
