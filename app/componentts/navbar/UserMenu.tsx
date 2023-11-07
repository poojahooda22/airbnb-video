'use client';

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";

import useRentModal from "@/app/hooks/useRentModal";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useEffect, useRef} from "react";
import { SafeUser } from "@/app/types";


interface UserMenuProps {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser
}) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleClickOutside = useCallback((event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toggleOpen();
    }
  }, [toggleOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const onRent = useCallback(() => {
    if(!currentUser) {
      return loginModal.onOpen();
    }

    //open rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);


  return ( 
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
            onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Airbnb your home
        </div>
        <div 
        onClick={toggleOpen}
        className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div 
          className="
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer" ref={modalRef} >
              {currentUser ? (
                <>
                  <MenuItem 
                    label="My Trips" 
                    onClick={() => router.push('/trips')}
                  />
                  <MenuItem 
                    label="My favorites" 
                    onClick={() => router.push('/favorites')}
                  />
                  <MenuItem 
                    label="My reservations" 
                    onClick={() => router.push('/reservations')}
                  />
                  <MenuItem 
                    label="My properties" 
                    onClick={() => router.push('/properties')}
                  />
                  <MenuItem 
                    label="Airbnb my home" 
                    onClick={rentModal.onOpen}
                  />
                  <MenuItem 
                    label="Logout" 
                    onClick={() => signOut()}
                  />
                </>
              ) : (
                <>
                  <MenuItem 
                    label="Login" 
                    onClick={loginModal.onOpen}
                  />
                  <MenuItem 
                    label="Sign up" 
                    onClick={registerModal.onOpen}
                  />
                </>
              )}
          </div>
        </div>
      )}
    </div>
   );
}
 
export default UserMenu;