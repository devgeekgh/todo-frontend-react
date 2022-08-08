import {
  Box,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Link,
  Input,
  VStack,
} from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { useFormik } from 'formik'
import { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import * as Yup from 'yup'

import { AuthContext } from '../../../contexts/auth'
import { login } from '../../../services/api'
import { UserLoginPayload } from '../../../types'

type LoginError = {
  detail: string
}

export const Login = () => {
  const authContext = useContext(AuthContext)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('This field is required'),
      password: Yup.string().required('This field is required'),
    }),
    onSubmit: (values: UserLoginPayload) => {
      login(values)
        .then(({ data: token }) => {
          formik.resetForm()
          authContext?.setLocalStorageToken(token)
        })
        .catch((error: AxiosError<LoginError>) => {
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
            <Button type="submit" colorScheme="purple" width="full">
              Login
            </Button>
            <Link
              as={RouterLink}
              color="teal.500"
              to="/register"
              w="100%"
              textAlign="center"
            >
              Register
            </Link>
          </VStack>
        </form>
      </Box>
    </Flex>
  )
}
