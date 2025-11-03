import React, { useEffect, useState } from "react";
import styled from "styled-components";
import liff from "@line/liff";

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: green;
`;

const { REACT_APP_LIFF_ID } = process.env;

export const LineMiniPage = () => {
  const [profile, setProfile] = useState(null);

  const initial = async () => {
    await liff.init({ liffId: REACT_APP_LIFF_ID });
    if (!liff.isLoggedIn()) {
      liff.login();
    }
    const userProfile = await liff.getProfile();
    console.log("userProfile :>> ", userProfile);
    setProfile(userProfile);
  };

  useEffect(() => {
    initial();
  }, []);

  return (
    <Container>
      <p>profile : {JSON.stringify(profile)}</p>
    </Container>
  );
};
