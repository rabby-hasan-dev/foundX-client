'use client'

import { Avatar } from '@nextui-org/avatar';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const NavbarDropdwon = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  }

  return (
    <Dropdown>
      <DropdownTrigger>

        <Avatar name="joe" />

      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation('/profile')} >Profile</DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/settings")} >Settings</DropdownItem>
        <DropdownItem onClick={() => handleNavigation('/profile/create-post')} >Create Post</DropdownItem>
        {/* <DropdownItem onClick={() => handleNavigation("/profile/claim-requests")} >Claim Requests</DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/about")} >About</DropdownItem> */}
        <DropdownItem  className="text-danger" color="danger">
         Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdwon;