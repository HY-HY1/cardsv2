"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useReviseContext } from "@/context/ReviseContext";
import { ReviseCarousel } from "./_components/ReviseCarousel";

const Page = () => {
  const { fetchRevisionData, reviseCard, loading } = useReviseContext();
  const [cards, setCards] = useState<any>(null); // Update type as needed

  const params = useParams();
  const searchParams = useSearchParams();

  const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : "";
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchAll = async () => {
      if (!id || !type) return;
      await fetchRevisionData(id, type);
    };
    fetchAll();
  }, [id, type]);

  return (
    <div>
      <h2>All Revision Cards</h2>
      {loading && <p>Loading...</p>}
      {!loading && reviseCard ? (
        <div className="max-w-[70vw] m-auto">
          <div className="max-w-[40vw] m-auto">
        <ReviseCarousel data={reviseCard}/>
        </div>
        <pre>{JSON.stringify(reviseCard, null, 2)}</pre>
        </div>
      ) : (
        <p>No cards found.</p>
      )}
    </div>
  );
};

export default Page;
