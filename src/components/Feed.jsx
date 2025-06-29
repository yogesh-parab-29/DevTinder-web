import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import Usercard from "./Usercard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed?.users?.length > 0) {
      console.log("Feed already populated, skipping fetch.");
      return;
    }
    try {
      const response = await axios.get(BASE_URL + "user/feed", {
        withCredentials: true,
      });
      console.log(response.data.users);
      dispatch(addFeed(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  return feed?.users && feed?.users[0] ? (
    <div className="flex justify-center">
      <Usercard user={feed.users[0]} />
    </div>
  ) : (
    <div className="flex justify-center">
      <p>Loading user feed...</p>
    </div>
  );
};
export default Feed;
