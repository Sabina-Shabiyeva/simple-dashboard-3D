import React, { useState } from "react";
import { useCursor, PivotControls } from "@react-three/drei";

const SceneObject = ({ object, isSelected, onSelect, onUpdate }) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const getColor = () => {
    if (isSelected) return "#ff4d4f";
    if (hovered) return "#ffec3d";
    return object.color;
  };

  const getScale = () => {
    const scales = { small: 0.5, normal: 1, large: 1.5 };
    return scales[object.size] || 1;
  };

  return (
    <PivotControls
      visible={isSelected}
      activeAxes={[true, true, true]}
      onDragEnd={(matrix) => {
      }}
    >
      <mesh
        position={object.position}
        scale={getScale()}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(object.id);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={getColor()} />
      </mesh>
    </PivotControls>
  );
};

export default SceneObject;
