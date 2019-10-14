import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Friends from "./Friends";

const Dashboard = () => {
  const initialFriend = {
    id: "",
    name: "",
    age: "",
    email: ""
  };

  const [friends, setFriends] = useState(initialFriend);
  const [friendsList, setFriendsList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const id = (friendsList.length + 1);

  const handleChange = e => {
    e.preventDefault();
    setFriends({ ...friends, [e.target.name]: e.target.value, id: id });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFriends({ ...friends});
    setIsUpdating(true);
    console.log(friends)
    console.log(friendsList)
    console.log(id)
    axiosWithAuth()
      .post("/friends", friends)
      .then(res => {
        setFriendsList(res.data);
        setIsUpdating(false);
      })
      .then(() => {
        setFriends(initialFriend);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    setIsUpdating(true);
    axiosWithAuth()
      .get("/friends")
      .then(res => {
        setFriendsList(res.data);
        setIsUpdating(false);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  }, []);

  return (
    <section>
      <div>
        <h1>Add a new friend!</h1>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={friends.name}
            onChange={handleChange}
          />
          <label>Age:</label>
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={friends.age}
            onChange={handleChange}
          />
          <label>Email:</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={friends.email}
            onChange={handleChange}
          />
          <button type="submit">Add Friend</button>
        </form>
      </div>
      <div>
        <h1>
          {isUpdating
            ? "Loading..."
            : `You have ${friendsList.length} friends!`}
        </h1>
        <div>
          {friendsList.map(friend => {
            return <Friends data={friend} key={friend.id} setUpdate={setIsUpdating} setFriendsList={setFriendsList} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;