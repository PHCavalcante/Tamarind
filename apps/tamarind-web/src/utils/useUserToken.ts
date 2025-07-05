import { useAuth } from "@clerk/nextjs";

export function useUserToken() {
  const { getToken } = useAuth();

  return async () => {
    const token = await getToken();
    return token;
  };
}
