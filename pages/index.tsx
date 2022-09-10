import { NextPage, GetStaticProps } from "next";
import { AnimalType } from "../shared/interfaces/petfinder.interface";
import TypeCardsGrid from "../components/TypeCardsGrid";

export interface HomePageProps {
  types: AnimalType[];
}

const {
  NEXT_PUBLIC_PETFINDER_API_URL,
  NEXT_PUBLIC_PETFINDER_CLIENT_ID,
  NEXT_PUBLIC_PETFINDER_CLIENT_SECRET,
} = process.env;

export const getStaticProps: GetStaticProps = async () => {
  let types = [];

  try {
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

    ({ types } = await (
      await fetch(`${NEXT_PUBLIC_PETFINDER_API_URL}/types`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json());
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      types:
        types.length > 0
          ? types.map((type) => ({
              ...type,
              id: type._links.self.href.match(/\/types\/([\w-]+)$/)[1],
            }))
          : types,
    },
  };
};

const HomePage: NextPage<HomePageProps> = ({ types = [] }) => (
  <section>
    <h1 className="text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-800 sm:text-8xl lg:text-9xl">
      Petfinder
    </h1>
    <p className="mt-7 mb-7 text-2xl text-gray-400">
      Explore the Petfinder API and help pets find good homes.
    </p>
    {types.length > 0 && <TypeCardsGrid types={types} />}
  </section>
);

export default HomePage;
