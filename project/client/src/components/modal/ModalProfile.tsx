import {
  BankOutlined,
  ContactsOutlined,
  DollarCircleOutlined,
  FileDoneOutlined,
  LineChartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Modal } from "antd";
import React from "react";
import styled from "styled-components";
import { Profile } from "../../api/type/profile";

interface Props {
  profile: Profile;
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.125rem solid rgba(0, 0, 0, 0.125);
  border-radius: 15px;
`;
const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 0.125rem solid rgba(0, 0, 0, 0.125);
  padding: 0 20px 30px 20px;
  & p {
    margin: 0;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: 700;
  }
`;
const ContentBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;
  background-color: #fff;
  background-clip: border-box;
  border-bottom: 0.125rem solid rgba(0, 0, 0, 0.125);
`;

const FooterBlock = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px 20px;
  background-color: #fff;
  background-clip: border-box;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 30px 10px 30px;
  & p {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    white-space: nowrap;
  }
`;
const Description = styled.div`
  display: flex;
`;
const LeftDescription = styled.div`
  display: flex;
  flex-direction: column;
  & p {
    font-size: 13px;
    font-weight: 700;
    margin: 0;
    white-space: nowrap;
  }
`;
const RightDescription = styled.div`
  display: flex;
  flex-direction: column;
  & p {
    font-size: 13px;
    padding-left: 10px;
    margin: 0;
  }
`;

const TextDescription = styled.p`
  font-size: 13px;
  margin: 0;
`;
const ModalProfile: React.FC<Props> = ({
  isShowModal,
  setIsShowModal,
  profile,
}) => {
  const handleCancel = () => {
    setIsShowModal(false);
  };
  return (
    <Modal
      visible={isShowModal}
      onCancel={handleCancel}
      bodyStyle={{ width: "100%" }}
      footer={[<Button onClick={handleCancel} type="primary">Đóng</Button>]}
    >
      <Block>
        <TitleBlock>
          <Avatar size={64} src={profile.imgUrl} />
          <p>{profile?.name}</p>
        </TitleBlock>
        <ContentBlock>
          <Box>
            <ContentBox>
              <ContactsOutlined style={{ fontSize: "30px" }} />
              <p>Thông tin</p>
            </ContentBox>
            <Description>
              <LeftDescription>
                <p>Giới tính</p>
                <p>Ngày sinh</p>
                <p>E-mail</p>
                <p>Điện thoại</p>
              </LeftDescription>
              <RightDescription>
                <p>{profile?.gender}</p>
                <p>{profile?.birthday}</p>
                <p>{profile?.email}</p>
                <p>{profile?.phone}</p>
              </RightDescription>
            </Description>
          </Box>
          <Box>
            <ContentBox>
              <LineChartOutlined style={{ fontSize: "30px" }} />
              <p>kỹ năng</p>
            </ContentBox>
            <Description>
              <TextDescription>{profile?.skill}</TextDescription>
            </Description>
          </Box>
          <Box>
            <ContentBox>
              <SmileOutlined style={{ fontSize: "30px" }} />
              <p>sở thích</p>
            </ContentBox>
            <Description>
              {/* <TextDescription>{profile?.hobby}</TextDescription> */}
            </Description>
          </Box>
        </ContentBlock>
        <FooterBlock>
          <Box>
            <ContentBox>
              <BankOutlined style={{ fontSize: "30px" }} />
              <p>Học vấn</p>
            </ContentBox>
            <Description>
              {/* <TextDescription>{profile?.degree}</TextDescription> */}
            </Description>
          </Box>
          <Box>
            <ContentBox>
              <FileDoneOutlined style={{ fontSize: "30px" }} />
              <p>Kinh nghiệm</p>
            </ContentBox>
            <Description>
              <TextDescription>{profile?.experience}</TextDescription>
            </Description>
          </Box>
          <Box>
            <ContentBox>
              <DollarCircleOutlined style={{ fontSize: "30px" }} />
              <p>Mục tiêu</p>
            </ContentBox>
            <Description>
              <TextDescription>{profile?.target}</TextDescription>
            </Description>
          </Box>
        </FooterBlock>
      </Block>
    </Modal>
  );
};

export default ModalProfile;
