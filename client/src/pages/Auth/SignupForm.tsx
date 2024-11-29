import React, { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  Input,
  Heading,
  useBreakpointValue,
  Grid,
  Separator, // Using Grid instead of HStack
} from "@chakra-ui/react";
import {
  PasswordInput,
  PasswordStrengthMeter,
} from "@/components/ui/password-input";
import { Field } from "@/components/ui/field";
import { Formik, Field as FormikField, FormikHelpers } from "formik";

// Password Strength function
const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength++; // Length must be 8+
  if (password.match(/[a-z]/)) strength++; // Must contain lowercase
  if (password.match(/[A-Z]/)) strength++; // Must contain uppercase
  if (password.match(/[0-9]/)) strength++; // Must contain number
  if (password.match(/[@$!%*?&]/)) strength++; // Must contain special character

  return strength; // returns a value between 0 and 5
};

// Validation function
const validate = (values: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const errors: {
    email?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
  } = {};

  // Email Validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Username Validation
  if (!values.username) {
    errors.username = "Username is required";
  }

  // Password Validation
  if (!values.password) {
    errors.password = "Password is required";
  } else {
    const passwordStrength = calculatePasswordStrength(values.password);

    if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "Password must contain at least one lowercase letter";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(values.password)) {
      errors.password = "Password must contain at least one number";
    } else if (!/[@$!%*?&]/.test(values.password)) {
      errors.password = "Password must contain at least one special character";
    } else if (passwordStrength < 5) {
      errors.password = "Password must meet all the strength requirements.";
    }
  }

  // Confirm Password Validation
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

// Submit function
const onSubmit = (
  values: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  },
  actions: FormikHelpers<{
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }>
) => {
  console.log(values);
  actions.setSubmitting(false);
};

const SignupForm: React.FC<{ toggleAuthMode: () => void }> = ({
  toggleAuthMode,
}) => {
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Handle password strength calculation
  const handlePasswordChange = (password: string) => {
    setPasswordStrength(calculatePasswordStrength(password));
  };

  return (
    <Flex align="center" justify="center" h="80vh">
      <Box
        display="flex"
        flexDirection="column" // Stack vertically by default
        p={8}
        gap={4}
        rounded="md"
        w={useBreakpointValue({ base: "90%", sm: "80%", md: "70%" })}
        boxShadow="md"
        alignItems="center"
        justifyContent="center"
      >
        <Heading fontSize="2xl" textAlign="center">
          Create an Account 🎉
        </Heading>
        <Separator size="sm" marginBottom="10px" px={10} w="40%" />

        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          }}
          validate={validate} // using the extracted validate function
          onSubmit={onSubmit} // using the extracted onSubmit function
        >
          {({ handleSubmit, values, errors, touched, handleChange }) => (
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <VStack gap="20px" align="stretch">
                {/* Grid layout for Username, Email, Password, and Confirm Password */}
                <Grid
                  templateColumns={["1fr", "1fr 1fr"]} // Single column on small screens, 2 columns on larger screens
                  gap={4}
                >
                  {/* Username Field */}
                  <Field
                    label="Username"
                    required
                    errorText={errors.username}
                    invalid={touched.username && !!errors.username}
                  >
                    <FormikField
                      name="username"
                      as={Input}
                      placeholder="Your username"
                      variant="outline"
                      onChange={handleChange}
                      value={values.username}
                    />
                  </Field>

                  {/* Email Field */}
                  <Field
                    label="Email"
                    required
                    errorText={errors.email}
                    invalid={touched.email && !!errors.email}
                  >
                    <FormikField
                      name="email"
                      as={Input}
                      placeholder="me@example.com"
                      variant="outline"
                      onChange={handleChange}
                      value={values.email}
                    />
                  </Field>

                  {/* Password Field */}
                  <Field
                    label="Password"
                    required
                    errorText={errors.password}
                    invalid={touched.password && !!errors.password}
                  >
                    <FormikField
                      name="password"
                      as={PasswordInput}
                      placeholder="Enter your password"
                      variant="outline"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        handlePasswordChange(e.target.value); // update password strength
                      }}
                      value={values.password}
                    />
                    <PasswordStrengthMeter
                      marginTop="5px"
                      value={passwordStrength}
                      minWidth="40%"
                    />
                  </Field>

                  {/* Confirm Password Field */}
                  <Field
                    label="Confirm Password"
                    required
                    errorText={errors.confirmPassword}
                    invalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  >
                    <FormikField
                      name="confirmPassword"
                      as={PasswordInput}
                      placeholder="Confirm your password"
                      variant="outline"
                      onChange={handleChange}
                      value={values.confirmPassword}
                    />
                  </Field>
                </Grid>

                <Button
                  colorScheme="blue"
                  type="submit"
                  width="full"
                  disabled={passwordStrength < 5}
                >
                  Sign Up
                </Button>
              </VStack>
            </form>
          )}
        </Formik>

        <Text
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap="10px"
          justifyContent="center"
          margin="20px"
          fontSize="sm"
        >
          Already have an account?
          <Button onClick={toggleAuthMode} variant="subtle">
            Login
          </Button>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignupForm;