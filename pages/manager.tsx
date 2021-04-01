import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/user";

export default function Manager() {
  const user = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user]);

  return <p>Manager for {user?.email}</p>;
}
