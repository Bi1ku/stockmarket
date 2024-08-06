"use client";

import { useEffect, useState } from "react";

const Dashboard = () => {
  const [search, setSearch] = useState("");

  useEffect(() => { }, [search]);

  return (
    <div>
      <input onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
};

export default Dashboard;
