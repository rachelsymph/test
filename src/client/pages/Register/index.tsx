import { Input, Form, message, Typography } from 'antd';
import React from 'react';
import { useMutation } from 'react-query';

import { register } from 'src/client/api/AuthApi';
import { Button } from 'src/client/components';

import { Container, FormHeader } from './styles';

type RegistrationForm = {
  email: string;
  name: string;
  password: string;
  username: string;
};

const { Text, Title } = Typography;

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 6 },
};

const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 4,
  },
};

const nameRules = [{ required: true, message: 'Please input your name.' }];
const emailRules = [{ required: true, message: 'Please input your email.' }];
const usernameRules = [
  { required: true, message: 'Please input your username.' },
];
const passwordRules = [
  { required: true, message: 'Please input your password.' },
];

type Props = {};

export default function RegistrationPage(props: Props) {
  const [form] = Form.useForm();
  const { isLoading, mutate } = useMutation(register, {
    onSuccess: (data) => {
      message.success('User registered successfully!');
    },
  });

  function handleFinish(values: RegistrationForm) {
    mutate(values);
  }

  function handleFinishFailed() {}

  return (
    <Container>
      <FormHeader>
        <Title level={3}>Register</Title>
        <Text>
          <Text type="danger">*</Text> is a required field.
        </Text>
      </FormHeader>
      <Form
        {...layout}
        name="basic"
        form={form}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      >
        <Form.Item label="Name" name="name" rules={nameRules}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={emailRules}>
          <Input />
        </Form.Item>
        <Form.Item label="Username" name="username" rules={usernameRules}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={passwordRules}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}
