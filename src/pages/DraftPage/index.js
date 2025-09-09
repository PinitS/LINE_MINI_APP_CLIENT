import React, { useRef, useState } from "react";
import styled from "styled-components";
import IMAGE_RATIO_16_9 from "@assets/poc/IMAGE_RATIO_16_9.jpg";
import _ from "lodash";
import { Text } from "@components/Text";
import { v4 as uuid } from "uuid";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  flex: 1;
  background: black;
`;

const ContainerLayout = styled.div`
  flex: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;

const ContainerAction = styled.div`
  flex: 0.3;
  background: white;
  border-left: 1px solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 12px;
  gap: 12px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: gray;
`;

const ContainerSelectRoom = styled.div`
  display: grid;
  width: 100%;
  gap: 12px;
  grid-template-columns: repeat(4, 1fr);
  flex-shrink: 0;
`;

const RoomItem = styled.div`
  aspect-ratio: 4/3;
  background: ${({ $isActive = false }) => ($isActive ? "red" : "gray")};
  border-radius: 6px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerVisible = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
`;

const VisibleItem = styled.div`
  background: ${({ $isActive = false }) => ($isActive ? "red" : "gray")};
  border-radius: 6px;
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Layout = styled.svg`
  position: relative;
  height: 420px;
  aspect-ratio: 16/9;
  border: 1px solid gray;
  background: white;
`;

const Dot = styled.circle`
  fill: red;
  r: 2;
  cursor: pointer;
`;

export default () => {
  const svgCanvasRef = useRef(null);

  const initialRoom = _.map(new Array(20), (item, index) => {
    return { id: uuid(), name: `R-${index + 1}`, points: [] };
  });

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [room, setRoom] = useState(initialRoom);
  const [visibleType, setVisibleType] = useState("show-current");

  const handleClickSvg = (e) => {
    const svgRect = svgCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;

    if (!selectedRoom) return;

    setRoom((prev) =>
      _.map(prev, (item) => {
        if (item.id === selectedRoom) {
          return {
            ...item,
            points: [...item.points, { x, y }],
          };
        }
        return item;
      }),
    );
  };

  const renderVisiblePoints = () => {
    const renderFromRoom = (roomItem) => {
      const { points, id } = roomItem;
      const polygonPoints = _.map(points, (p) => `${p.x},${p.y}`).join(" ");

      return (
        <React.Fragment key={id}>
          {points.length >= 3 && (
            <polygon
              onClick={() => alert(roomItem?.name)}
              points={polygonPoints}
              fill="rgba(255, 0, 0, 0.3)"
              stroke="red"
              strokeWidth={1}
            />
          )}
          {points.map((p, idx) => (
            <Dot key={`${id}-${idx}`} cx={p.x} cy={p.y} />
          ))}
        </React.Fragment>
      );
    };

    if (visibleType === "show-all") {
      return _.map(room, renderFromRoom);
    }

    const current = _.find(room, (r) => r.id === selectedRoom);
    if (!current) return null;

    return renderFromRoom(current);
  };

  return (
    <Container>
      <ContainerLayout>
        <Layout ref={svgCanvasRef} onClick={handleClickSvg}>
          <image
            href={IMAGE_RATIO_16_9}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
          />
          {renderVisiblePoints()}
        </Layout>
      </ContainerLayout>

      <ContainerAction>
        <Text $fontSize={24}>Select Room</Text>
        <Line />
        <ContainerSelectRoom>
          {_.map(room, (item, index) => (
            <RoomItem
              key={index}
              $isActive={selectedRoom === item?.id}
              onClick={() =>
                setSelectedRoom((prev) => (prev === item?.id ? null : item?.id))
              }
            >
              <Text $fontSize={12} $color="white">
                {item?.name}
              </Text>
            </RoomItem>
          ))}
        </ContainerSelectRoom>
        <Line />
        <ContainerVisible>
          <VisibleItem
            onClick={() => setVisibleType("show-all")}
            $isActive={visibleType === "show-all"}
          >
            <Text $fontSize={18} $color="white">
              Show all
            </Text>
          </VisibleItem>
          <VisibleItem
            onClick={() => setVisibleType("show-current")}
            $isActive={visibleType === "show-current"}
          >
            <Text $fontSize={18} $color="white">
              Show current
            </Text>
          </VisibleItem>
        </ContainerVisible>
      </ContainerAction>
    </Container>
  );
};
