import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export default function Background3D() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "black",
      }}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Stars
          radius={100}          // How far the stars spread
          depth={50}            // Star field depth
          count={5000}          // Number of stars
          factor={4}            // Size factor
          saturation={0}        // 0 = white stars
          fade                   // Makes stars fade at distance
          speed={1}              // Auto rotate speed
        />
      </Canvas>
    </div>
  );
}
