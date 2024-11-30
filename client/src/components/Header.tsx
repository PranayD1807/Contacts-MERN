import { Box, Heading } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ColorModeButton } from "@/components/ui/color-mode";

// icons
import { FcContacts } from "react-icons/fc";

const Header = () => {
  return (
    <chakra.header
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      {/* logo */}
      <Box px="40px" py="20px">
        <Link to="/">
          <Heading
            size="2xl"
            fontWeight="semibold"
            display="flex"
            gap="3"
            alignItems="center"
          >
            <FcContacts />
            CONTACTS
          </Heading>
        </Link>
      </Box>
      <ColorModeButton marginRight={8} variant="surface" />
    </chakra.header>
  );
};

export default Header;
