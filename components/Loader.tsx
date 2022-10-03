import { FC, ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoaderProps {
  className?: string;
  children?: ReactNode;
}

const Loader: FC<LoaderProps> = ({ className, children }) => (
  <div
    className={`${
      children
        ? className
        : `flex items-center h-8 text-gray-500 ${
            className ? ` ${className}` : ""
          }`
    }`}
  >
    <LoadingSpinner />
    {children ? children : <p className="ml-2 text-lg">Loading...</p>}
  </div>
);

export default Loader;
