import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Friends = props => {
  const { name, age, email, id } = props.data;

  const [editing, setEditing] = useState(false);
  const [friends, setFriends] = useState(props.data);

  const handleDelete = () => {
    props.setUpdate(true);
    axiosWithAuth()
      .delete("/friends/" + id)
      .then(res => {
        props.setFriendsList(res.data);
        props.setUpdate(false);
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  const handleChange = e => {
    setFriends({ ...friends, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    if (editing === true) {
      axiosWithAuth()
        .put(`/friends/${id}`, friends)
        .then(res => {
          props.setFriendsList(res.data);
          setEditing(false);
        })
        .catch(err => {
          console.log("Error: ", err);
          console.log(friends.id)
        });
    }
  };

  return (
    <div>
    <h2>
      {editing ? (
        <input
          type="text"
          name="name"
          value={friends.name}
          onChange={handleChange}
        />
      ) : (
        name
      )}
    </h2>
    <p>
      Age:{" "}
      {editing ? (
        <input
          type="text"
          name="age"
          value={friends.age}
          onChange={handleChange}
        />
      ) : (
        age + "yrs old"
      )}
    </p>
    <p>
      Email:{" "}
      {editing ? (
        <input
          type="text"
          name="email"
          value={friends.email}
          onChange={handleChange}
        />
      ) : (
        email
      )}
    </p>
    <div className="buttons">
      <button onClick={handleDelete}>Delete Friend</button>
      <button
        onClick={() => {
          handleEdit();
          setEditing(true);
        }}
      >
        {editing ? "Submit Changes" : "Edit Friend"}
      </button>
    </div>
  </div>
);
}

export default Friends;