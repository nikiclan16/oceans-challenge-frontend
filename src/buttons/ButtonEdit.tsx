import { IconEdit } from "../icons/IconEdit";

interface ButtonProps {
  action: () => void;
}
export const ButtonEdit = ({ action }: ButtonProps) => {
  return (
    <button onClick={() => action()}>
      <IconEdit />
    </button>
  );
};
