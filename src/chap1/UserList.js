import React, { useContext, useEffect } from "react";
import { UserDispatch } from "../App";

const User = React.memo(function User({ user }) {
  useEffect(() => {
    console.log("user components appear");
    console.log(user);
    return () => {
      console.log("user components changed");
      console.log(user);
    };
  }, [user]);

  const dispatch = useContext(UserDispatch);

  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
      >
        {user.username}
      </b>
      <span>({user.email})</span>
      <button
        onClick={() => {
          dispatch({ type: "REMOVE_USER", id: user.id });
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          dispatch({ type: "TOGGLE_USER", id: user.id });
        }}
      >
        focus
      </button>
    </div>
  );
});

function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
}

export default React.memo(UserList);
