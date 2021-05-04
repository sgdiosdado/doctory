import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { AppRouter } from "./routes/AppRouter"
import { customTheme } from "./theme/customTheme"
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from "./provider/AuthProvider"
 
const queryClient = new QueryClient()

export const DoctoryApp = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <AppRouter />
      </ChakraProvider>
    </QueryClientProvider>
  </AuthProvider>
)
