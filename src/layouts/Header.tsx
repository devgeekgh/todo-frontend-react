import { ReactNode, useContext } from 'react'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

import { AuthContext, AuthContextInterface } from '../contexts/auth'
import { getAuthToken } from '../utils'

const Links = ['Todo']

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
)

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const authContext: AuthContextInterface | undefined = useContext(AuthContext)
  const token = getAuthToken()

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map((link) => (
                <Link as={RouterLink} key={link} to="/">
                  {link}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            {!authContext?.user && !token ? (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={3}
              >
                <Link
                  as={RouterLink}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  _hover={{
                    bg: 'pink.300',
                  }}
                  p="5px 10px"
                  rounded="5px"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  p="5px 10px"
                  rounded="5px"
                  fontWeight={600}
                  as={RouterLink}
                  to="/register"
                  color={'white'}
                  bg={'pink.400'}
                  _hover={{
                    bg: 'pink.300',
                  }}
                >
                  Register
                </Link>
              </Stack>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar size={'sm'} src={''} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={authContext?.removeLocalStorageToken}>
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}
