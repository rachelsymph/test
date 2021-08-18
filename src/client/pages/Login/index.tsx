import { Checkbox, Input, Form } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';

import { login } from 'src/client/api/AuthApi';
import { Button, Text } from 'src/client/components';

import { Container, FormHeader } from './styles';

type LoginForm = {
  username: string;
  password: string;
};

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 4 },
};

const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 4,
  },
};

const formInitialValues = { remember: true };
const usernameRules = [
  { required: true, message: 'Please input your username.' },
];
const passwordRules = [
  { required: true, message: 'Please input your password.' },
];

type Props = {};

export default function LoginPage(props: Props) {
  const [form] = Form.useForm();
  const { isLoading, mutate } = useMutation(login, {
    onSuccess: () => {
      window.location.reload();
    },
  });

  function handleFinish(values: LoginForm) {
    mutate(values);
  }

  function handleFinishFailed() {}

  return (
    <Container>
      <Form
        {...layout}
        name="basic"
        form={form}
        initialValues={formInitialValues}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      >
        <FormHeader>
          <Text as="h3" textType="medium">
            Giving Side
          </Text>
          <Text>Login to get started</Text>
        </FormHeader>
        <Form.Item label="Username" name="username" rules={usernameRules}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={passwordRules}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            loading={isLoading}
            htmlType="submit"
            size="medium"
            type="primary"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}
