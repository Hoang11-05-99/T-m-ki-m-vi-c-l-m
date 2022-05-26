import { Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { deleteRecuitmentAction } from "../../redux/action/recruitment";
import { useAppDispatch } from "../../redux/hooks";
import {
  recruitmentSelectors,
  setStatusRecruitment,
} from "../../redux/reducers/recruitment.reducer";

interface Props {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  margin-top: 20px;
`;
const ModalDeleteRecruitment: React.FC<Props> = ({
  isShowModal,
  setIsShowModal,
}) => {
  const dispatch = useAppDispatch();
  const recruitment = useSelector(recruitmentSelectors.getRecruitmentSelector);
  const handleOk = () => {
    dispatch(deleteRecuitmentAction(recruitment?._id!));
    setIsShowModal(false);

    dispatch(setStatusRecruitment());
  };

  const handleCancel = () => {
    setIsShowModal(false);
  };
  return (
    <Modal
      visible={isShowModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Có"
      cancelText="Không"
    >
      <Title>⚠️Bạn có muốn xóa bài đăng tuyển dụng không ?</Title>
    </Modal>
  );
};

export default ModalDeleteRecruitment;
