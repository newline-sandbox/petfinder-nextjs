import { NextPage } from "next";
import { AnimalType } from "../shared/interfaces/petfinder.interface";
import TypeCardsGrid from "../components/TypeCardsGrid";

export interface HomePageProps {
  types: AnimalType[];
}

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
