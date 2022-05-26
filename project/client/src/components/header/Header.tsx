/* eslint-disable react-hooks/exhaustive-deps */
import {
  BellOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  KeyOutlined,
  LogoutOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Popover } from "antd";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Role } from "../../api/type/auth";
import logo from "../../asset/logo.png";
import { getAccountAction } from "../../redux/action/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  authSelectors,
  setAccountAuth,
  setAuthorized,
  setStatusAuth,
  setToken,
} from "../../redux/reducers/auth.reducer";
import {
  profileSelectors,
  setProfile,
} from "../../redux/reducers/profile.reducer";
import { removeAccessToken } from "../../untils/localStorageService";
const Wrapper = styled.div`
  height: 80px;
  padding-left: 25px;
  padding-right: 25px;
  right: 0;
  top: 0;
  left: 0;
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
`;
const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.div`
  width: 6%;
  img {
    width: 100%;
  }
`;
const NavLeft = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  gap: 2%;
  div {
    border-radius: 5px;
    color: #333;
    font-weight: 600;
    letter-spacing: 0.235px;
    margin: 16px 5px;
    padding: 13px 10px;
    cursor: pointer;
    :hover {
      color: #00b14f;
      background-color: #eee;
    }
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 18%;
  span {
    color: #333;
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    :hover {
      color: #00b14f;
    }
  }
  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledButton = styled(Button)`
  border: none;
  margin-bottom: 5px;
`;
const ButtonRight = styled.div`
  border-radius: 5px;
  color: #333;
  font-weight: 600;
  letter-spacing: 0.235px;
  margin: 16px 5px;
  padding: 13px 10px;
  border: 1px solid #00b14f;
  color: #00b14f;
  cursor: pointer;
`;
const Test = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isShowIcon, setIsShowIcon] = useState(false);
  const account = useAppSelector(authSelectors.getAccountSelector);
  const profile = useAppSelector(profileSelectors.getProfileSelector);
  const content = (
    <DropDown>
      <StyledButton icon={<KeyOutlined />}>Đổi mật khẩu</StyledButton>
      <StyledButton
        icon={<LogoutOutlined />}
        onClick={() => {
          dispatch(setAuthorized());
          dispatch(setToken());
          dispatch(setAccountAuth());
          dispatch(setStatusAuth());
          dispatch(setProfile());
          removeAccessToken();
          toast.success("Đăng xuất thành công");
          navigate("/");
        }}
      >
        Đăng xuất
      </StyledButton>
    </DropDown>
  );

  useLayoutEffect(() => {
    dispatch(getAccountAction());
  }, []);

  return (
    <Wrapper>
      <Main>
        <Logo>
          <img src={logo} alt="" />
        </Logo>
        <NavLeft>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            Việc làm
          </div>
          {account?.role === Role.CANDIDATE ? (
            <div
              onClick={() => {
                navigate("/profile");
              }}
            >
              Hồ sơ
            </div>
          ) : null}
          {account?.role === Role.RECRUITER ? (
            <>
              <div
                onClick={() => {
                  navigate("/recruitment/myRecruitment");
                }}
              >
                Bài đăng
              </div>
              <div
                onClick={() => {
                  navigate("/profile/manager");
                }}
              >
                Quản lý hồ sơ
              </div>
            </>
          ) : null}
          {account?.role === Role.ADMIN ? (
            <>
              <div
                onClick={() => {
                  navigate("/account/manager");
                }}
              >
                Quản lý tài khoản
              </div>
              <div
                onClick={() => {
                  navigate("/recruitment/manager");
                }}
              >
                Quản lý bài đăng
              </div>
            </>
          ) : null}
          <div>Liên hệ</div>
          <div>Công cụ</div>
        </NavLeft>
        {account ? (
          <NavRight>
            <MessageOutlined
              style={{ fontSize: "25px", color: "#00b14f", cursor: "pointer" }}
            />
            <BellOutlined
              style={{ fontSize: "25px", color: "#00b14f", cursor: "pointer" }}
            />

            {profile?.imgUrl ? (
              <Avatar size="default" src={profile.imgUrl} />
            ) : (
              <Avatar
                size="default"
                icon={<UserOutlined style={{ fontSize: "20px" }} />}
              />
            )}
            <Popover placement="bottom" content={content} trigger="click">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsShowIcon(!isShowIcon);
                }}
              >
                <span>{account?.userName}</span>
                {isShowIcon ? (
                  <CaretDownOutlined style={{ color: "black" }} />
                ) : (
                  <CaretUpOutlined style={{ color: "black" }} />
                )}
              </div>
            </Popover>
          </NavRight>
        ) : (
          <NavRight>
            <ButtonRight
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </ButtonRight>
            <ButtonRight
              style={{
                backgroundColor: "#00b14f",
                color: "#fff",
                marginRight: "30px",
              }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng kí
            </ButtonRight>
          </NavRight>
        )}
      </Main>
    </Wrapper>
  );
};

export default Test;
