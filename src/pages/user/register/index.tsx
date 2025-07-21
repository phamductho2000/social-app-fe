import { history, Link, useRequest } from '@umijs/max';
import { Button, Col, Form, Input, message, Popover, Progress, Row, Select, Space } from 'antd';
import type { Store } from 'antd/es/form/interface';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { StateType } from './service';
import { fakeRegister } from './service';
import useStyles from './style.style';
import {register} from "@/services/auth/authController";

const FormItem = Form.Item;
const { Option } = Select;

const passwordProgressMap: {
  ok: 'success';
  pass: 'normal';
  poor: 'exception';
} = {
  ok: 'success',
  pass: 'normal',
  poor: 'exception',
};
const Register: FC = () => {
  const { styles } = useStyles();
  const [count, setCount]: [number, any] = useState(0);
  const [open, setVisible]: [boolean, any] = useState(false);
  const [prefix, setPrefix]: [string, any] = useState('86');
  const [popover, setPopover]: [boolean, any] = useState(false);
  const confirmDirty = false;
  let interval: number | undefined;

  const passwordStatusMap = {
    ok: (
      <div className={styles.success}>
        <span>强度：强</span>
      </div>
    ),
    pass: (
      <div className={styles.warning}>
        <span>强度：中</span>
      </div>
    ),
    poor: (
      <div className={styles.error}>
        <span>强度：太短</span>
      </div>
    ),
  };

  const [form] = Form.useForm();
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );
  const onGetCaptcha = () => {
    let counts = 59;
    setCount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setCount(counts);
      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };
  const getPasswordStatus = () => {
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'poor';
  };


  const onFinish = (values: Store) => {
    console.log('values', values)
    register(values).then(res => {
      console.log('res', res)
    })
  };

  const checkConfirm = (_: any, value: string) => {
    const promise = Promise;
    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('两次输入的密码不匹配!');
    }
    return promise.resolve();
  };
  const checkPassword = (_: any, value: string) => {
    const promise = Promise;
    // 没有值的情况
    if (!value) {
      setVisible(!!value);
      return promise.reject('请输入密码!');
    }
    // 有值的情况
    if (!open) {
      setVisible(!!value);
    }
    setPopover(!popover);
    if (value.length < 6) {
      return promise.reject('');
    }
    if (value && confirmDirty) {
      form.validateFields(['confirm']);
    }
    return promise.resolve();
  };
  const changePrefix = (value: string) => {
    setPrefix(value);
  };
  const renderPasswordProgress = () => {
    const value = form.getFieldValue('password');
    const passwordStatus = getPasswordStatus();
    return value && value.length ? (
      <div className={styles[`progress-${passwordStatus}`]}>
        <Progress
          status={passwordProgressMap[passwordStatus]}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>
    ) : null;
  };
  return (
    <div className={styles.main}>
      <h3>Register</h3>
      <Form form={form} name="UserRegister" onFinish={onFinish} layout={"vertical"}>
        <Row gutter={24}>
          <Col span={24}>
            <Row gutter={12}>
              <Col span={12}>
                <FormItem name="firstName" label={"Họ"} rules={[
                  {
                    required: true,
                    // message: '请输入邮箱地址!',
                  },
                ]}>
                  <Input size="large" placeholder="Họ" />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem name="lastName" label={"Tên"} rules={[
                  {
                    required: true,
                    // message: '请输入邮箱地址!',
                  },
                ]}>
                  <Input size="large" placeholder="Tên" />
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <FormItem
              name="email"
              label={"Email"}
              rules={[
                {
                  required: true,
                  message: '请输入邮箱地址!',
                },
                {
                  type: 'email',
                  message: '邮箱地址格式错误!',
                },
              ]}
            >
              <Input size="large" placeholder="email" />
            </FormItem>
          </Col>
          <Col span={24}>
            <Popover
              getPopupContainer={(node) => {
                if (node && node.parentNode) {
                  return node.parentNode as HTMLElement;
                }
                return node;
              }}
              content={
                open && (
                  <div
                    style={{
                      padding: '4px 0',
                    }}
                  >
                    {passwordStatusMap[getPasswordStatus()]}
                    {renderPasswordProgress()}
                    <div
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                    </div>
                  </div>
                )
              }
              overlayStyle={{
                width: 240,
              }}
              placement="right"
              open={open}
            >
              <FormItem
                name="password"
                label={"Mật khẩu"}
                className={
                  form.getFieldValue('password') &&
                  form.getFieldValue('password').length > 0 &&
                  styles.password
                }
                rules={[
                  {
                    validator: checkPassword,
                  },
                ]}
              >
                <Input size="large" type="password" placeholder="Mật khẩu" />
              </FormItem>
            </Popover>
          </Col>
          {/*<Col span={24}>*/}
          {/*  <FormItem*/}
          {/*    name="confirm"*/}
          {/*    rules={[*/}
          {/*      {*/}
          {/*        required: true,*/}
          {/*        message: '确认密码',*/}
          {/*      },*/}
          {/*      {*/}
          {/*        validator: checkConfirm,*/}
          {/*      },*/}
          {/*    ]}*/}
          {/*  >*/}
          {/*    <Input size="large" type="password" placeholder="确认密码" />*/}
          {/*  </FormItem>*/}
          {/*</Col>*/}
          <Col span={24}>
            <FormItem
              name="phone"
              label={"Số điện thoại"}
              rules={[
                {
                  required: true,
                  message: '请输入手机号!',
                },
                // {
                //   pattern: /^\d{11}$/,
                //   message: '手机号格式错误!',
                // },
              ]}
            >
                <Input size="large" placeholder="SDT" />
            </FormItem>
          </Col>
          {/*<Col span={24}>*/}
          {/*  <Row gutter={8}>*/}
          {/*    <Col span={16}>*/}
          {/*      <FormItem*/}
          {/*        name="captcha"*/}
          {/*        rules={[*/}
          {/*          {*/}
          {/*            required: true,*/}
          {/*            message: '请输入验证码!',*/}
          {/*          },*/}
          {/*        ]}*/}
          {/*      >*/}
          {/*        <Input size="large" placeholder="验证码" />*/}
          {/*      </FormItem>*/}
          {/*    </Col>*/}
          {/*    <Col span={8}>*/}
          {/*      <Button*/}
          {/*        size="large"*/}
          {/*        disabled={!!count}*/}
          {/*        className={styles.getCaptcha}*/}
          {/*        onClick={onGetCaptcha}*/}
          {/*      >*/}
          {/*        {count ? `${count} s` : '获取验证码'}*/}
          {/*      </Button>*/}
          {/*    </Col>*/}
          {/*  </Row>*/}
          {/*</Col>*/}
        </Row>
        <FormItem>
          <div className={styles.footer}>
            <Button
              size="large"
              loading={false}
              className={styles.submit}
              type="primary"
              htmlType="submit"
            >
              <span>Đăng ký</span>
            </Button>
            <Link to="/user/login">
              <span>Đăng nhập</span>
            </Link>
          </div>
        </FormItem>
      </Form>
    </div>
  );
};
export default Register;
