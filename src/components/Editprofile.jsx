import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Usercard from "./Usercard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Editprofile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateUser = async () => {
    try {
      const response = await axios.patch(
        BASE_URL + "profile/edit",
        { firstName, lastName, gender, age, photoUrl, about },
        { withCredentials: true }
      );
      console.log(response?.data?.data);
      dispatch(addUser(response?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-around">
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Message sent successfully.</span>
          </div>
        </div>
      )}
      <Usercard user={{ firstName, lastName, gender, age, about, photoUrl }} />
      <div className="flex justify-center self-center">
        <div className="card bg-base-300 w-full max-w-md shadow-lg">
          <div className="card-body">
            <h1 className="card-title text-2xl font-bold mb-4">User profile</h1>

            <form>
              <div className="flex gap-x-4">
                <div className="form-control mb-4">
                  <label className="label" htmlFor="firstName">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    className="input input-bordered w-full"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label" htmlFor="lastName">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    className="input input-bordered w-full"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="form-control mb-4">
                  <label className="label" htmlFor="age">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    id="age"
                    type="text"
                    className="input input-bordered w-full"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control mb-4">
                  <fieldset className="fieldset w-full">
                    <label className="label" htmlFor="gender">
                      <span className="label-text">Gender</span>
                    </label>

                    <select
                      className="select w-full"
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                    </select>
                  </fieldset>
                </div>
              </div>
              <div className="form-control mb-4">
                <label className="label" htmlFor="age">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  id="photoUrl"
                  type="text"
                  className="input input-bordered w-full"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label" htmlFor="about">
                  <span className="label-text">About</span>
                </label>
                <input
                  id="about"
                  type="text"
                  className="input input-bordered w-full"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  required
                />
              </div>

              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={handleUpdateUser}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Editprofile;
