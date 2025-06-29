import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log(emailId, password);
      const response = await axios.post(
        "http://localhost:3000/user/login",
        {
          emailId: emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(response.data));
      console.log(response.data);
      return navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async () => {
    const response = await axios.post(
      BASE_URL + "user/signup",
      {
        firstName,
        lastName,
        emailId,
        password,
      },
      { withCredentials: true }
    );
    dispatch(addUser(response.data.data));
    console.log(response.data.data);
    return navigate("/profile");
  };

  return (
    <div className="flex justify-center self-center">
      <div className="card bg-base-300 w-full max-w-md shadow-lg">
        <div className="card-body">
          <h1 className="card-title text-2xl font-bold mb-4">Login</h1>

          <form>
            {!isLoginForm && (
              <>
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
              </>
            )}
            <div className="form-control mb-4">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                className="input input-bordered w-full"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>

            <p
              className="mt-4"
              onClick={() => {
                setLoginForm(!isLoginForm);
              }}
            >
              {isLoginForm
                ? "New User? Click here to Sign Up"
                : "Existing User? Click here to login"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
