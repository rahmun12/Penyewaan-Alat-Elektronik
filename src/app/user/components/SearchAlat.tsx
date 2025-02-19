"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useGetAlat } from "@/dataservices/Alat/api";
import { GetAllAlatResponse } from "@/dataservices/Alat/type";
import { Alat } from "@/types/alat";

const SearchAlat = () => {
  const [query, setQuery] = useState("");
  const [filteredAlat, setFilteredAlat] = useState<Alat[]>([]);
  const { data, isLoading, isError } = useGetAlat<GetAllAlatResponse>(
    "/v1/alat",
    1
  );

  const handleSearch = useCallback(() => {
    const filteredData = data?.data.filter((alat: Alat) => {
      return alat.alat_nama.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredAlat(filteredData || []);
  }, [data, query]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {filteredAlat.map((alat: Alat) => (
        <div key={alat.id}>{alat.alat_nama}</div>
      ))}
    </div>
  );
};

export default SearchAlat;
