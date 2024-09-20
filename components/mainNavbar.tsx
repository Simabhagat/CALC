"use client"

import axios from "axios";
import { useSession, signIn , signOut} from "next-auth/react"
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    User,
  } from "@nextui-org/react";


const MainNavbar: React.FC = () => {
  const { data: session} = useSession();
  // console.log("Session.user.id: " + session?.user?.id);
  // axios.get(`/users?id=${session?.user?.id}`)
  // .then(response => {
  //   console.log( "response" + response.data); // Handle success
  // })
  // .catch(error => {
  //   console.error(error); // Handle error
  // });
    return (
      <Navbar shouldHideOnScroll>
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/">
              Apps
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Games
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Movies
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
              {session? (
                  <div className="flex mb-2 justify-center gap-2">
                   <User as={Link} href={"/"}
                      name={session?.user?.name || "unauthorized"}
                      avatarProps={{
                        src: session?.user?.image || "https://i.pravatar.cc/150?u=a04258114e29026702d"
                      }}
                    />
                    <Button as={Link} onClick={() => signOut()} color="primary" href="#" variant="flat">
                    Sign Out
                  </Button>
                  </div>) :
                  (<Button as={Link} onClick={() => signIn("google")} color="primary" href="#" variant="flat">
                    Sign In
                  </Button>)
              }
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    );
  };

export default MainNavbar;

