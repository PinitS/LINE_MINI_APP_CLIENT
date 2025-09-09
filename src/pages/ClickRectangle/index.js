import React, { useRef, useState } from "react";
import styled from "styled-components";
import IMAGE_RATIO_16_9 from "@assets/poc/IMAGE_RATIO_16_9.jpg";
import _ from "lodash";
import dayjs from "dayjs";

const Container = styled.div`
  flex: 1;
  display: flex;
  background: black;
  justify-content: center;
  align-items: center;
`;

const Layout = styled.div`
  position: relative;
  width: 880px;
  aspect-ratio: 16/9;
  background: white;
  background-image: url(${IMAGE_RATIO_16_9});
  background-size: cover;
  background-position: center;
`;

export default () => {
  const layoutRef = useRef(null);

  const [blocks, setBlocks] = useState([]);

  const handleClickLayout = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    setBlocks((prev) => [
      ...prev,
      { id: dayjs().valueOf(), x: x - 20 / 2, y: y - 20 / 2 },
    ]);
  };

  return (
    <Container>
      <Layout ref={layoutRef} onClick={(e) => handleClickLayout(e)}>
        {_.map(blocks, (item) => {
          console.log("item :>> ", item);
          const id = _.get(item, ["id"]);
          const x = _.get(item, ["x"]);
          const y = _.get(item, ["y"]);

          return (
            <div
              key={id}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 20,
                height: 20,
                background: "red",
              }}
            />
          );
        })}
      </Layout>
    </Container>
  );
};
