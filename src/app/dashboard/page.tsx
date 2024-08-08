"use client";

import stocks from "@/constants/stocks";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<{ symbol: string; name: string }[]>(
    [],
  );

  useEffect(() => {
    const res = [];

    if (search)
      for (const stock of stocks) {
        if (stock.name.includes(search)) {
          res.push(stock);
        }

        if (res.length >= 10) {
          break;
        }
      }

    setResults(res);
  }, [search]);

  return (
    <div>
      <input onChange={(e) => setSearch(e.target.value)} />

      <div>
        {results.map((v, _) => (
          <div key={v.symbol}>
            <a href={`/dashboard/${v.symbol}`}>{v.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
