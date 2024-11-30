import React from "react";
import { Grid, Box, Text, IconButton } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar"; // Assuming you have a custom Avatar component

import { MdOutlineDelete } from "react-icons/md";
interface Contact {
  _id: string;
  contactName: string;
  mobileNumber?: string;
  email?: string;
}

interface ContactGridProps {
  contacts: Contact[];
}

// Function to generate random profile pictures
const getRandomImage = (): string => {
  return `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;
};

const ContactGrid: React.FC<ContactGridProps> = ({ contacts }) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={4}
      p={4}
    >
      {contacts.map((contact) => (
        <Box
          key={contact._id}
          border="1px"
          borderRadius="md"
          p={4}
          boxShadow="md"
          display="flex"
          flexDirection="column"
        >
          <Box display="flex" alignItems="center" mb={2}>
            {/* Avatar */}
            <Avatar name={contact.contactName} src={getRandomImage()} mr={4} />
            {/* Name and mobile number */}
            <Box flexGrow={1}>
              <Text fontSize="lg" fontWeight="medium" maxLines={1}>
                {contact.contactName}
              </Text>
              {contact.mobileNumber && (
                <Text color="gray.500" maxLines={1} textOverflow="ellipsis">
                  {contact.mobileNumber}
                </Text>
              )}
            </Box>
            {/* delete button */}
            <IconButton
              aria-label="Delete"
              key="delete"
              variant="subtle"
              rounded="full"
            >
              <MdOutlineDelete />
            </IconButton>
          </Box>

          {contact.email && (
            <Text color="gray.500" mt={2} maxLines={1} textOverflow="ellipsis">
              Email: {contact.email}
            </Text>
          )}
        </Box>
      ))}
    </Grid>
  );
};

export default ContactGrid;
