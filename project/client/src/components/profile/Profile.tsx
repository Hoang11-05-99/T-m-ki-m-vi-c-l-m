/* eslint-disable react-hooks/exhaustive-deps */
import {
  BankOutlined,
  ContactsOutlined,
  DollarCircleOutlined,
  EditOutlined,
  FileDoneOutlined,
  LineChartOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProfileAction } from "../../redux/action/profile";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  profileSelectors,
  setStatusProfile,
} from "../../redux/reducers/profile.reducer";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0 30px 50px 30px;
  background-color: #f2f2f2;
`;
const Title = styled.h1`
  font-size: 45px;
  color: rgb(11, 20, 38);
  text-align: center;
  margin-bottom: 50px;
  text-transform: uppercase;
`;
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
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 700;
  }
`;
const BlockUpdate = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 20px 0 20px;
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
    font-size: 2rem;
    font-weight: 700;
    text-transform: uppercase;
  }
`;
const Description = styled.div`
  display: flex;
`;
const LeftDescription = styled.div`
  display: flex;
  flex-direction: column;
  & p {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
  }
`;
const RightDescription = styled.div`
  display: flex;
  flex-direction: column;
  & p {
    font-size: 20px;
    padding-left: 10px;
    margin: 0;
  }
`;

const TextDescription = styled.p`
  font-size: 20px;
  margin: 0;
`;
const Warning = styled.h1`
  font-size: 24px;
  text-align: center;
  padding: 100px;
  height: 100vh;
`;
const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector(profileSelectors.getProfileSelector);

  useLayoutEffect(() => {
    dispatch(getProfileAction());
    dispatch(setStatusProfile());
  }, []);

  if (profile === null) {
    return (
      <Wrapper>
        <Warning>
          ⚠️ Tài khoản này chưa được tạo hồ sơ, bạn cần tạo một hồ sơ để có thể
          ứng tuyển vào công việc mong muốn. Tạo hồ sơ{" "}
          <a href="/profile/createProfile">tại đây</a>.
        </Warning>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <Title>HỒ SƠ CÁ NHÂN</Title>
        <Block>
          <BlockUpdate>
            <EditOutlined
              style={{ fontSize: "30px" }}
              onClick={() => {
                navigate("/profile/updateProfile");
                dispatch(getProfileAction());
              }}
            />
          </BlockUpdate>
          <TitleBlock>
            <Avatar size={99} src={profile.imgUrl} />
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
                <TextDescription>{profile?.hobby}</TextDescription>
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
                <TextDescription>{profile?.degree}</TextDescription>
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
      </Wrapper>
    );
  }
};

export default Profile;
