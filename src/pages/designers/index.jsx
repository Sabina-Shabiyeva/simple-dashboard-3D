import React, { useState, useEffect } from "react";
import { Button, Typography, Modal, Table, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getDesignerColumns } from "./columns";
import CreateDesignerModal from "./create-designer-modal";
import { designerService } from "../../services/designer"; // Servisi import edirik

const { Title } = Typography;

const Designers = () => {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  const fetchDesigners = async () => {
    setLoading(true);
    try {
      const data = await designerService.getAll();
      setDesigners(data);
    } catch (error) {
      message.error("Failed to load designers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigners();
  }, []);

  const handleSave = async (values) => {
    setLoading(true);
    try {
      if (editingId) {
        await designerService.update(editingId, values);
        message.success("Information updated");
      } else {
        const newEntry = {
          ...values,
          attachedObjectsCount: values.attachedObjectsCount || 0,
        };
        await designerService.create(newEntry);
        message.success("New designer added");
      }
      fetchDesigners();
      closeModal();
    } catch (error) {
      message.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await designerService.delete(id);
          message.info("Designer deleted");
          fetchDesigners(); 
        } catch (error) {
          message.error("Failed to delete");
        }
      },
    });
  };

  const openModal = (record = null) => {
    if (record) {
      setEditingId(record.id);
      form.setFieldsValue(record);
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 shadow-sm border-0">
      <div className="flex items-center justify-between mb-6">
        <Title level={3} style={{ margin: 0 }}>
          Designers List
        </Title>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => openModal()}
          className="rounded-lg"
        >
          Create
        </Button>
      </div>

      <Table
        dataSource={designers}
        columns={getDesignerColumns(openModal, handleDelete)}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
        scroll={{ x: 600 }}
      />

      <CreateDesignerModal
        open={isModalOpen}
        onCancel={closeModal}
        onSave={handleSave}
        editingId={editingId}
        form={form}
      />
    </div>
  );
};

export default Designers;
