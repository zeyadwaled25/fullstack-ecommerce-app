'use client'

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Highlight,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from '@chakra-ui/react'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLogin, userLogin } from '../app/features/login/loginSlice'
import type { AppDispatch } from '../app/store'
import { Navigate } from 'react-router-dom'

interface IProps {
  isAuthenticated: boolean
}

export default function LoginPage({isAuthenticated}: IProps) {
  const dispatch = useDispatch<AppDispatch>()
  const {loading} = useSelector(selectLogin)

  const [user, setUser] = useState({
    identifier: "",
    password: ""
  })
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setUser({...user, [name]: value})
  }

  const submitHandler = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!user.identifier && !user.password) {
      setIsEmail(true)
      setIsPassword(true)
      return
    }
    if (!user.identifier) {
      setIsEmail(true)
    }
    if (!user.password) {
      setIsPassword(true)
    }
    setIsEmail(false)
    setIsPassword(false)
    dispatch(userLogin(user))
  }

  // protected route
  if (isAuthenticated) return <Navigate to={"/"} replace/>

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            <Highlight query={'features'} styles={{color: 'blue.400'}}>
              to enjoy all of our cool features ✌️
            </Highlight>
          </Text>
        </Stack>
        <Box
          as='form'
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          onSubmit={submitHandler}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="identifier"
                isInvalid={isEmail}
                errorBorderColor='red.500'
                placeholder='Enter Your Email:'
                value={user.identifier}
                onChange={onChangeHandler}/>
                {isEmail ? <FormHelperText color={'red.500'}>Email is required.</FormHelperText> : null}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name={'password'}
                  isInvalid={isPassword}
                  errorBorderColor='red.500'
                  placeholder='Enter Your Password:'
                  value={user.password}
                  onChange={onChangeHandler}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword ? <FormHelperText color={'red.500'}>Password is required.</FormHelperText> : null}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={isEmail || isPassword ? 'red.400' : 'blue.400'}
                color={'white'}
                _hover={{
                  bg: isEmail || isPassword ? 'red.600' : 'blue.600',
                }}
                type='submit'
                isLoading={loading}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}