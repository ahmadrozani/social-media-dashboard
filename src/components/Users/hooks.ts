import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { UsersTypes } from "@/lib/utils/user-type";

export function useFetchUsers() {
  const [data, setData] = useState<UsersTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const { data: users } = await axios.get<UsersTypes[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const users = await fetchUsers();
        if (isMounted) {
          setData(users);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error setting data:", error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchUsers]);

  return { data, isLoading };
}
