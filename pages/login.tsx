import Link from "next/link";
import styled from "styled-components";

export default function Login() {
  return (
    <Wrapper>
      <h1>Login</h1>
      <p>
        Don't have an account?{" "}
        <Link href={"/signup"}>
          <HyperLink>Sign Up</HyperLink>
        </Link>
      </p>
      <FormInput type={"email"} placeholder={"email"}></FormInput>
      <FormInput type={"password"} placeholder={"password"}></FormInput>
      <button>Login</button>
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
