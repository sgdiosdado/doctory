import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { AppRouter } from "./routes/AppRouter"
import { customTheme } from "./customTheme"


export const DoctoryApp = () => (
  <ChakraProvider theme={customTheme}>
    <AppRouter />
  </ChakraProvider>
)
