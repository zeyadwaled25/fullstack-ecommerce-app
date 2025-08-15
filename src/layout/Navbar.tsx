'use client'

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  // useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  Link,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import CookieService from "../services/CookieService";
import { useSelector } from 'react-redux';
import { selectCart } from '../app/features/cart/cartSlice';

interface Props {
  children: React.ReactNode
  to: string
}

const Links = ['Home', 'Dashboard', 'products']

const NavLink = (props: Props) => {
  const { children, to } = props

  return (
    <Link
      as={RouterLink}
      to={to}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Link>
  )
}

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const token = CookieService.get('jwt');

  const logoutHandler = () => {
    CookieService.remove('jwt')
    window.location.reload()
  }

  const {cartProducts} = useSelector(selectCart)

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={4} alignItems={'center'}>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                (link == 'Home') ? <NavLink to={"/"} key={link}>{link}</NavLink>
                : <NavLink to={link.toLowerCase()} key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={4}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Button onClick={() => {}}>Cart ({cartProducts.length})</Button>
              {token? 
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
              : 
              <HStack as={'nav'} spacing={4} display={{base: "none", md: "flex"}}>
                <NavLink to={"/login"} key={"login"}>{'Login'}</NavLink>
              </HStack>}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}