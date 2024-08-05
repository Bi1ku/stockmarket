"use client";

import { enhancedFetch } from "@/utils";
import { useState } from "react";

const Create = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setForm({ ...form, [value]: e.target.value });
  };

  const onSubmit = async () => {
    const response = await enhancedFetch("/api/users", {
      method: "POST",
      body: JSON.stringify(form),
    });

    console.log(response);
  };

  return (
    <div className="flex flex-col">
      <div>
        <label>First Name:</label>
        <input onChange={(e) => handleChange(e, "firstName")} />
      </div>

      <div>
        <label>Last Name:</label>
        <input onChange={(e) => handleChange(e, "lastName")} />
      </div>

      <div>
        <label>Password:</label>
        <input onChange={(e) => handleChange(e, "password")} />
      </div>

      <div>
        <label>Email:</label>
        <input onChange={(e) => handleChange(e, "email")} />
      </div>

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default Create;
