import Link from "next/link";

const MenuItem = ({
  label,
  isactive,
  onClick,
  children,
}: {
  label: string;
  isactive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const activeClasses = "text-black font-bold  ml-7";
  const inactiveClasses = "text-gray-500 ml-7";
  const classes = isactive ? activeClasses : inactiveClasses;

  return (
    <button
      onClick={onClick}
      className={`relative flex items-center w-full text-left ${classes}`}>
      {isactive && (
        <div className="absolute w-[6px] h-[40px] bg-[#1AA683] -left-7 rounded-r-lg"></div>
      )}
      {children}
      <span className="ml-4">{label}</span>
    </button>
  );
};

export default MenuItem;
