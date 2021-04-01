import * as React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Button,
  Flex,
  HStack,
  Box,
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

type swtchProps = {
  label?: string,
  display?: { base: string; md: string; },
}

export const ColorModeSwitcher = ({label, display}: swtchProps) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <>
    {label ? 
    <Flex direction="row" justify='right'>
      <Button 
      onClick={toggleColorMode}
      display={display}
      fontSize={'md'}
      >
        <HStack spacing={2}>
          <Box>{label}</Box>
          <Box><SwitchIcon /></Box>
        </HStack>
      </Button>
      </Flex>
      : 
      <IconButton 
        display={display}
        size="md"
        fontSize="lg"
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        aria-label= {`Switch to ${text} mode`}
      />
    }
    </>
  )
}
