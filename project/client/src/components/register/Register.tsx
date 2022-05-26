/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { IRegisterRequest } from "../../api/type/auth";
import { registerAction } from "../../redux/action/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  authSelectors,
  setAccountAuth,
  setMessageAuth,
  setStatusAuth,
} from "../../redux/reducers/auth.reducer";

const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 70px;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
  font-style: oblique;
  color: rgb(4, 54, 153);
  margin: 0;
`;
const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useAppSelector(authSelectors.isStatusSelector);
  const messageRegister = useAppSelector(authSelectors.isMessageSelector);

  const onFinish = ({ email, passWord, role, userName }: IRegisterRequest) => {
    dispatch(registerAction({ email, passWord, role, userName }));
  };

  useEffect(() => {
    if (status === 200) {
      toast.success(messageRegister);
      dispatch(setMessageAuth());
      dispatch(setStatusAuth());
      dispatch(setAccountAuth());
      navigate("/login");
    } else if (status === 400) {
      toast.error(messageRegister);
      dispatch(setMessageAuth());
      dispatch(setStatusAuth());
    }
  }, [status]);

  return (
    <Wrapper>
      <Title>Đăng kí</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        autoComplete="on"
        style={{ marginTop: "30px" }}
      >
        <Form.Item
          name="role"
          label="Loại tài khoản"
          rules={[{ required: true, message: "Hãy chọn loại tài khoản" }]}
        >
          <Select placeholder="Hãy chọn loại tài khoản" allowClear>
            <Option value="candidate">Ứng viên</Option>
            <Option value="recruiter">Nhà tuyển dụng</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Họ và tên"
          name="userName"
          rules={[
            {
              required: true,
              min: 3,
              max: 25,
              message: "Tối thiểu 3 kí tự và không vượt quá 25 kí tự!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Hãy nhập Email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu"
          name="passWord"
          rules={[{ required: true, min: 6, message: "Tối thiểu 6 kí tự!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Đăng kí
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default Register;
