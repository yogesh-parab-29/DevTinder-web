import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const fetchRequest = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response.data.data));
      console.log(response.data.data[0].fromUserId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  const handleReviewRequest = async (status, _id) => {
    try {
      const response = await axios.post(
        BASE_URL + "request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(requests);
  if (!requests) return;
  if (requests.length === 0) return <h1 className="flex justify-center my-10">No Pending Request found</h1>;
  return (
    <div className="text-center flex flex-col justify-items-start">
      <h1 className="text-2xl font-bold my-5">Requests</h1>

      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } =
          request.fromUserId;

        return (
          <div
            className="flex m-4 p-4 rounded-lg bg-base-300 gap-x-10 w-1/2 mx-auto  items-center"
            key={_id}
          >
            <div>
              <img alt="photo" className="w-24 h-24 rounded" src={photoUrl} />
            </div>
            <div className="text-left flex flex-col gap-y-1">
              <div className="text-bold">{firstName + " " + lastName}</div>
              {age && gender && <p>{age + " , " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex gap-x-2">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  handleReviewRequest("rejected", request._id);
                }}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  handleReviewRequest("accepted", request._id);
                }}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Request;
