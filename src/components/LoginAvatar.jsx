import React, { useState } from 'react'
import { Button, Avatar, List, Popover } from 'antd'
import { useSelector } from 'react-redux'
import styles from '../css/LoginAvatar.module.css'
import { UserOutlined } from '@ant-design/icons'

// 该组件用于显示用户的头像，如果用户没有登录，那么就显示登录注册按钮
export default function LoginAvatar(props) {

    const { isLogin, userInfo } = useSelector((state) => state.user)

    function loginHandle() {
        console.log('处理登录事件')
        props.loginHandle()
    }

    // 登录状态dom
    let loginStatus = null

    if (isLogin) {
        // 个人中心列表渲染
        const listCom = (
            <List
                size="small"
                dataSource={['个人中心', '退出登录']}
                renderItem={(item) => <List.Item style={{ cursor: 'pointer' }}>{item}</List.Item>}
            />
        )
        // 已经登录
        loginStatus = (
            <Popover placement="bottom" content={listCom} >
                <div className={styles.avatarContainer}>
                    <Avatar size='large' src={userInfo.avatar} icon={<UserOutlined />} preview='false' />
                </div>
            </Popover>
        )
    } else {
        // 没有登录
        loginStatus = (<Button type='primary' size='large' onClick={loginHandle}>注册/登录</Button>)
    }

    return (
        <div>
            {loginStatus}
        </div>
    )
}




