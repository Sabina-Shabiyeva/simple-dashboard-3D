import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Select, Card, Button, Input, Radio, message, Spin } from "antd";
import SceneObject from "./SceneObject";
import { editorService } from "@/services/editor"; 

const Editor = () => {
  const [objects, setObjects] = useState([]);
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [tempDesigner, setTempDesigner] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [objs, des] = await Promise.all([
        editorService.getObjects(),
        editorService.getDesigners(),
      ]);
      setObjects(objs);
      setDesigners(des);
    } catch (error) {
      message.error("Data loading failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDoubleClick = async (e) => {
    if (!tempDesigner) {
      message.warning("First you need to choose a designer!");
      return;
    }

    const newObjData = {
      name: `Object ${objects.length + 1}`,
      attachedDesigner: tempDesigner,
      color: "#1890ff",
      position: [Math.random() * 4 - 2, 0.5, Math.random() * 4 - 2],
      size: "normal",
    };

    try {
      await editorService.createObject(newObjData);
      message.success("Object added");
      loadData(); 
    } catch (err) {
      message.error("Could not add object");
    }
  };

  const updateSelectedObject = async (field, value) => {
    try {
      await editorService.updateObject(selectedId, { [field]: value });
      setObjects((prev) =>
        prev.map((obj) =>
          obj.id === selectedId ? { ...obj, [field]: value } : obj,
        ),
      );
    } catch (err) {
      message.error("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await editorService.deleteObject(selectedId);
      message.info("Object deleted");
      setSelectedId(null);
      loadData();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  const selectedObject = objects.find((o) => o.id === selectedId);

  return (
    <div className="flex bg-gray-100">
      <div className="w-80 p-4 bg-white shadow-lg z-10 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Editor Settings</h2>

        <Spin spinning={loading}>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Choose designer:</label>
            <Select
              className="w-full"
              placeholder="Choose a designer"
              onChange={setTempDesigner}
              options={designers.map((d) => ({
                label: d.fullName,
                value: d.fullName,
              }))}
            />
            <p className="text-xs text-gray-500 mt-1">
              * Double-click on canvas to add.
            </p>
          </div>
        </Spin>

        {selectedObject && (
          <Card
            title="Object Editing"
            size="small"
            className="bg-blue-50 border-blue-200"
          >
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold">Name:</label>
                <Input
                  value={selectedObject.name}
                  onChange={(e) => updateSelectedObject("name", e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-semibold">Size:</label>
                <Radio.Group
                  className="w-full"
                  value={selectedObject.size}
                  onChange={(e) => updateSelectedObject("size", e.target.value)}
                  size="small"
                >
                  <Radio.Button value="small">S</Radio.Button>
                  <Radio.Button value="normal">M</Radio.Button>
                  <Radio.Button value="large">L</Radio.Button>
                </Radio.Group>
              </div>
              <div>
                <label className="text-xs font-semibold">Color:</label>
                <input
                  type="color"
                  className="block w-full h-8 mt-1 border-none cursor-pointer"
                  value={selectedObject.color}
                  onChange={(e) =>
                    updateSelectedObject("color", e.target.value)
                  }
                />
              </div>
              <Button danger className="w-full mt-2" onClick={handleDelete}>
                Delete Object
              </Button>
            </div>
          </Card>
        )}
      </div>

      <div
        className="flex-1 relative cursor-crosshair"
        onDoubleClick={handleDoubleClick}
      >
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} castShadow />
          <gridHelper args={[20, 20]} />

          {objects.map((obj) => (
            <SceneObject
              key={obj.id}
              object={obj}
              isSelected={selectedId === obj.id}
              onSelect={setSelectedId}
            />
          ))}

          <OrbitControls makeDefault />
          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={4.5}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default Editor;
