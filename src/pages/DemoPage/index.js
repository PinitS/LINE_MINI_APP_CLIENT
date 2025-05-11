import React from "react";
import Lottie from "lottie-react";
import LOADING_SPLASH_SCREEN from "@assets/lottieAnimations/LOADING_SPLASH_SCREEN.json";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSubdomain } from "@hooks/useSubdomain";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
`;
export default () => {
  const { id } = useParams();
  const subdomain = useSubdomain();
  return (
    <Container>
      <div>id: {id}</div>
      <div>subdomain:{subdomain}</div>
      <Lottie animationData={LOADING_SPLASH_SCREEN} style={{ height: 80 }} />
    </Container>
  );
};
