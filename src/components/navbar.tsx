"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();
  const [loggedIn, setloggedIn] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("userEmail")) setloggedIn(true)

    }

  }, []);

  return (
    <nav className="bg-black-100 border-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              {/* Your logo or brand name */}
              <span className="text-white font-bold text-2xl  ">TeachMate</span>
            </div>
            <div className="hidden sm:block sm:ml-6">
              {/* Your nav links */}
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>

                {!loggedIn && <><Link
                  href="/sign"
                  // onClick={()=>{ router.push("/sign")}}
                  className="text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Signup
                </Link>
                  <Link
                    href="/login"
                    // onClick={()=>{ router.push("/login")}}
                    className="text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link></>
                }
                {
                  loggedIn &&
                  <>
                    <Link
                      href="/courses"
                      // onClick={()=>{ router.push("/courses")}}

                      className="text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                      Courses
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => {
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("userEmail");
                        router.push("/login");
                        setloggedIn(false);
                      }}
                      className="text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                    >
                      Logout
                    </Link>
                  </>

                }

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          {!loggedIn && <Link
            href="/sign"
            // onClick={()=>{ router.push("/sign")}}
            className="text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Signup
          </Link>
            
          }
          {!loggedIn&&<Link
              href="/login"
              // onClick={()=>{ router.push("/login")}}
              className="text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>}
          {
            loggedIn &&
            
              <Link
                href="/courses"
                // onClick={()=>{ router.push("/courses")}}

                className="text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Courses
              </Link>}
              {
            loggedIn &&
              <Link
                href="/login"
                onClick={() => {
                  localStorage.removeItem("authToken");
                  localStorage.removeItem("userEmail");
                  router.push("/login");
                  setloggedIn(false);
                }}
                className="text-gray-300 hover:bg-white hover:bg-opacity-5 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </Link> }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
