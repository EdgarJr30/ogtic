import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);

  const openMenu = () => {
    setIsShown((current) => !current);
  };

  const logout = () => {
    navigate("/");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  const userEmail = localStorage.getItem("email");

  return (
    <nav className="p-2 md:p-4 bg-white">
      <div className=" flex justify-between h-12 ">
        <div className="flex">
          <a
            rel="noopener noreferrer"
            href="/home"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 32 32"
              className="w-8 h-8 text-blue"
            >
              <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
              <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
            </svg>
          </a>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <a
                rel="noopener noreferrer"
                href="/home"
                className="flex items-center px-4 -mb-1 text-blue font-bold"
              >
                Botón de inicio
              </a>
            </li>
          </ul>
        </div>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <div
            href="#"
            className="flex items-center gap-2 relative cursor-pointer"
            onClick={openMenu}
          >
            <div className="bg-gray rounded-full h-8 w-8 flex items-center justify-center">
              <p className="text-white font-bold">
                {userEmail && userEmail[0]?.toUpperCase()}
              </p>
            </div>

            <p className="text-blue text-xs font-bold">
              {userEmail && userEmail?.toUpperCase()}
            </p>
          </div>

          {isShown && (
            <div className="absolute right-0 w-44 mt-24 origin-top-right rounded-md shadow-lg bg-gray ring-black ring-opacity-5 cursor-pointer">
              <div
                className="py-1 "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <span
                  onClick={logout}
                  className="flex items-center justify-center px-2 py-1 text-md text-black"
                  role="menuitem"
                >
                  <span className="flex flex-col">
                    <span>Cerrar Sesión</span>
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
        <button className="p-4 lg:hidden">
          <div className="bg-gray rounded-full h-8 w-8 flex items-center justify-center">
            <p className="text-white font-bold">
              {userEmail && userEmail[0].toUpperCase()}
            </p>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;