interface ButtonProps {
  name: string;
  action: () => void;
  isActive: boolean;
}

export const ButtonSubNav = ({ name, action, isActive }: ButtonProps) => {
  return (
    <button
      className={`flex h-[28px] border-b-2 ${
        isActive
          ? "border-[#535bf2] text-[#535bf2]"
          : "border-transparent text-white"
      }`}
      onClick={() => action()}
    >
      {name}
    </button>
  );
};
