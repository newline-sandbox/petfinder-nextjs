import { FC } from "react";
import { AnimalTypeBreed } from "../shared/interfaces/petfinder.interface";

export interface TypeBreedsTagsProps {
  className?: string;
  breeds: AnimalTypeBreed[];
}

const TypeBreedsTags: FC<TypeBreedsTagsProps> = ({ className, breeds }) => (
  <ul className={className}>
    {breeds.map((breed) => (
      <li
        className="px-4 py-2 font-semibold text-sm bg-gray-300 text-gray-700 rounded-full shadow-sm inline-block mr-2 mb-2"
        key={breed.name}
      >
        {breed.name}
      </li>
    ))}
  </ul>
);

export default TypeBreedsTags;
