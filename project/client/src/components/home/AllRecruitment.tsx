import {
  DoubleRightOutlined,
  HeartOutlined,
  StarOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Recruitment } from "../../api/type/recruitment";
import { checkAddress, checkSalary } from "../../config/data";
import { filterRecruitment } from "../../config/filterRecruitment";
import { useAppSelector } from "../../redux/hooks";
import { authSelectors } from "../../redux/reducers/auth.reducer";
import { DataFilterRecruitment } from "../recruitment/MyRecruitment";

const Wrapper = styled.div`
  padding: 20px 50px;
  background-color: #f0f0f0;
`;
const Header = styled.div`
  border-radius: 3px 3px 0 0;
  color: #212f3f;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding: 18px 16px 11px;
  h2 {
    font-weight: 700;
    margin-bottom: 0;
    margin-right: auto;
    margin-top: 0;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    font-size: 20px;
    margin: 10px 0;
    line-height: 1.1;
    color: inherit;
    font-family: inherit;
  }
  span {
    right: 10px;
    top: 17px;
    float: right !important;
    color: #00b14f;
  }
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  background-color: #fff;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 7px;
  box-shadow: 2px 2px 12px #212f3f1a;
  margin: 6px 0;
  padding: 12px 12px 10px;
`;
const HeaderBox = styled.div`
  display: flex;
`;
const Logo = styled.div`
  align-items: center;
  border: 0.25px solid #f7f7f7;
  border-radius: 7px;
  display: flex;
  height: 44px;
  overflow: hidden;
  width: 44px;
  cursor: pointer;
  img {
    height: fit-content;
    max-width: 100%;
    object-fit: contain;
    width: 44px;
  }
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 44px;
  overflow: hidden !important;
  padding-left: 12px;
  padding-right: 39px;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  flex-grow: 1;
  cursor: pointer;
  strong {
    font-weight: bold;
    color: #212f3f;
  }
  div {
    margin-bottom: 3px;
    display: block;
    width: 100%;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    color: #666;
    background-color: transparent;
    text-decoration: none;
  }
`;
const Like = styled.div`
  button {
    background: #fff 0 0 no-repeat padding-box;
    border: 0.5px solid #d4d7da;
    border-radius: 5px;
    height: 24px;
    width: 24px;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    cursor: pointer;
    text-transform: none;
    overflow: visible;
    margin: 0;
    font: inherit;
    color: inherit;
  }
`;
const Salary = styled.div`
  border-radius: 5px;
  box-sizing: border-box;
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.6px;
  line-height: 16px;
  padding: 2px 9px;
  background: #efefef;
  color: #212f3f;
  opacity: 0.8;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
`;
const Address = styled.div`
  background: #efefef;
  border-radius: 5px;
  box-sizing: border-box;
  color: #212f3f;
  display: inline-block;
  font-size: 12px;
  letter-spacing: 0.6px;
  line-height: 16px;
  opacity: 0.8;
  padding: 2px 9px;
  max-width: 43%;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  margin-left: 5px;
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding: 20px 0;
  button {
    color: #fff;
    background: #00b14f 0 0 no-repeat padding-box;
    border: #00b14f;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 400;
    height: 40px;
    padding: 10px 20px;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    display: inline-block;
    margin-bottom: 0;
  }
`;
interface props {
  data: Recruitment[] | null;
  dataFilter: DataFilterRecruitment;
}
const AllRecruitment: React.FC<props> = ({ data, dataFilter }) => {
  const [count, setCount] = useState(9);
  const navigate = useNavigate();
  const account = useAppSelector(authSelectors.getAccountSelector);

  return (
    <Wrapper>
      <Header>
        <div style={{ display: "flex", alignItems: "center" }}>
          <StarOutlined style={{ color: "#00b14f" }} />
          <h2>TIN TUYỂN DỤNG, VIỆC LÀM TỐT NHẤT</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <DoubleRightOutlined style={{ color: "#00b14f" }} />
          <span> Xem tất cả</span>
        </div>
      </Header>
      <Main>
        {filterRecruitment(data)(dataFilter.address.index)(
          dataFilter.type.index
        )(dataFilter.rank.index)(dataFilter.salary.index)(
          dataFilter.workingForm.index
        )(dataFilter.workExperience.index)(dataFilter.name.nameString)
          ?.slice(0, count)
          .map((item, index) => {
            return (
              <div style={{ padding: "0 8px" }} key={index}>
                <Box>
                  <HeaderBox>
                    <Logo
                      onClick={() => {
                        if (account === null) {
                          navigate("/login");
                        } else {
                          navigate(`recruitment/detail/${item._id}`);
                        }
                      }}
                    >
                      <img src={item.imgUrl} alt="" />
                    </Logo>
                    <Title>
                      <div
                        onClick={() => {
                          if (account === null) {
                            navigate("/login");
                          } else {
                            navigate(`recruitment/detail/${item._id}`);
                          }
                        }}
                      >
                        <strong>{item.title}</strong>
                      </div>
                      <div
                        onClick={() => {
                          if (account === null) {
                            navigate("/login");
                          } else {
                            navigate(`recruitment/detail/${item._id}`);
                          }
                        }}
                      >
                        {item.contact}
                      </div>
                    </Title>
                    <Like>
                      <button>
                        <HeartOutlined style={{ color: "#00b14f" }} />
                      </button>
                    </Like>
                  </HeaderBox>
                  <div style={{ height: "20px", marginTop: "8px" }}>
                    <Salary>{checkSalary(item.salary)}</Salary>
                    <Address>{checkAddress(item.address)}</Address>
                  </div>
                </Box>
              </div>
            );
          })}
      </Main>
      <Footer>
        <button
          onClick={() => {
            setCount(count + 6);
          }}
        >
          Tải thêm
        </button>
      </Footer>
    </Wrapper>
  );
};

export default AllRecruitment;
