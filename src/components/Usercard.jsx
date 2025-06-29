import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

const Usercard = ({ user }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, about, age, gender, photoUrl } = user;
  const handleSendRequest = async (status, _id) => {
    try {
      const response = await axios.post(
        BASE_URL + "request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(response.data.data);
      console.log(_id);
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    user && (
      <div className="card bg-base-300 w-80 shadow-2xl">
        <figure>
          <img
            src={photoUrl}
            alt="User photo"
            className="w-full h-auto max-h-60 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>
            {age && <span>{age} </span>}
            {age && gender && <span>, </span>}
            {gender && <span>{gender[0].toUpperCase() + gender.slice(1)}</span>}
          </p>
          <p>{about}</p>
          <div className="card-actions justify-evenly my-4 ">
            <button
              className="btn btn-primary sm:btn-sm md:btn-md lg:btn w-1/3"
              onClick={() => handleSendRequest("rejected", _id)}
            >
              Reject
            </button>
            <button
              className="btn btn-secondary sm:btn-sm md:btn-md lg:btn w-1/3"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default Usercard;
