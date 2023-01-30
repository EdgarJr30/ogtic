import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Navigation from "./Navigation";

const SingleUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [userRepos, setUserRepos] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${id}`);
        const result = await response.json();
        setUser(result);
        const response2 = await fetch(
          `https://api.github.com/users/${id}/repos`
        );
        const result2 = await response2.json();
        setUserRepos(result2);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAPI();
  }, [id]);

  return (
    <>
      <Navigation />

      <div className="bg-gray p-1 h-screen">
        <div className="bg-white md:mx-6 md:my-6 divide-x-12 py-4">
          <span className="text-blue text-xl font-bold pl-6">
            Datos Generales
          </span>

          <Divider className="pt-2 pb-2" />

          <div className="pt-4 pl-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div>
              <div className="text-blue text-lg font-bold pb-2">Nombre</div>
              <div className="text-black text-base">
                {user?.name ? user?.name : "❌ No disponible"}
              </div>
            </div>

            <div>
              <div className="text-blue text-lg font-bold pb-2">Usuario</div>
              <div className="text-black text-base">{user?.login}</div>
            </div>

            <div>
              <div className="text-blue text-lg font-bold pb-2">Avatar</div>
              <div className="w-12 h-12">
                <img
                  className="rounded-full"
                  src={user.avatar_url}
                  alt="User"
                />
              </div>
            </div>

            <div>
              <div className="text-blue text-lg font-bold pb-2">Github</div>
              <div className="text-black text-base break-words">
                {user?.html_url}
              </div>
            </div>

            <div>
              <div className="text-blue text-lg font-bold pb-2">Repo's URL</div>
              <div
                className="text-black text-base cursor-pointer break-words"
                onClick={handleClickOpenDialog}
              >
                {user?.repos_url}
              </div>

              <Dialog
                open={openDialog}
                maxWidth="sm"
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {user?.name
                    ? `Repositorios de: ${user?.name}`
                    : "No hay repositorios"}
                </DialogTitle>
                <DialogContent>
                  <div>
                    <div className="mt-6 flow-root">
                      <ul className="-my-5 divide-y divide-gray">
                        {userRepos.map((repo) => (
                          <li key={repo.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={user.avatar_url}
                                  alt=""
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold text-blue">
                                  {repo.name}
                                </p>
                                <p className="truncate text-sm text-black">
                                  Descripción:{" "}
                                  {repo?.description
                                    ? repo?.description
                                    : "No disponible"}
                                </p>
                                <p className="truncate text-sm text-black">
                                  Lenguaje:{" "}
                                  {repo?.language
                                    ? repo?.language
                                    : "No disponible"}
                                </p>
                              </div>
                              <div>
                                <Link
                                  to={repo.html_url}
                                  target="_blank"
                                  className="inline-flex items-center rounded-full border border-blue bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-black"
                                >
                                  Ir al Repo
                                </Link>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Divider className="pb-2" />
                </DialogContent>
                <DialogActions>
                  <div className="pr-8">
                    <Button
                      onClick={handleCloseDialog}
                      variant="outlined"
                      color="error"
                    >
                      <span className="font-bold">Cerrar</span>
                    </Button>
                  </div>
                </DialogActions>
              </Dialog>
            </div>

            <div>
              <div className="text-blue text-lg font-bold pb-2">
                Email address
              </div>
              <div className="text-black text-base">
                {user?.email ? user?.email : "❌ No disponible"}
              </div>
            </div>

            <div>
              <div className="text-blue text-lg font-bold pb-2">Address</div>
              <div className="text-black text-base">
                {user?.location ? user?.location : "❌ No disponible"}
              </div>
            </div>

            <div>
              <div className="text-blue text-lg font-bold pb-2">About</div>
              <div className="text-black text-base">
                {user?.bio ? user?.bio : "❌ No disponible"}
              </div>
            </div>

            <div>
              <div className="text-blue text-lg font-bold pb-2">Repo's</div>
              <div className="text-black text-base">{user?.public_repos}</div>
            </div>

            <div>
              <div className="text-blue text-lg font-bold pb-2">Followers</div>
              <div className="text-black text-base">{user?.followers}</div>
            </div>

            <div>
              <div className="text-blue text-lg font-bold pb-2">Following</div>
              <div className="text-black text-base">{user?.following}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
