
import { useBreakpointValue } from "@chakra-ui/react";
import DesktopHeader from "./headers/DesktopHeader";
import MobileHeader from "./headers/MobileHeader";

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default Header;
