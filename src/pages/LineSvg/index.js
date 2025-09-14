import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: black;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const Layout = styled.svg`
  position: relative;
  height: 420px;
  aspect-ratio: 16/9;
  border: 1px solid gray;
  background: white;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
`;

const AnimatedLine = styled.line`
  stroke: blue;
  stroke-width: 2;
  stroke-dasharray: ${({ length }) => length};
  stroke-dashoffset: ${({ length, animate }) => (animate ? 0 : length)};
  transition: stroke-dashoffset ${({ duration = 0.5 }) => duration}s ease-out;
  transition-delay: ${({ delay = 0 }) => delay}s;
`;

export default function SvgLineConnector() {
  const layoutRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickLayout = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    setPoints((prev) => [...prev, { id: dayjs().valueOf(), x, y }]);
    setIsPlaying(false); // reset การเล่น animation
  };

  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true); // เพิ่มบรรทัดนี้ ถ้าจะใช้ isPlaying

    setShouldAnimate(false);
    setTimeout(() => {
      setShouldAnimate(true);
    }, 50); // รีเฟรช stroke-dashoffset ใหม่
  };

  const calculateLineLengths = (points) => {
    const result = [];
    let totalDelay = 0;

    const speed = 200; // px ต่อวินาที

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const length = Math.sqrt(dx * dx + dy * dy);

      result.push({
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        delay: totalDelay,
        duration: length / speed,
        length,
        id: `${p1.id}-${p2.id}`,
      });

      totalDelay += length / speed;
    }

    return result;
  };

  return (
    <Container>
      <Button onClick={handlePlay}>▶ Play</Button>

      <Layout ref={layoutRef} onClick={handleClickLayout}>
        {/* จุด */}
        {points.map((point) => (
          <circle key={point.id} cx={point.x} cy={point.y} r={6} fill="red" />
        ))}

        {/* เส้นแบบ Domino Animation */}
        {isPlaying &&
          calculateLineLengths(points).map((line) => (
            <AnimatedLine
              key={line.id}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              duration={line.duration}
              delay={line.delay}
              length={line.length}
              animate={shouldAnimate} // ✅ สำคัญมาก
            />
          ))}
      </Layout>
    </Container>
  );
}
