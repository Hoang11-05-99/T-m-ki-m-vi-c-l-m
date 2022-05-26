/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { Recruitment } from "../../api/type/recruitment";
import { createRecuitmentAction } from "../../redux/action/recruitment";
import { useSelector } from "react-redux";
import {
  recruitmentSelectors,
  setMessageRecruitment,
  setStatusRecruitment,
} from "../../redux/reducers/recruitment.reducer";
import UploadImage from "../upload/UploadImg";
import { toast } from "react-toastify";

const { Option } = Select;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 30px 50px 30px;
  background-color: #f0f0f0;
  h1 {
    text-align: center;
    padding: 30px 0;
  }
`;

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
const CreateRecruitment: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const status = useSelector(recruitmentSelectors.isStatusSelector);
  const messageRecruitment = useSelector(
    recruitmentSelectors.isMessageSelector
  );
  const [imageUrl, setImageUrl] = useState("");

  const onFinish = async ({
    address,
    description,
    email,
    phone,
    salary,
    title,
    imgUrl,
    contact,
    type,
    quantity,
    rank,
    workExperience,
    workingForm,
  }: Recruitment) => {
    try {
      imgUrl = imageUrl;
      await dispatch(
        createRecuitmentAction({
          address,
          description,
          email,
          phone,
          salary,
          imgUrl,
          title,
          type,
          contact,
          quantity,
          rank,
          workExperience,
          workingForm,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 200) {
      toast.success(messageRecruitment);
      dispatch(setMessageRecruitment());
      dispatch(setStatusRecruitment());
      navigate("/recruitment/myRecruitment");
    } else if (status === 400) {
      toast.warning(messageRecruitment);
      dispatch(setMessageRecruitment());
      dispatch(setStatusRecruitment());
      navigate("/recruitment/myRecruitment");
    }
  }, [status]);

  return (
    <Wrapper>
      <h1>Tạo bài đăng tuyển dụng</h1>
      <Form
        name="nest-messages"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        autoComplete="off"
        style={{ marginTop: "30px" }}
      >
        <Form.Item
          name="title"
          label="Tiêu đề hoặc vị trí tuyển dụng"
          rules={[{ required: true }, { type: "string", min: 10, max: 25 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mô tả công việc"
          name="description"
          rules={[
            {
              required: true,
            },
            { type: "string", min: 50, max: 999 },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Số lượng người cần tuyển"
          rules={[{ required: true }, { type: "string" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tiền lương"
          name="salary"
          rules={[{ required: true }]}
        >
          <Select placeholder="Lương" allowClear>
            <Option value={0}>Dưới 3 triệu</Option>
            <Option value={1}>3 - 5 triệu</Option>
            <Option value={2}>5 - 7 triệu</Option>
            <Option value={3}>7 - 10 triệu</Option>
            <Option value={4}>10 - 12 triệu</Option>
            <Option value={5}>12 - 15 triệu</Option>
            <Option value={6}>15 - 20 triệu</Option>
            <Option value={7}>20 - 25 triệu</Option>
            <Option value={8}>25 - 30 triệu</Option>
            <Option value={9}>Thỏa thuận</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true }]}>
          <Select placeholder="Địa chỉ" allowClear>
            <Option value={0}>Hà Nội</Option>
            <Option value={1}>Đà Nẵng</Option>
            <Option value={2}>Hồ Chí Minh</Option>
            <Option value={3}>Vinh</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Hình thức làm việc"
          name="workingForm"
          rules={[{ required: true }]}
        >
          <Select placeholder="Hình thức làm việc" allowClear>
            <Option value={0}>Toàn thời gian</Option>
            <Option value={1}>Bán thời gian</Option>
            <Option value={2}>Thực tập</Option>
            <Option value={3}>Remote - Làm việc từ xa</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Cấp bậc" name="rank" rules={[{ required: true }]}>
          <Select placeholder="Cấp bậc" allowClear>
            <Option value={0}>Nhân viên</Option>
            <Option value={1}>Trưởng nhóm</Option>
            <Option value={2}>Trưởng / Phó phòng</Option>
            <Option value={3}>Quản lý / Giám sát</Option>
            <Option value={4}>Trưởng chi nhánh</Option>
            <Option value={5}>Phó giám đốc</Option>
            <Option value={6}>Giám đốc</Option>
            <Option value={7}>Thực tập sinh</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Kinh nghiệm làm việc"
          name="workExperience"
          rules={[{ required: true }]}
        >
          <Select placeholder="Kinh nghiệm làm việc" allowClear>
            <Option value={0}>Không yêu cầu kinh nghiệm</Option>
            <Option value={1}>Dưới 1 năm</Option>
            <Option value={2}>1 năm</Option>
            <Option value={3}>2 năm</Option>
            <Option value={4}>3 năm</Option>
            <Option value={5}>4 năm</Option>
            <Option value={6}>5 năm</Option>
            <Option value={7}>Trên 5 năm</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Loại ngành" name="type" rules={[{ required: true }]}>
          <Select placeholder="Hãy chọn loại ngành" allowClear>
            <Option value={0}>Bất Động Sản</Option>
            <Option value={1}>Công Nghệ Thông Tin</Option>
            <Option value={2}>Công Nghệ Thực Phẩm</Option>
            <Option value={3}>Cơ Khí Động Lực</Option>
            <Option value={4}>Dược Học</Option>
            <Option value={5}>Kinh Doanh Quốc Tế</Option>
            <Option value={6}>Kiến trúc</Option>
            <Option value={7}>Kế Toán</Option>
            <Option value={8}>Kỹ Thuật Xây Dựng</Option>
            <Option value={9}>Kỹ Thuật Ô Tô</Option>
            <Option value={10}>Luật</Option>
            <Option value={11}>Marketing</Option>
            <Option value={12}>Ngôn Ngữ Anh</Option>
            <Option value={13}>Quản Lý Đất Đai</Option>
            <Option value={14}>Quản Trị Khách Sạn</Option>
            <Option value={15}>Quản Trị Nhà Hàng</Option>
            <Option value={16}>Quản Trị Kinh Doanh</Option>
            <Option value={17}>Tài Chính Ngân Hàng</Option>
            <Option value={18}>Tài Nguyên Môi Trường</Option>
            <Option value={19}>Khác</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true }, { type: "string", len: 10 }]}
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
          label="Người liên hệ"
          name="contact"
          rules={[{ required: true, type: "string", min: 10, max: 99 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Hình ảnh" name="imgUrl">
          <UploadImage imageUrl={imageUrl!} setImageUrl={setImageUrl} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button type="primary" htmlType="submit">
            Đăng tuyển dụng
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default CreateRecruitment;
