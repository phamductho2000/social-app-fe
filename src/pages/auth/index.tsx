import {Button, Card, Checkbox, Col, Form, FormProps, Input, Row} from "antd"
import React from "react";
import {login} from "@/services/auth-service/userController";
import {history} from "@@/exports";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function Login() {

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    login(values).then(res => {
      console.log("res", res);
      if (res?.data) {
        localStorage.setItem('token', res.data.accessToken as string);
        history.push('/dashboard');
      }
    })
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Row justify="center" align="middle" style={{minHeight: '100vh', background: '#f5f5f5'}}>
        <Col xs={24} sm={16} md={12} lg={8} xl={6}>
          <Card style={{borderRadius: 8}}>
            <h2 style={{textAlign: "center"}}>ĐĂNG NHẬP</h2>
            <Form
              layout="vertical"
              name="basic"
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              style={{maxWidth: 600}}
              initialValues={{remember: true}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{required: true, message: 'Please input your username!'}]}
              >
                <Input/>
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
              >
                <Input.Password/>
              </Form.Item>

              <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item label={null}>
                <Button size={"large"} type="primary" htmlType="submit" style={{width: '100%'}}>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
};
