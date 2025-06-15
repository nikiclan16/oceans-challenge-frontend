import { IconDelete } from "../icons/IconDelete";

interface ButtonProps {
  action: () => void;
}

export const ButtonDelete = ({ action }: ButtonProps) => {
  return (
    <button onClick={() => action()}>
      <IconDelete />
    </button>
  );
};
