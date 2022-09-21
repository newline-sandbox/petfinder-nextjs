import { FC } from "react";
import AnimalCard from "./AnimalCard";
import { Animal } from "../shared/interfaces/petfinder.interface";

export interface AnimalCardsList {
  className?: string;
  animals: Animal[];
}

const AnimalsCardsList: FC<AnimalCardsList> = ({ className, animals }) => (
  <ul className={className}>
    {animals.map((animal) => (
      <AnimalCard className="mb-6" animal={animal} key={animal.id} />
    ))}
  </ul>
);

export default AnimalsCardsList;
