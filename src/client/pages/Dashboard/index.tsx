import { Result } from 'antd';
import React from 'react';

import AdminSiderLayout from 'src/client/layouts/AdminSiderLayout';

const breadcrumbItems: any = [];

export default function DashboardPage() {
  return (
    <AdminSiderLayout
      breadcrumbItems={breadcrumbItems}
      pageTitle="Dashboard Page"
    >
      <Result
        status="404"
        title="Under Construction"
        subTitle={
          <>
            <p>
              Sorry, the page you visited is under construction.
              <br />
              We&apos;re working hard to make this page available.
            </p>
          </>
        }
      />
    </AdminSiderLayout>
  );
}
