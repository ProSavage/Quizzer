import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import getAxios from "../util/AxiosBuilder";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("");

  const signup = () => {
    if (email.length === 0 || username.length === 0 || password.length === 0) {
      setStatus("invalid email or password.");
      return;
    }

    getAxios()
      .post("/signup", {
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          setStatus("Successfully registered. Please login.");
        } else {
          setStatus(res.data.message);
        }
      });
  };

  return (
    <Wrapper>
      <h1>Signup</h1>
      <p>{status}</p>
      <p>
        Already have an account?{" "}
        <Link href={"/login"}>
          <HyperLink>Login</HyperLink>
        </Link>
      </p>
      <FormInput
        placeholder={"email"}
        type={"email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        placeholder={"username"}
        type={"username"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
          signup();
        }}
        type={"submit"}
      >
        Signup
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
