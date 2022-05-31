/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select } from "antd";
import styled from "styled-components";
import { Profile } from "../../api/type/profile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getProfileAction,
  updateProfileAction,
} from "../../redux/action/profile";
import { useNavigate } from "react-router-dom";
import {
  profileSelectors,
  setMessageProfile,
  setStatusProfile,
} from "../../redux/reducers/profile.reducer";
import { toast } from "react-toastify";
import UploadImage from "../upload/UploadImg";
import {
  dataRank,
  dataSalary,
  dataType,
  dataWorkingForm,
} from "../../config/data";
import moment from "moment";

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
    font-size: 50px;
    font-style: oblique;
    padding-bottom: 30px;
    color: rgb(4, 54, 153);
    margin: 0;
  }
`;
const UpdateProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector(profileSelectors.getProfileSelector);
  const [imageUrl, setImageUrl] = useState(profile?.imgUrl!);
  const status = useAppSelector(profileSelectors.isStatusSelector);
  const message = useAppSelector(profileSelectors.isMessageSelector);

  const onFinish = ({
    email,
    birthday,
    experience,
    gender,
    address,
    branch,
    branchWant,
    endDay,
    firstDay,
    language,
    marry,
    rank,
    salary,
    schoolName,
    workForm,
    imgUrl,
    name,
    phone,
    skill,
    target,
  }: Profile) => {
    imgUrl = imageUrl;
    dispatch(
      updateProfileAction({
        birthday,
        email,
        experience,
        gender,
        address,
        branch,
        branchWant,
        endDay,
        firstDay,
        language,
        marry,
        rank,
        salary,
        schoolName,
        workForm,
        imgUrl,
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

  useEffect(() => {
    if (status === 200) {
      toast.success(message);
      dispatch(setStatusProfile());
      dispatch(setMessageProfile());
    } else if (status === 400) {
      toast.error(message);
      dispatch(setStatusProfile());
      dispatch(setMessageProfile());
    }
  }, [status]);
  useEffect(() => {
    dispatch(getProfileAction());
  }, []);
  return (
    <Wrapper>
      <h1>Cập nhât hồ sơ xin việc</h1>
      <Form
        name="nest-messages"
        labelCol={{ span: 11 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        autoComplete="off"
        style={{ marginTop: "30px", display: "flex", flexDirection: "column" }}
        fields={[
          { name: ["name"], value: profile?.name },
          { name: ["email"], value: profile?.email },
          { name: ["phone"], value: profile?.phone },
          { name: ["skill"], value: profile?.skill },
          { name: ["gender"], value: profile?.gender },
          { name: ["target"], value: profile?.target },
          {
            name: ["birthday"],
            value: moment(profile?.birthday).format("DD/MM/YYYY"),
          },
          { name: ["experience"], value: profile?.experience },
          { name: ["address"], value: profile?.address },
          { name: ["branch"], value: profile?.branch },
          { name: ["branchWant"], value: profile?.branchWant },
          { name: ["marry"], value: profile?.marry },
          { name: ["endDay"], value: profile?.endDay },
          { name: ["firstDay"], value: profile?.firstDay },
          { name: ["language"], value: profile?.language },
          { name: ["schoolName"], value: profile?.schoolName },
          { name: ["rank"], value: profile?.rank },
          { name: ["workForm"], value: profile?.workForm },
          { name: ["salary"], value: profile?.salary },
        ]}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          }}
        >
          <div>
            <h3 style={{ textAlign: "center", color: "#da6500" }}>
              Thông tin cá nhân
            </h3>
            <Form.Item label="Ảnh thẻ hồ sơ" name="imgUrl">
              <UploadImage imageUrl={imageUrl!} setImageUrl={setImageUrl} />
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
              name="gender"
              label="Giới tính"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn giới tính" allowClear>
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="marry"
              label="Tình trạng hôn nhân "
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn tình trạng hôn nhân" allowClear>
                <Option value="Độc thân">Độc thân</Option>
                <Option value="Đã kết hôn">Đã kết hôn</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birthday"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <h3 style={{ textAlign: "center", color: "#da6500" }}>
              Thông tin liên hệ
            </h3>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, type: "string", len: 10 }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <h3 style={{ textAlign: "center", color: "#da6500" }}>
              Học vấn/Ngoại ngữ
            </h3>
            <Form.Item
              label="Thời gian bắt đầu"
              name="firstDay"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Thời gian kết thúc"
              name="endDay"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên trường"
              name="schoolName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ngành học"
              name="branch"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn ngành học" allowClear>
                {dataType.map((item, index) => {
                  return (
                    <Option value={item.type} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngoại ngữ"
              name="language"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <h3 style={{ textAlign: "center", color: "#da6500" }}>
              Học vấn/Ngoại ngữ
            </h3>
            <Form.Item
              label="Số năm kinh nghiệm"
              name="experience"
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Kỹ năng"
              name="skill"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
          <div>
            <h3 style={{ textAlign: "center", color: "#da6500" }}>Mục tiêu</h3>
            <Form.Item
              label="Mức lương mong muốn"
              name="salary"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn mức lương" allowClear>
                {dataSalary.map((item, index) => {
                  return (
                    <Option value={item.salary} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Cấp bậc mong muốn"
              name="rank"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn cấp bậc" allowClear>
                {dataRank.map((item, index) => {
                  return (
                    <Option value={item.rank} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Loại công việc"
              name="workForm"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn loại công việc" allowClear>
                {dataWorkingForm.map((item, index) => {
                  return (
                    <Option value={item.typeWork} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Ngành nghề mong muốn"
              name="branchWant"
              rules={[{ required: true }]}
            >
              <Select placeholder="Hãy chọn ngành" allowClear>
                {dataType.map((item, index) => {
                  return (
                    <Option value={item.type} key={index}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Mục tiêu nghề nghiệp"
              name="target"
              rules={[{ required: true }]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          wrapperCol={{ offset: 8, span: 8 }}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default UpdateProfile;
