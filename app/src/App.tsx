import * as React from "react"
import {
  ChakraProvider,
  extendTheme,
  // theme,
} from "@chakra-ui/react"
// import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Navbar } from "./components/Navbar/Navbar"

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e5f8ff',
      100: '#bde1f6',
      200: '#94c8eb',
      300: '#6aade2',
      400: '#4291d7',
      500: '#2b72bf',
      600: '#205595',
      700: '#143a6b',
      800: '#082742',
      900: '#00101b',
    }
  }
})

export const App = () => (
  

  <ChakraProvider theme={theme}>
    <Navbar />
  </ChakraProvider>
)
