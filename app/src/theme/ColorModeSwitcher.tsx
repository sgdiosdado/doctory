import * as React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

type swtchProps = {
  display?: { base: string; md: string; },
}

export const ColorModeSwitcher = ({display}: swtchProps) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)

  return (
    <>
      <IconButton 
        display={display}
        size="md"
        variant="ghost"
        color="current"
        mx={2}
        onClick={toggleColorMode}
        icon={<SwitchIcon />}
        aria-label= {`Switch to ${text} mode`}
      />
    </>
  )
}
