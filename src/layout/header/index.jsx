import { Typography } from "antd";
import Logo from "@/assets/images/logo.png";

const Header = () => {
  const { Text } = Typography;

  return (
    <div className="h-16 flex items-center w-full bg-[#eeeeee]">
      <img src={Logo} alt="Logo" width={60} className="mr-2" />
      <Text className="font-bold text-lg sm:text-xl lg:text-2xl">
        Simple Dashboard 3D
      </Text>
    </div>
  );
};

export default Header;
