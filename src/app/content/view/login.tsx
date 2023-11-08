import React from "react";
import { Alert, Button, Checkbox, Form, Input, Space } from "antd";
import useIsMobile from "../../../api/util/useIsMobile";
import { http } from "../../../api/state/http";
import { APP_DOMAIN } from "../../../config";
import storageService from "../../../api/util/storageServicve";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

type ResultType = {
  type: "success" | "error" | "pending";
  message: string;
};

const Login: React.FC = () => {
  const isMobile = useIsMobile();
  const [result, setResult] = React.useState<ResultType>({
    type: "pending",
    message: "",
  });
  const navigate = useNavigate();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Space
      size={isMobile ? "large" : "large"}
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={async (value) => {
          try {
            const res: string = await http.post(`${APP_DOMAIN}/api/auth/login`, {
              email: value.email,
              password: value.password,
            });
            storageService.setItem("ACCESS_TOKEN", res);
            setResult({
              type: "success",
              message: "Login Success",
            });
            navigate("/companies");
          } catch (error) {
            setResult({
              type: "error",
              message: "Login Failed, credential is not correct",
            });
          }
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item<FieldType> label="Email" name="email" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>

        <Form.Item<FieldType> label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password />
        </Form.Item>

        {result.type === "success" && <Alert message={result.message} type="success" />}
        {result.type === "error" && <Alert message={result.message} type="error" />}

        <Form.Item<FieldType> name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Login;
