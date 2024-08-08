"use client";

import { useState } from "react";
import { enhancedFetch } from "@/utils";
import { useRouter } from "next/router";

const Login = () => {
  const { push } = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setForm({ ...form, [value]: e.target.value });
  };

  const onSubmit = async () => {
    const response = await enhancedFetch(`/api/users/${form.email}`);

    if (response.status != 201) {
      // notify error
    }

    localStorage.setItem("user", JSON.stringify(response.data));
    push("/dashboard");
  };

  return (
    <div>
      <div>
        <label>Email:</label>
        <input onChange={(e) => handleChange(e, "email")} />
      </div>

      <div>
        <label>Password:</label>
        <input onChange={(e) => handleChange(e, "password")} />
      </div>

      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default Login;
