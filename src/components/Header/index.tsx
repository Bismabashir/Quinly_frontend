type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  return <h1 className="text-md font-semibold text-gray-700">{name}</h1>;
};

export default Header;
