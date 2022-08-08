import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

import { Header } from './Header'
import { Footer } from './Footer'

export const Base = ({ children }: { children: ReactNode }) => {
  return (
    <Box minH="100vh">
      <Header />
      {children}
    </Box>
  )
}
