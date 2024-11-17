import React, { useState, useRef, useEffect } from 'react'
import { Modal, Radio, Form, Checkbox, Input, Row, Col, Button } from 'antd'
import styles from '../css/LoginForm.module.css'
import { getCaptcha, useIsExist } from '../api/user';

export default function LoginForm(props) {

    const [value, setValue] = useState(1);
    const loginFormRef = useRef();
    const registerFormRef = useRef();
    const [captcha, setCaptcha] = useState(null);

    // 登录表单的状态数据
    const [loginInfo, setLoginInfo] = useState({
        loginId: "",
        loginPwd: "",
        captcha: "",
        remember: false
    });
    // 注册表单的状态数据
    const [registerInfo, setRegisterInfo] = useState({
        loginId : "",
        nickname : "",
        captcha: "",
    })


    useEffect(() => {
        fetchCaptchaData()
    }, [props.isShow])

    // 获取验证码
    async function fetchCaptchaData() {
        const result = await getCaptcha() || {}
        setCaptcha(result)
    }

    const handleModalOk = () => {
        props.closeModal()
    };

    function loginHandle () {
        console.log('loginHandle')
    }
    // 验证码点击刷新
    const captchaClickHandle = () => {
        fetchCaptchaData()
    }

    // 注册/登录切换
    const onChange = (e) => {
        setValue(e.target.value)
        fetchCaptchaData()
    }

    const registerHandle = (e) => {
        console.log('registerHandle ')
    }
    // 登录ID校验
    const checkLoginIdIsExist = async function () {
        const result = await useIsExist(registerInfo.loginId)
        if (result) {
            return  Promise.reject('该用户已存在！')
        }
    }

    /**
     * 
     * @param {*} oldInfo 之前整体的状态
     * @param {*} newContent 用户输入的内容
     * @param {*} key 需要更新的key
     * @param {*} setInfo 修改状态值的函数
     */
    const updateInfo = (oldInfo, newContent, key, setInfo) => {
        setInfo({
            [key]: newContent
        })
    }

    let container = null;
    if (value === 1) {
        // 登录面板的 JSX
        container = (
            <div className={styles.container}>
                <Form
                    name="basic1"
                    autoComplete="off"
                    onFinish={loginHandle}
                    ref={loginFormRef}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号"
                            }
                        ]}
                    >
                        <Input
                            placeholder="请输入你的登录账号"
                            value={loginInfo.loginId}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginId', setLoginInfo)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="登录密码"
                        name="loginPwd"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="请输入你的登录密码，新用户默认为123456"
                            value={loginInfo.loginPwd}
                            onChange={(e) => updateInfo(loginInfo, e.target.value, 'loginPwd', setLoginInfo)}
                        />
                    </Form.Item>

                    {/* 验证码 */}
                    <Form.Item
                        name="logincaptcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            },
                        ]}
                    >
                        <Row align="middle">
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={loginInfo.captcha}
                                    onChange={(e) => updateInfo(loginInfo, e.target.value, 'captcha', setLoginInfo)}
                                />
                            </Col>
                            <Col span={6}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={captchaClickHandle}
                                    dangerouslySetInnerHTML={{ __html: captcha }}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Checkbox
                            onChange={(e) => updateInfo(loginInfo, e.target.checked, 'remember', setLoginInfo)}
                            checked={loginInfo.remember}
                        >记住我</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 20 }}
                        >
                            登录
                        </Button>
                        <Button type="primary" htmlType="submit">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    } else {
        // 注册面板的 JSX
        container = (
            <div className={styles.container}>
            <Form
                name="basic2"
                autoComplete="off"
                ref={registerFormRef}
                onFinish={registerHandle}
            >
                <Form.Item
                    label="登录账号"
                    name="loginId"
                    rules={[
                        {
                            required: true,
                            message: "请输入账号，仅此项为必填项",
                        },
                        // 验证用户是否已经存在
                        { validator: checkLoginIdIsExist }
                    ]}
                    validateTrigger='onBlur'
                >
                    <Input
                        placeholder="请输入账号"
                        value={registerInfo.loginId}
                        onChange={(e) => updateInfo(registerInfo, e.target.value, 'loginId', setRegisterInfo)}
                    />
                </Form.Item>

                <Form.Item
                    label="用户昵称"
                    name="nickname"
                >
                    <Input
                        placeholder="请输入昵称，不填写默认为新用户xxx"
                        value={registerInfo.nickname}
                        onChange={(e) => updateInfo(registerInfo, e.target.value, 'nickname', setRegisterInfo)}
                    />
                </Form.Item>

                <Form.Item
                    name="registercaptcha"
                    label="验证码"
                    rules={[
                        {
                            required: true,
                            message: '请输入验证码',
                        },
                    ]}
                >
                    <Row align="middle">
                        <Col span={16}>
                            <Input
                                placeholder="请输入验证码"
                                value={registerInfo.captcha}
                                onChange={(e) => updateInfo(registerInfo, e.target.value, 'captcha', setRegisterInfo)}
                            />
                        </Col>
                        <Col span={6}>
                            <div
                                className={styles.captchaImg}
                                onClick={captchaClickHandle}
                                dangerouslySetInnerHTML={{ __html: captcha }}
                            ></div>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 5,
                        span: 16,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: 20 }}
                    >
                        注册
                    </Button>
                    <Button type="primary" htmlType="submit">
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
        );
    }

    return (
        <div>
            <Modal title="登录/注册" open={props.isShow} onOk={handleModalOk} onCancel={props.closeModal}>
                <Radio.Group
                    value={value}
                    onChange={onChange}
                    className={styles.radioGroup}
                    buttonStyle="solid"
                >
                    <Radio.Button value={1} className={styles.radioButton}>登录</Radio.Button>
                    <Radio.Button value={2} className={styles.radioButton}>注册</Radio.Button>
                </Radio.Group>
                {/* 下面需要显示对应功能的表单 */}
                {container}
            </Modal>
        </div>
    )
}
