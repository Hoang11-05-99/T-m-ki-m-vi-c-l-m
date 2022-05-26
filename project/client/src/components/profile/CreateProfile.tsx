/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import styled from "styled-components";
import { Profile } from "../../api/type/profile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createProfileAction } from "../../redux/action/profile";
import { useNavigate } from "react-router-dom";
import {
  profileSelectors,
  setMessageProfile,
  setStatusProfile,
} from "../../redux/reducers/profile.reducer";
import { toast } from "react-toastify";
import UploadImage from "../upload/UploadImg";

const { Option } = Select;

const validateMessages = {
  required: "Bắt buộc nhập ${label}!",
  types: {
    email: "${label} không đúng định dạng!",
    number: "${label} không đúng định dạng!",
  },
  string: {
    range: "${label} phải nhập trong khoảng ${min} và ${max} kí tự",
    len: "${label} phải có chính xác ${len} kí tự",
  },
  number: {
    range: "${label} phải nhập trong khoảng ${min} và ${max}",
  },
};

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0 30px 50px 30px;
  background-color: rgba(0, 0, 0, 0.03);
  h1 {
    text-align: center;
    padding: 30px 0;
  }
`;
const CreateProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [birthday, setDate] = React.useState("");
  const [imageUrl, setImageUrl] = useState("");
  const status = useAppSelector(profileSelectors.isStatusSelector);
  const messageProfile = useAppSelector(profileSelectors.isMessageSelector);

  const onFinish = ({
    degree,
    email,
    experience,
    gender,
    hobby,
    name,
    phone,
    imgUrl,
    skill,
    target,
  }: Profile) => {
    imgUrl = imageUrl;
    dispatch(
      createProfileAction({
        birthday,
        degree,
        email,
        experience,
        imgUrl,
        gender,
        hobby,
        name,
        phone,
        skill,
        target,
      })
    );
    setTimeout(() => {
      navigate("/profile");
    }, 2500);
  };
  function onChange(date: any, dateString: string) {
    setDate(dateString);
  }

  useEffect(() => {
    if (status === 200) {
      toast.success(messageProfile);
      dispatch(setStatusProfile());
      dispatch(setMessageProfile());
    } else if (status === 400) {
      toast.error(messageProfile);
      dispatch(setStatusProfile());
      dispatch(setMessageProfile());
    }
  });

  return (
    <Wrapper>
      <h1>Tạo hồ sơ cá nhân</h1>
      <Form
        name="nest-messages"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ marginTop: "30px" }}
        validateMessages={validateMessages}
      >
        <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
          <Select placeholder="Hãy chọn giới tính" allowClear>
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[
            {
              required: true,
              type: "string",
              min: 3,
              max: 25,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="birthday"
          rules={[{ required: true }]}
        >
          <DatePicker placeholder="dd/mm/yyyy" format={"DD/MM/YYYY"} onChange={onChange} />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, type: "string", len: 10 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Học vấn" name="degree" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Kinh nghiệm"
          name="experience"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Kỹ năng" name="skill" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Sở thích" name="hobby" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Mục tiêu" name="target" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Hình ảnh"
          name="imgUrl"
        >
          <UploadImage imageUrl={imageUrl!} setImageUrl={setImageUrl} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Tạo
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default CreateProfile;
