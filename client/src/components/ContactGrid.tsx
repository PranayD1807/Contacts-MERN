import React from "react";
import { Grid, Box, Text, IconButton, Flex } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar"; // Assuming you have a custom Avatar component

import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
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
        md: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={5}
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
          flexDirection="row"
          justifyContent="space-between"
        >
          <Box pr={4}>
            <Box display="flex" alignItems="center">
              {/* Avatar */}
              <Avatar
                name={contact.contactName}
                src={getRandomImage()}
                mr={3}
              />
              {/* Name and mobile number */}
              <Box flexGrow={1}>
                <Text fontSize="sm" fontWeight="medium" maxLines={1}>
                  {contact.contactName}
                </Text>
                {contact.mobileNumber && (
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    maxLines={1}
                    textOverflow="ellipsis"
                  >
                    {contact.mobileNumber}
                  </Text>
                )}
              </Box>
            </Box>

            {contact.email && (
              <Text
                color="gray.500"
                mt={2}
                maxLines={1}
                textOverflow="ellipsis"
                fontSize="sm"
              >
                Email: {contact.email}
              </Text>
            )}
          </Box>
          <Flex direction="column" gap={2}>
            {/* Edit button */}
            <IconButton
              aria-label="Delete"
              key="delete"
              variant="subtle"
              rounded="full"
              size="xs"
            >
              <MdOutlineEdit />
            </IconButton>
            {/* delete button */}
            <IconButton
              aria-label="Delete"
              key="delete"
              variant="subtle"
              rounded="full"
              size="xs"
            >
              <MdOutlineDelete />
            </IconButton>
          </Flex>
        </Box>
      ))}
    </Grid>
  );
};

export default ContactGrid;
