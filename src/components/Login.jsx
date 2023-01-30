import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }, []);

  const onLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    if (password?.length >= 8) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      navigate("/home");
    }
  };

  return (
    <div className="flex items-center justify-center bg-bg-login bg-cover h-screen">
      <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-black sm:text-2xl">
          Logo
        </div>
        <div className="mt-8">
          <form onSubmit={onLogin} autoComplete="off">
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray text-blue shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                  </svg>
                </span>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="sign-in-email"
                  className=" rounded-r-lg flex-1 appearance-none border border-gray w-full py-2 px-4 bg-white text-black placeholder-gray shadow-sm text-base focus:outline-none focus:border-transparent"
                  placeholder="Usuario"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray text-blue shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  id="sign-in-password"
                  className=" rounded-r-lg flex-1 appearance-none border border-gray w-full py-2 px-4 bg-white text-black placeholder-gray shadow-sm text-base focus:outline-none focus:border-transparent"
                  placeholder="Contraseña"
                />
              </div>
            </div>
            <div className="flex items-center mb-6 -mt-4">
              <div className="flex ml-auto">
                <a
                  href="#/"
                  className="inline-flex text-xs font-thin text-black sm:text-sm"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className="py-2 px-4 bg-blue text-white w-full text-center text-base font-semibold focus:outline-none rounded-lg"
              >
                ACCEDER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
