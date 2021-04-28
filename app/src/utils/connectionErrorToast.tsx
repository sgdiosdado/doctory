import { UseToastOptions } from "@chakra-ui/react";

export const connectionErrorToast = () => ({
  title: 'Error de conexión',
  description: 'Comprueba tu conexión de internet e intenta de nuevo.',
  status: 'error',
  duration: 5000,
  isClosable: true,
  position: 'top',
  variant: 'left-accent'
} as UseToastOptions)