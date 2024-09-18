'use client'

import { useUser } from '@/src/context/user.provider';
import { logOut } from '@/src/services/AuthService';
import { Avatar } from '@nextui-org/avatar';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { useRouter } from 'next/navigation';


const NavbarDropdwon = () => {
  const { user, setIsLoading: userLoading } = useUser();
  const router = useRouter();

  console.log( 'avater photo',user?.profilePhoto);
  const handleNavigation = (path: string) => {
    router.push(path);
  }
  const handleLogout = () => {
    logOut()
    userLoading(true);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar  src={user?.profilePhoto || undefined} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation('/profile')} >Profile</DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/settings")} >Settings</DropdownItem>
        <DropdownItem onClick={() => handleNavigation('/profile/create-post')} >Create Post</DropdownItem>
        {/* <DropdownItem onClick={() => handleNavigation("/profile/claim-requests")} >Claim Requests</DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/about")} >About</DropdownItem> */}
        <DropdownItem onClick={handleLogout} className="text-danger" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdwon;