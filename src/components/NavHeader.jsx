import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Input, Select, Space } from 'antd'

const { Search } = Input

export default function PageHeader() {
  return (
    <div className='headerContainer'>
      {/* 头部 */}
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      {/* 头部导航 */}
      <nav className="navContainer">
        <NavLink to='/issues' className='navigation'>问答</NavLink>
        <NavLink to='/books' className='navigation'>书籍</NavLink>
        <NavLink to='/interviews' className='navigation'>面试题</NavLink>
        <a href='https://www.baidu.com' className='navigation' target='_blank'>视频教程</a>
      </nav>
      {/* 搜索 */}
      <div className="searchContainer">
        <Space.Compact>
          <Select
            defaultValue="问答"
            size='large'
            options={[
              { value: '问答', label: '问答' },
              { value: '面试题', label: '面试题' }
            ]}
          />
          <Search 
            placeholder="请输入要搜索的内容……"
            allowClear
            enterButton="搜索"
            size="large"
          />
        </Space.Compact>
      </div>
      {/* 登录按钮 */}
      <div className="loginBtnContainer">
        <Button type='primary' size='large'>注册/登录</Button>
      </div>
    </div>
  )
}
