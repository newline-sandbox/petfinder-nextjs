import { NextPage, GetStaticProps } from "next";
import { getTypes } from "./api/petfinder/types";
import Petfinder from "../helpers/petfinder";
import { AnimalType } from "../shared/interfaces/petfinder.interface";
import TypeCardsGrid from "../components/TypeCardsGrid";

const { PETFINDER_ACCESS_TOKEN } = process.env;

export const getStaticProps: GetStaticProps = async () => {
  let types = [];

  try {
    if (PETFINDER_ACCESS_TOKEN) {
      ({ types } = await getTypes(PETFINDER_ACCESS_TOKEN));
    }
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      types: types.length > 0 ? Petfinder.addTypeSlugsToTypes(types) : types,
    },
  };
};

export interface HomePageProps {
  types: AnimalType[];
}

const HomePage: NextPage<HomePageProps> = ({ types }) => (
  <section>
    <h1 className="text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-800 sm:text-8xl lg:text-9xl">
      Petfinder
    </h1>
    <p className="mt-7 mb-7 text-2xl text-gray-400">
      Explore the Petfinder API and help pets find good homes.
    </p>
    <TypeCardsGrid types={types} />
  </section>
);

export default HomePage;
