import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { AppRouter } from "./routes/AppRouter"
import { customTheme } from "./theme/customTheme"
import { QueryClient, QueryClientProvider } from 'react-query'
 
const queryClient = new QueryClient()

export const DoctoryApp = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={customTheme}>
      <AppRouter />
    </ChakraProvider>
  </QueryClientProvider>
)
