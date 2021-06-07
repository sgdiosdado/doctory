import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react"

export const customTheme =  extendTheme(
  withDefaultColorScheme({
    colorScheme: 'primary',
    components: ['Button']
  }),
  {
  colors: {
    primary: {
      50: '#b0c4ff',
      100: '#7ea1ff',
      200: '#4b82ff',
      300: '#1a66ff',
      400: '#0b5cff',
      500: '#003de6',
      600: '#0023b4',
      700: '#001082',
      800: '#000351',
      900: '#030021',
    }
  }
})
