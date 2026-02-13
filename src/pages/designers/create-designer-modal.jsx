import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const CreateDesignerModal = ({ open, onCancel, onSave, editingId, form }) => {
  return (
    <Modal
      title={editingId ? "Edit Designer" : "Create Designer"}
      open={open}
      onOk={() => form.submit()} 
      onCancel={onCancel}
      okText="Save"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSave} 
        initialValues={{ attachedObjectsCount: 0 }}
        className="mt-4"
      >
        <Form.Item
          name="fullName"
          label="Full name"
          rules={[{ required: true, message: "Please enter full name" }]}
        >
          <Input placeholder="e.g. Alex Chen" size="large" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="workingHours"
            label="Working hours"
            rules={[{ required: true, message: "Please enter working hours" }]}
          >
            <InputNumber min={1} max={168} className="w-full" size="large" />
          </Form.Item>

          <Form.Item name="attachedObjectsCount" label="Attached objects count">
            <InputNumber min={0} className="w-full" size="large" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateDesignerModal;