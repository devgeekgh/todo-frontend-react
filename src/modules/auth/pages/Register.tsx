import {
  Box,
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  VStack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link as RouterLink } from 'react-router-dom'
import { AxiosError } from 'axios'

import { register } from '../../../services/api'
import { UserRegisterPayload } from '../../../types'
import { setAuthToken } from '../../../utils'

type RegisterError = {
  detail: string
}

export const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('This field is required'),
      password: Yup.string().required('This field is required'),
      confirm_password: Yup.string()
        .label('confirm password')
        .required('This field is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: (values: UserRegisterPayload) => {
      register(values)
        .then(({ data: token }) => {
          setAuthToken(token)
          formik.resetForm()
        })
        .catch((error: AxiosError<RegisterError>) => {
          const message = error.response?.data.detail

          formik.setFieldError('email', message)
        })
    },
  })
  return (
    <Flex bg="gray.100" align="center" justify="center">
      <Box bg="white" p={6} rounded="md" w="25%">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && (
                <Text color="tomato">{formik.errors.email}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && (
                <Text color="tomato">{formik.errors.password}</Text>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password Confirmation</FormLabel>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
              />
              {formik.errors.confirm_password && (
                <Text color="tomato">{formik.errors.confirm_password}</Text>
              )}
            </FormControl>
            <Button type="submit" colorScheme="purple" width="full">
              Register
            </Button>
            <Link
              as={RouterLink}
              to="/login"
              color="teal.500"
              w="100%"
              mt="1 !important"
              textAlign="center"
            >
              Login
            </Link>
          </VStack>
        </form>
      </Box>
    </Flex>
  )
}
