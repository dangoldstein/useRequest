import React, { useState, useEffect } from "react";
import { fetch } from "../shared/fetch";

const STATUS = {
  success: 200
};

export default function User(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  async function fetchUserData(id) {
    const response = await fetch(
      "https://dangoldstein.free.beeceptor.com/user"
    );

    if (response.status === STATUS.success) {
      setUser(response.data);
    } else {
      if (response.timeout) {
        setError("timeout");
      }
    }
  }

  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);

  if (error) {
    return <span data-cy="error">{error}</span>;
  }

  if (!user) {
    return "loading...";
  }

  return (
    <div>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> years old
      <br />
      lives in {user.address}
    </div>
  );
}
