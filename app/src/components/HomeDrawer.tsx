import React, { JSXElementConstructor, ReactElement } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

export type buttonSubmit = {
  text: string,
  formId: string,
  icon?: ReactElement<IconType, string | JSXElementConstructor<IconType>>,
}

type homeDraweProps = {
  drawerPlacement: DrawerProps['placement'],
  isOpen: boolean,
  onClose: () => void,
  headerText: string,
  Form: ReactJSXElement,
  buttonProps: buttonSubmit,
}


export const HomeDrawer = ({drawerPlacement, isOpen, onClose, headerText, Form, buttonProps}:homeDraweProps) => {
  return (
    <Drawer
      placement={drawerPlacement}
      isOpen={isOpen}
      onClose={onClose}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {headerText}
          </DrawerHeader>

          <DrawerBody>
            {Form}
          </DrawerBody>

          <DrawerFooter>
              <Button
                type="submit"
                form={buttonProps.formId}
                leftIcon={buttonProps.icon}
                colorScheme="primary"
              >
                {buttonProps.text}
              </Button>
          </DrawerFooter>

        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};
