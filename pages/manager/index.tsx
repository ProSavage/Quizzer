import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../../atoms/user";

export default function Manager() {
  const user = useRecoilValue(userState);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user]);

  return (
    <Wrapper>
      <Header>
        <h2>Quiz Manager</h2>
        <Link href={"/manager/create"}>
          <button>CREATE</button>
        </Link>
      </Header>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 1em 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
