interface ButtonProps {
  onClick: () => void;
  Icon: () => React.ReactElement;
}
export const ButtonIcon = ({ onClick, Icon }: ButtonProps) => {
  return (
    <button onClick={onClick}>
      <Icon />
    </button>
  );
};
