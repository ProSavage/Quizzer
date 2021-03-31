import Link from "next/link";
import styled from "styled-components";

export default function Signup() {
  return (
    <Wrapper>
      <h1>Signup</h1>
      <p>
        Already have an account?{" "}
        <Link href={"/login"}>
          <HyperLink>Login</HyperLink>
        </Link>
      </p>
      <FormInput placeholder={"email"} type={"email"} />
      <FormInput placeholder={"password"} type={"password"} />
      <button type={"submit"}>Signup</button>
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
