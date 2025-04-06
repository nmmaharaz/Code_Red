"use client"
import { useGroupData } from './index';

export function AllCommunity() {
    const { data: groups, isLoading, isError } = useGroupData("http://localhost:3000/api/community");
  return {groups, isLoading, isError}
}

