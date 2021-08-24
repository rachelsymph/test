import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Popconfirm, Space, Table } from 'antd';
import React from 'react';

import { Button } from 'src/client/components';
import { useGetGives } from 'src/client/hooks/queries';
import AdminSiderLayout from 'src/client/layouts/AdminSiderLayout';
import { transformToTable } from 'src/client/utils/GiveUtils';
import routes from 'src/commons/constants/routes';
import { Indexable } from 'src/commons/types/Indexable.type';

const breadcrumbItems = [
  {
    href: routes.ROOT,
    title: 'Dashboard',
  },
  {
    href: routes.GIVES,
    title: 'Gives',
  },
];

type MakeColumnParams = {
  onClickEdit: (giveId: string) => void;
  onConfirmDelete: (giveId: string) => void;
};

export default function AdminGivesPage() {
  const { data, isLoading } = useGetGives();

  function handleConfirmDelete(giveId: string) {}

  function handleClickEdit(giveId: string) {}

  function handleOpenCreateModal() {}

  const columns = makeColumns({
    onClickEdit: handleClickEdit,
    onConfirmDelete: handleConfirmDelete,
  });

  const buttonExtra = (
    <Space>
      <Button type="primary" onClick={handleOpenCreateModal}>
        <PlusOutlined />
        Add Give
      </Button>
    </Space>
  );

  return (
    <AdminSiderLayout breadcrumbItems={breadcrumbItems} pageTitle="Gives Page">
      <Card extra={buttonExtra} title="Gives">
        <Table
          columns={columns}
          dataSource={data?.data.map(transformToTable)}
          loading={isLoading}
          pagination={false}
        />
      </Card>
    </AdminSiderLayout>
  );
}

function makeColumns(params: MakeColumnParams) {
  const { onClickEdit, onConfirmDelete } = params;

  return [
    {
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      title: 'Date',
    },
    {
      dataIndex: 'donor',
      key: 'donor',
      title: 'Donor',
    },
    {
      dataIndex: 'recipient',
      key: 'recipient',
      title: 'Recipient',
    },
    {
      dataIndex: 'platform',
      key: 'platform',
      title: 'Platform',
    },
    {
      dataIndex: 'amount',
      key: 'amount',
      title: 'Amount',
    },
    {
      dataIndex: 'taxDeductible',
      key: 'taxDeductible',
      title: 'Tax Deductible',
    },
    {
      dataIndex: 'status',
      key: 'status',
      title: 'Status',
    },
    {
      key: 'action',
      title: 'Actions',
      render: (text: string, record: Indexable) => {
        function handleConfirmDelete() {
          onConfirmDelete(record.id);
        }

        function handleClickEdit() {
          onClickEdit(record.id);
        }

        return (
          <Space size="small">
            <Button
              size="small"
              type="primary-outline"
              onClick={handleClickEdit}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Are you sure delete this group?"
              onConfirm={handleConfirmDelete}
            >
              <Button size="small" type="primary-outline">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
}
