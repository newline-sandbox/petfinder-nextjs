import { FC } from "react";
import { AnimalType } from "../shared/interfaces/petfinder.interface";
import TypeCard from "./TypeCard";

export interface TypeCardsGrid {
  className?: string;
  types: AnimalType[];
}

const TypeCardsGrid: FC<TypeCardsGrid> = ({ className, types }) => (
  <ul
    role="list"
    className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4${
      className ? ` ${className}` : ""
    }`}
  >
    {types.map((type) => (
      <TypeCard type={type} key={type.id} />
    ))}
  </ul>
);

export default TypeCardsGrid;
