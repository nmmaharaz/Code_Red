"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGroupInfo = (endPoint: string) => {
  const { data = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["GroupInfo", endPoint],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/api/communities/${endPoint}`);
      return res.data;
    },
  });
  return { data, isLoading, isError, refetch };
};

