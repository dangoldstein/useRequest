import React from "react";

export function User({ user }) {
  return (
    <div>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> years old
      <br />
      lives in {user.address}
    </div>
  );
}
