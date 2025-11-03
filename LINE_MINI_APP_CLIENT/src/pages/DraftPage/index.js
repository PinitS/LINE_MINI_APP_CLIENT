import React, { useRef, useState } from "react";
import styled from "styled-components";
import IMAGE_RATIO_16_9 from "@assets/poc/IMAGE_RATIO_16_9.jpg";
import _ from "lodash";
import { Text } from "@components/Text";
import { v4 as uuid } from "uuid";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { DraggableCircle } from "./DraggableCircle";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
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
`;

const RoomItem = styled.div`
  aspect-ratio: 4/3;
  background: ${({ $isActive }) => ($isActive ? "red" : "gray")};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerVisible = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex-direction: row;
  gap: 8px;
  width: 100%;
`;

const VisibleItem = styled.div`
  background: ${({ $isActive }) => ($isActive ? "red" : "gray")};
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

export default () => {
  const navigate = useNavigate();
  const svgRef = useRef(null);

  const initialRoom = _.map(new Array(20), (_, index) => ({
    id: uuid(),
    name: `R-${index + 1}`,
    points: [],
  }));

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [room, setRoom] = useState(initialRoom);
  const [visibleType, setVisibleType] = useState("show-current");
  const [dragPreview, setDragPreview] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleClickSvg = (e) => {
    if (dragPreview) return;

    const svgRect = svgRef.current.getBoundingClientRect();
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

  const handleDragStart = ({ active }) => {
    setDragPreview({ id: active.id, dx: 0, dy: 0 });
  };

  const handleDragMove = ({ delta, active }) => {
    setDragPreview({ id: active.id, dx: delta.x, dy: delta.y });
  };

  const handleDragEnd = ({ delta, active }) => {
    const [roomId, indexStr] = active.id.split("_");
    const index = parseInt(indexStr, 10);
    if (!roomId || isNaN(index)) return;

    setRoom((prev) =>
      prev.map((r) => {
        if (r.id !== roomId) return r;

        const updated = [...r.points];
        updated[index] = {
          x: updated[index].x + delta.x,
          y: updated[index].y + delta.y,
        };

        return { ...r, points: updated };
      }),
    );

    setDragPreview(null);
  };

  const handleDragCancel = () => {
    setDragPreview(null);
  };

  const getDisplayPoints = (points, roomId) => {
    if (!dragPreview) {
      return points;
    }
    const [dragIdRoom, indexStr] = _.split(dragPreview.id, "_");
    const currentIndex = _.toInteger(indexStr);

    if (dragIdRoom !== roomId) {
      return points;
    }

    return _.chain(points)
      .map((pointItem, pointIndex) => {
        return pointIndex === currentIndex
          ? {
              ...pointItem,
              x: pointItem.x + dragPreview.dx,
              y: pointItem.y + dragPreview.dy,
            }
          : pointItem;
      })
      .value();
  };

  const handleNavigate = () => {
    navigate("render-draft", {
      state: { room },
    });
  };

  return (
    <Container>
      <ContainerLayout>
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <Layout ref={svgRef} onClick={handleClickSvg}>
            <image
              href={IMAGE_RATIO_16_9}
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />

            {_.map(room, (roomItem) => {
              const roomId = _.get(roomItem, ["id"]);
              const roomName = _.get(roomItem, ["name"]);

              const roomPoints = _.get(roomItem, ["points"]);
              const shouldShow =
                visibleType === "show-all" || roomId === selectedRoom;
              if (!shouldShow) return null;

              const points = getDisplayPoints(roomPoints, roomId);
              const polygonPoints = _.chain(points)
                .map((p) => `${p.x},${p.y}`)
                .join(" ")
                .value();

              return (
                <g key={roomId}>
                  {_.size(points) >= 3 && (
                    <polygon
                      onClick={() => alert(roomName)}
                      fill="rgba(255,0,0,0.2)"
                      stroke="red"
                      strokeWidth={2}
                      points={polygonPoints}
                    />
                  )}
                  {_.map(points, (item, index) => (
                    <DraggableCircle
                      key={`${roomId}_${index}`}
                      id={`${roomId}_${index}`}
                      x={item.x}
                      y={item.y}
                    />
                  ))}
                </g>
              );
            })}
          </Layout>
        </DndContext>
      </ContainerLayout>

      <ContainerAction>
        <Text $fontSize={24}>Select Room</Text>
        <Line />
        <ContainerSelectRoom>
          {_.map(room, (item) => {
            const id = _.get(item, ["id"]);
            const name = _.get(item, ["name"]);
            return (
              <RoomItem
                key={id}
                $isActive={selectedRoom === id}
                onClick={() =>
                  setSelectedRoom((prev) => (prev === item.id ? null : item.id))
                }
              >
                <Text $fontSize={12} $color="white">
                  {name}
                </Text>
              </RoomItem>
            );
          })}
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
          <div
            style={{
              backgroundColor: "#f0f0f0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => handleNavigate()}
          >
            <Text $fontSize={18} $color="red">
              Preview
            </Text>
          </div>
        </ContainerVisible>
      </ContainerAction>
    </Container>
  );
};
