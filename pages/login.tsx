import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../atoms/user";
import getAxios, { buildAxios } from "../util/AxiosBuilder";
import { setToken } from "../util/TokenManager";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("");

  const [user, setUser] = useRecoilState(userState);

  const login = () => {
    if (email.length === 0 || password.length === 0) {
      setStatus("invalid email or password.");
      return;
    }

    getAxios()
      .post("/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          setStatus("Successfully Logged in.");
          setToken(res.data.token);
          buildAxios();
          setUser(res.data.user);
        } else {
          setStatus(res.data.message);
        }
      });
  };

  return (
    <Wrapper>
      <h1>Login</h1>
      <p>{status}</p>
      <p>
        Don't have an account?{" "}
        <Link href={"/signup"}>
          <HyperLink>Sign Up</HyperLink>
        </Link>
      </p>
      <FormInput
        placeholder={"email"}
        type={"email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        placeholder={"password"}
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          login();
        }}
        type={"submit"}
      >
        Login
      </button>
    </Wrapper>
  );
}

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  margin: 0.5em 0;
`;

const HyperLink = styled.span`
  cursor: pointer;
  color: blue;
`;
