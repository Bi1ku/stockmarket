"use client";

import { enhancedFetch } from "@/utils";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const StockInfo = () => {
  const symbol = useParams<{ symbol: string }>().symbol;

  const getStockData = async () => {
    const res = await enhancedFetch(`/api/scrapers/${symbol}`);

    return res;
  };

  useEffect(() => {
    (async () => {
      const res = await enhancedFetch(`/api/scrapers/${symbol}`);

      console.log(res);
    })();
  }, [symbol]);

  return <></>;
};

export default StockInfo;
