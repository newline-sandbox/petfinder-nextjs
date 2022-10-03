import { FC, SyntheticEvent } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface UpdateButtonProps {
  className?: string;
  isUpdating: boolean;
  handleOnClick: (evt: SyntheticEvent) => void;
  text: string;
  updateText: string;
}

const UpdateButton: FC<UpdateButtonProps> = ({
  className,
  isUpdating,
  handleOnClick,
  text,
  updateText,
}) => (
  <button
    type="button"
    className={`inline-flex items-center font-semibold leading-6 rounded-md text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 h-10 text-sm shadow transition ease-in-out duration-150${
      className ? ` ${className}` : ""
    }${isUpdating ? " cursor-not-allowed" : ""}`}
    onClick={handleOnClick}
    disabled={isUpdating}
  >
    {isUpdating && <LoadingSpinner className="-ml-1 mr-3 text-white" />}
    {isUpdating ? updateText : text}
  </button>
);

export default UpdateButton;
