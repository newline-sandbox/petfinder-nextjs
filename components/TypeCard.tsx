import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimalType } from "../shared/interfaces/petfinder.interface";
import { BlurhashCanvas } from "react-blurhash";

export interface TypeCardProps {
  className?: string;
  type: AnimalType;
}

const TypeCard: FC<TypeCardProps> = ({ className, type }) => (
  <li
    className={`col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200${
      className ? ` ${className}` : ""
    }`}
  >
    <div className="flex-1 flex flex-col p-8">
      <div className="relative block overflow-hidden w-40 h-40 flex-shrink-0 mx-auto rounded-full">
        {type.blurhash && (
          <BlurhashCanvas
            {...type.blurhash}
            punch={1}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        )}
        {type.img && (
          <Image
            src={type.img.src}
            objectPosition={type.img.objectPosition}
            alt={type.name}
            layout="fill"
            objectFit="cover"
          />
        )}
      </div>
      <h3 className="mt-6 text-gray-900 text-m font-medium">{type.name}</h3>
    </div>
    <div>
      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="w-0 flex-1 flex">
          <Link
            href={{
              pathname: "/types/[type]",
              query: { type: type.id },
            }}
          >
            <a className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
              <span className="ml-3">Browse Listings</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  </li>
);

export default TypeCard;
