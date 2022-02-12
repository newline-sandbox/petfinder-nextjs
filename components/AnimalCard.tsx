import { FC } from "react";
import Image from "next/image";
import { decode } from "html-entities";
import sanitizeHtml from "sanitize-html";
import { Animal } from "../shared/interfaces/petfinder.interface";

// Source: https://heroicons.com/
const CheckCircle: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

// Source: https://heroicons.com/
const XCircle: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

interface AnimalAttributesProps {
  label: string;
  isTrue: boolean;
}

const AnimalAttribute: FC<AnimalAttributesProps> = ({ label, isTrue }) => (
  <li className="leading-3 inline-block px-3 py-1 bg-white rounded-full shadow-sm border-style border border-gray-100 mr-2 mt-1.5">
    <span className="inline-block text-gray-500 font-semibold text-xs mr-1.5">
      {label}
    </span>
    {isTrue ? (
      <CheckCircle className="h-4 w-auto inline-block text-green-500" />
    ) : (
      <XCircle className="h-4 w-auto inline-block text-red-500" />
    )}
  </li>
);

export interface AnimalCardProps {
  className?: string;
  animal: Animal;
}

const AnimalCard: FC<AnimalCardProps> = ({ className, animal }) => (
  <li
    className={`bg-white shadow sm:rounded-md block${
      className ? ` ${className}` : ""
    }`}
  >
    <a
      href={animal.url}
      target="_blank"
      rel="noreferrer"
      className="block hover:bg-gray-50"
    >
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="flex-shrink-0">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image
                src={
                  animal.photos.length > 0
                    ? animal.photos[0].small
                    : "https://via.placeholder.com/100"
                }
                alt={`Photo of ${animal.name}`}
                objectFit="cover"
                layout="fill"
              />
            </div>
          </div>
          <div className="min-w-0 flex-1 px-4">
            <div className="flex flex-col">
              <div>
                <div className="flex items-center">
                  <p className="text-m font-medium text-purple-700 mr-3">
                    {animal.name}
                  </p>
                  <ol className="flex items-center text-sm text-gray-500 list-none">
                    {[animal.breeds.primary, animal.age, animal.gender].map(
                      (attribute) => (
                        <li
                          className="px-1.5 py-px font-regular text-xs bg-purple-400 text-white rounded-full shadow-sm mr-1"
                          key={attribute}
                        >
                          {attribute}
                        </li>
                      )
                    )}
                  </ol>
                </div>
                {animal.description ? (
                  <p
                    className="text-gray-500 text-sm line-clamp-1"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(decode(animal.description)),
                    }}
                  ></p>
                ) : (
                  <p className="text-gray-500 text-sm line-clamp-1">---</p>
                )}
              </div>
              <div>
                <ul className="flex list-style-none">
                  {[
                    {
                      label: "House Trained",
                      isTrue: animal.attributes.house_trained,
                    },
                    {
                      label: "Up-To-Date Shots",
                      isTrue: animal.attributes.shots_current,
                    },
                    {
                      label: "Spayed and Neutered",
                      isTrue: animal.attributes.spayed_neutered,
                    },
                    {
                      label: "Declawed",
                      isTrue: animal.attributes.declawed,
                    },
                  ].map((attribute) => (
                    <AnimalAttribute
                      key={attribute.label}
                      label={attribute.label}
                      isTrue={attribute.isTrue}
                    />
                  ))}
                </ul>
                <ul className="list-style-none mt-1.5 flex">
                  {animal.contact.email && (
                    <li className="flex items-center text-sm text-gray-500 mr-2">
                      <svg
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        x-description="Heroicon name: solid/mail"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      <a href={`mailto:${animal.contact.email}`}>
                        {animal.contact.email}
                      </a>
                    </li>
                  )}
                  {animal.contact.phone && (
                    <li className="flex items-center text-sm text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <a href={`tel:${animal.contact.phone}`}>
                        {animal.contact.phone}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <svg
            className="h-5 w-5 text-gray-400"
            x-description="Heroicon name: solid/chevron-right"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </a>
  </li>
);

export default AnimalCard;
