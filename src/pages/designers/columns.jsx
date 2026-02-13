import { Button, Dropdown } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const getDesignerColumns = (onEdit, onDelete) => [
  {
    title: "Full name",
    dataIndex: "fullName",
    key: "fullName",
    sorter: (a, b) => a.fullName.localeCompare(b.fullName),
  },
  {
    title: "Working hours",
    dataIndex: "workingHours",
    key: "workingHours",
    render: (hours) => `${hours} hours`,
  },
  {
    title: "Attached objects count",
    dataIndex: "attachedObjectsCount",
    key: "attachedObjectsCount",
    align: "center",
  },
  {
    key: "actions",
    width: 100,
    render: (_, record) => (
      <Dropdown
        menu={{
          items: [
            {
              key: "edit",
              label: "Edit",
              icon: <EditOutlined />,
              onClick: () => onEdit(record),
            },
            {
              key: "delete",
              label: "Delete",
              icon: <DeleteOutlined />,
              danger: true,
              onClick: () => onDelete(record.id),
            },
          ],
        }}
        trigger={["click"]}
      >
        <Button
          type="text"
          icon={<MoreOutlined style={{ fontSize: "20px" }} />}
        />
      </Dropdown>
    ),
  },
];
