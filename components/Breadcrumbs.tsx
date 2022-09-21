import { FC } from "react";
import Link from "next/link";

interface BreadcrumbsProps {
  className?: string;
  pages: {
    name: string;
    url: string;
  }[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ className, pages }) => (
  <nav
    className={`flex${className ? ` ${className}` : ""}`}
    aria-label="Breadcrumb"
  >
    <ol role="list" className="flex items-center space-x-4">
      <li>
        <div>
          <Link href="/">
            <a className="text-gray-400 hover:text-gray-500">
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 16 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="flex-shrink-0 h-5 w-5"
                aria-hidden="true"
              >
                <g
                  stroke="none"
                  strokeWidth="1"
                  fill="currentColor"
                  fillRule="evenodd"
                >
                  <path d="M8.69471202,0.292786454 C8.30421217,-0.0975954846 7.67121187,-0.0975954846 7.28071202,0.292786454 L0.280712021,7.29278645 C-0.0982601888,7.68516534 -0.0928403531,8.30887123 0.292893445,8.69460503 C0.678627244,9.08033883 1.30233313,9.08575866 1.69471202,8.70678645 L1.98771202,8.41378645 L1.98771202,14.9997865 C1.98771202,15.5520712 2.43542727,15.9997865 2.98771202,15.9997865 L4.98771202,15.9997865 C5.53999677,15.9997865 5.98771202,15.5520712 5.98771202,14.9997865 L5.98771202,12.9997865 C5.98771202,12.4475017 6.43542727,11.9997865 6.98771202,11.9997865 L8.98771202,11.9997865 C9.53999677,11.9997865 9.98771202,12.4475017 9.98771202,12.9997865 L9.98771202,14.9997865 C9.98771202,15.5520712 10.4354273,15.9997865 10.987712,15.9997865 L12.987712,15.9997865 C13.5399968,15.9997865 13.987712,15.5520712 13.987712,14.9997865 L13.987712,8.41378645 L14.280712,8.70678645 C14.6730909,9.08575866 15.2967968,9.08033883 15.6825306,8.69460503 C16.0682644,8.30887123 16.0736842,7.68516534 15.694712,7.29278645 L8.69471202,0.292786454 Z"></path>
                </g>
              </svg>
              <span className="sr-only">Home</span>
            </a>
          </Link>
        </div>
      </li>
      {pages.map(({ name, url }) => (
        <li key={name}>
          <div className="flex items-center">
            <svg
              width="6px"
              height="9px"
              viewBox="0 0 6 9"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="hidden sm:block h-3 w-auto flex-none text-gray-300"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentcolor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="0 0 3.5 3.25 0 6.5"></polyline>
              </g>
            </svg>
            <Link href={url}>
              <a className="ml-2 text-m font-medium text-gray-400 hover:text-gray-500">
                {name}
              </a>
            </Link>
          </div>
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
