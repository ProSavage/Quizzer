import { useEffect } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import styled, { ThemeProvider } from "styled-components";
import { themeState } from "../atoms/theme";
import { userState } from "../atoms/user";
import Footer from "../components/ui/Footer";
import GlobalStyle from "../styles/GlobalStyle";
import getAxios, { buildAxios } from "../util/AxiosBuilder";
import getToken, { setToken } from "../util/TokenManager";
import Navbar from "./../components/ui/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <Wrapper>
      <RecoilRoot>
        <WrappedApp Component={Component} pageProps={pageProps} />
      </RecoilRoot>
    </Wrapper>
  );
}

function WrappedApp({ Component, pageProps }) {
  const theme = useRecoilValue(themeState);
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (user) {
      console.log("user is already logged in.");
      return;
    }

    const token = getToken();
    if (!token) {
      console.log("token not found...");
      return;
    }

    getAxios()
      .post("/validate", {
        token,
      })
      .then((res) => {
        setUser(res.data.user);
        buildAxios();
        console.log("successfully logged in using localstorage token.");
      })
      .catch((err) => {
        if (err.response.data.errors) {
          // if this exists the token is bad/malformed or edited.
          setToken("");
          console.log("token was malformed, or edited, resetting...");
        }
        if (err.response.data.error === "token is invalid") {
          setToken("");
          console.log("token was invalid.");
        }
        setUser(null);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageContainer>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </PageContainer>
    </ThemeProvider>
  );
}

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1280px;
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default MyApp;
