import ContactGrid from "@/components/ContactGrid";
import { Flex, Input, Spinner, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import contactApi from "@/api/modules/contacts.api";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { IoPersonAddSharp, IoSearch } from "react-icons/io5";

interface Contact {
  _id: string;
  contactName: string;
  mobileNumber?: string;
  email?: string;
  user: string;
}

const Dashboard = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddContact = () => {
    // Logic to handle adding a contact
    console.log("Add Contact clicked");
  };

  const handleContactSearch = () => {
    // Logic to handle contact search, if any specific action is needed
    console.log("Search clicked", searchTerm);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await contactApi.getAll();

        if (res.status === "error") {
          toast.error(res.err?.message || "Something went wrong");
        } else if (res.status === "success" && res.data) {
          setContacts(res.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="column" p={4} alignItems="center" gap={10}>
      {/* Search and Add Contact Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        mb={4}
        gapY={4}
        width={{ base: "80%", sm: "70%", lg: "50%" }}
      >
        {/* Search Input */}
        <Flex width="100%" align="center">
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            flex="1"
            mr={4}
          />
          <IconButton
            aria-label="Search"
            onClick={handleContactSearch}
            variant="subtle"
            width="auto"
          >
            <IoSearch />
          </IconButton>
        </Flex>

        {/* Add Contact Button */}
        <Button
          colorScheme="teal"
          onClick={handleAddContact}
          ml={{ base: 0, md: 4 }}
          width={{ base: "100%", md: "30%" }}
        >
          <IoPersonAddSharp /> Add Contact
        </Button>
      </Flex>

      {/* Contact Grid */}
      <ContactGrid contacts={contacts} />
    </Flex>
  );
};

export default Dashboard;
