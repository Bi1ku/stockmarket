"use client";

import { enhancedFetch } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const StockInfo = () => {
  const symbol = useParams<{ symbol: string }>().symbol;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ price: string }>();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await enhancedFetch(`/api/scrapers/${symbol}`);
      setData(res);
      console.log(res);

      setLoading(false);
    })();
  }, [symbol]);

  const buy = async () => {
    await enhancedFetch(`/api/stocks/${symbol}`, {
      method: "PUT",
      body: JSON.stringify({
        symbol: symbol,
        quantity,
      }),
    });
  };

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div className="flex">
          <span>price: {data?.price}</span>
          <button onClick={buy}>Buy</button>
        </div>
      )}
      <input type="number" onChange={(e) => setQuantity(+e.target.value)} />
    </div>
  );
};

export default StockInfo;
