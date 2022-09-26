import { NextPage, GetStaticProps } from "next";
import { getPlaiceholder } from "plaiceholder";
import { ANIMAL_TYPES } from "../enums";
import { AnimalType } from "../shared/interfaces/petfinder.interface";
import TypeCardsGrid from "../components/TypeCardsGrid";

export interface HomePageProps {
  types: AnimalType[];
}

const { NEXT_PUBLIC_PETFINDER_API_URL, PETFINDER_ACCESS_TOKEN } = process.env;

export const getStaticProps: GetStaticProps = async () => {
  let types = [];

  try {
    ({ types } = await (
      await fetch(`${NEXT_PUBLIC_PETFINDER_API_URL}/types`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${PETFINDER_ACCESS_TOKEN}`,
        },
      })
    ).json());

    if (types.length > 0) {
      types = await Promise.all(
        types.map(async (type) => {
          const { blurhash, img } = await getPlaiceholder(
            ANIMAL_TYPES[type.name].image.url
          );

          return {
            ...type,
            id: type._links.self.href.match(/\/types\/([\w-]+)$/)[1],
            blurhash,
            img: {
              ...img,
              objectPosition:
                ANIMAL_TYPES[type.name].image.styles?.objectPosition ||
                "center",
            },
          };
        })
      );
    }
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      types,
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
