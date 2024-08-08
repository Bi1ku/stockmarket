"use client";

import { enhancedFetch } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const StockInfo = () => {
  const symbol = useParams<{ symbol: string }>().symbol;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    price: string;
    change: string;
    percentChange: string;
  }>();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await enhancedFetch(`/api/scrapers/${symbol}`);
      console.log(res);
      setData(res);

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
      {
        <div className="flex flex-col">
          <ul>
            <li>Price: {data?.price}</li>
            <li>Change: {data?.change}</li>
            <li>Percent Change: {data?.percentChange}</li>
          </ul>

          <div>
            <button onClick={buy}>Buy</button>
            <input
              type="number"
              onChange={(e) => setQuantity(+e.target.value)}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default StockInfo;
