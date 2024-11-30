import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FcContacts } from "react-icons/fc";

const Logo: React.FC = () => {
  return (
    <Box>
      <Link to="/">
        <Heading
          size="lg"
          fontWeight="extrabold"
          display="flex"
          gap="3"
          alignItems="center"
          fontFamily="Poppins, sans-serif"
          color="teal.500"
        >
          <FcContacts size={25} />
          <Text
            fontSize="lg"
            fontWeight="bold"
            bgGradient="linear(to-r, teal.400, blue.500)"
            letterSpacing={4}
            fontFamily="sans-serif"
          >
            CONTACTS
          </Text>
        </Heading>
      </Link>
    </Box>
  );
};

export default Logo;
