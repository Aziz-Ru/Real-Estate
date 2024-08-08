import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { storage } from "../../lib/firebaseConfig.js";
import "./profileUpdatePage.scss";

function ProfileUpdatePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formHandler = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);

    const { username, password, email, avatar } = Object.fromEntries(formData);

    if (
      avatar.name &&
      avatar.type != "image/png" &&
      avatar.type != "image/jpg" &&
      avatar.type != "image/jpeg"
    ) {
      setError("jpg,jpeg or png image required");
      return;
    }

    try {
      setIsLoading(true);
      let imgUrl;
      if (avatar.name != "") {
        const imageRef = ref(
          storage,
          `images/${currentUser.id}-${avatar.name}`
        );
        await uploadBytes(imageRef, avatar);
        imgUrl = await getDownloadURL(imageRef);
        // console.log("Uploaded Successfully" + imgUrl);
      }
      const res = await apiRequest.put(`/user/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: imgUrl || "",
      });

      updateUser(res.data);
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.errors[0].msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={formHandler}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <div className="item">
            <input type="file" name="avatar" />
          </div>
          <button disabled={isLoading}>Update</button>
          {error && <p>{error}</p>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={currentUser.avatar || "/noavatar.png"}
          alt=""
          className="avatar"
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
