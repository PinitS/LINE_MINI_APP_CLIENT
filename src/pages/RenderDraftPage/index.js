// RenderPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import IMAGE_RATIO_16_9 from "@assets/poc/IMAGE_RATIO_16_9.jpg";
import styled from "styled-components";
import _ from "lodash";

const ContainerLayout = styled.div`
  display: flex;
  justify-content: center;
  background: white;
`;

const Layout = styled.svg`
  position: relative;
  height: 420px;
  aspect-ratio: 16/9;
  border: 1px solid gray;
  background: white;
`;

export default () => {
  const location = useLocation();
  const room = location.state?.room || [];

  return (
    <ContainerLayout>
      <Layout style={{ border: "1px solid gray" }}>
        <image
          href={IMAGE_RATIO_16_9}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
        {room.map((item) => {
          console.log("item :>> ", item);
          const name = _.get(item, ["name"]);
          if (!item.points || item.points.length < 3) return null;

          const polygonPoints = item.points
            .map((p) => `${p.x},${p.y}`)
            .join(" ");

          return (
            <polygon
              onClick={() => alert(name)}
              key={item.id}
              points={polygonPoints}
              fill="rgba(255,0,0,0.2)"
              stroke="red"
              strokeWidth={2}
            />
          );
        })}
      </Layout>
    </ContainerLayout>
  );
};
