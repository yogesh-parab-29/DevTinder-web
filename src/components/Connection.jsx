import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connection = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const fetchConnection = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      console.log("running");
      console.log(response.data.data);
      dispatch(addConnection(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1>No connection found</h1>;
  return (
    <div className="text-center flex flex-col justify-items-start">
      <h1 className="text-2xl font-bold my-5">Connection</h1>

      {connections.map((connections) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } =
          connections;

        return (
          <>
            <div
              className="flex m-4 p-4 rounded-lg bg-base-300 gap-x-10 w-1/2 mx-auto"
              key={_id}
            >
              <div>
                <img alt="photo" className="w-20 h-20 rounded" src={photoUrl} />
              </div>
              <div className="text-left flex flex-col gap-y-4">
                <div className="text-bold">{firstName + " " + lastName}</div>
                {age && gender && <p>{age + " , " + gender}</p>}
                <p>{about}</p>
              </div>
          
            </div>
          </>
        );
      })}
    </div>
  );
};
export default Connection;
