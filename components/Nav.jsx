import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

import Link from 'next/link';
import Image from "next/image";


export { Nav };

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  // Only show nav when logged in
  if (!user) return null;


  

  function customer() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-myColor-500 pt-4 flex flex-col">
        <div>
          <Image
            class="basis-1/2 shrink"
            src={require('/pages/assets/BothniabladetHeader.png')}
            alt="Bothniabladet logga"
            width={700}
            height={"auto"}
            priority
          />
        </div>
      <nav className="bg-gradient-to-r from-teal-400 to-yellow-200 px-3 m-2">
        <div className="navbar-nav">
          <NavLink href="/" exact className="nav-item nav-link">Hem</NavLink>
          <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logga ut</button>
        </div>
      </nav>
    );
  }

    function photographer(){
      return (
        <nav className="navbar navbar-expand navbar-dark bg-myColor-500 pt-4 flex flex-col">
            <div>
              <Image
                class="basis-1/2 shrink"
                src={require('/pages/assets/BothniabladetHeader.png')}
                alt="Bothniabladet logga"
                width={700}
                height={"auto"}
                priority
              />
            </div>
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Hem</NavLink>
                <NavLink href="/account/imageupload" id="upload" className="nav-item nav-link">Ladda upp bilder</NavLink>
                <button onClick={userService.logout} className="btn btn-link nav-item nav-link">Logga ut</button>
            </div>
        </nav>
      )
    }
    function admin() {

        return <nav className="navbar navbar-expand navbar-dark bg-myColor-500 pt-4 flex flex-col">
          <div>
            <Image
              class="basis-1/2 shrink"
              src={require('/pages/assets/BothniabladetHeader.png')}
              alt="Bothniabladet logga"
              width={700}
              height={"auto"}
              priority
              />   
          </div>
          <div className="navbar-nav">
              <NavLink href="/" exact className="nav-item nav-link">Hem</NavLink>
              <NavLink href="/users" id="users" className="nav-item nav-link">Användare</NavLink>
              <NavLink href="/account/imageupload" id="upload" className="nav-item nav-link">Ladda upp bilder</NavLink>
              <button onClick={userService.logout} className="btn btn-link nav-item nav-link ">Logga ut</button>
          </div>
        return <nav className="navbar navbar-expand bg-gradient-to-r from-teal-400 to-yellow-200 px-1.5">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Hem</NavLink>
                <NavLink href="/users" id="users" className="nav-item nav-link">Användare</NavLink>
                <NavLink href="/account/imageupload" id="upload" className="nav-item nav-link">Ladda upp bilder</NavLink>
                <button onClick={userService.logout} className="btn btn-link nav-item nav-link ">Logga ut</button>
            </div>

        </nav>
    }

    if (user.userType === "customer") {
        return (customer());
    }else if (user.userType === "photographer"){
        return (photographer());
    }
    return (admin());
    }