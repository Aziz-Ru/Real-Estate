import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../lib/requests";
import "./profilePage.scss";

function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { isLoading, mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onError: (error) => {
      console.log(error);
      setError(error.response.data.errors.message);
    },
    onSuccess: () => {
      updateUser(null);
      navigate("/login");
    },
  });

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>

            <Link to={"/profile/update"}>
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar ? currentUser.avatar : "/noavatar.png"}
                alt=""
              />
            </span>

            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button disabled={isLoading} onClick={() => mutate()}>
              Logout
            </button>
            {error && <p>{error}</p>}
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
