import { UseToastOptions } from "@chakra-ui/react";

export const connectionErrorToast = (isDesktop:Boolean) => ({
  title: 'Error de conexión',
  description: 'Comprueba tu conexión de internet e intenta de nuevo.',
  status: 'error',
  duration: 5000,
  isClosable: true,
  position: isDesktop ? 'top-left' : 'top',
  variant: 'left-accent'
} as UseToastOptions)