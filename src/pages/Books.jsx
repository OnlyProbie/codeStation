import React from 'react'
import PerforManceTable from '../components/PerforManceTable'
import UploadJson from '../components/UploadJson'
import { Layout, theme } from 'antd';
const { Header, Content } = Layout;

export default function Books() {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
        <Header
          style={{
            padding: '20px 50px',
            background: colorBgContainer,
            height: 'auto'
          }}
        >
          <UploadJson />
        </Header>
        <Content
          style={{
            margin: '24px 16px 20px',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <PerforManceTable />
          </div>
        </Content>
      </Layout>
  )
}
