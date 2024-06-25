import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  useDisclosure
} from '@chakra-ui/react';
import SearchUsers from './SearchUsers';

export default function MyDrawer({isOpen , onClose}) {
    return (
        <>
            <Drawer
              isOpen={isOpen}
              placement='left'
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader>Search User</DrawerHeader>
                <DrawerBody>
                  <Input placeholder='Search by name or email' />
                  <div className='mt-4 space-y-3'>
                      <SearchUsers/>
                      <SearchUsers/>
                      <SearchUsers/>
                  </div>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
        </>
    );
}