/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { getAllRecuitmentAction } from "../../redux/action/recruitment";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { recruitmentSelectors } from "../../redux/reducers/recruitment.reducer";

import Loading from "../loading/Loading";
import Filter from "./FilterData";
import StyleCarousel from "./Carousel";
import AllRecruitment from "./AllRecruitment";

const Wrapper = styled.main`
  min-height: calc(100vh-70px);
  padding: 50px 0;
  position: relative;
  overflow-x: hidden;
  background-color: #f0f0f0;
  &:before {
    background: center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
`;
interface DataFilterRecruitment {
  address: {
    index: number;
  };
  type: {
    index: number;
  };
  workingForm: {
    index: number;
  };
  salary: {
    index: number;
  };
  rank: {
    index: number;
  };
  workExperience: {
    index: number;
  };
  name: {
    nameString: string;
  };
}
const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding: 0 50px;
  background-color: #f0f0f0;
  h1 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 0;
    margin-top: 20px;
    line-height: 1.1;
    color: inherit;
    font-family: inherit;
    margin: 0.67em 0;
    padding-top: 10px;
  }
  p {
    color: #4a4a4a;
    margin-bottom: 0 !important;
    margin-top: 4px;
    margin: 0 0 10px;
  }
`;
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const [dataFilter, setDataFilter] = useState<DataFilterRecruitment>({
    address: { index: -1 },
    type: { index: -1 },
    salary: { index: -1 },
    rank: { index: -1 },
    workingForm: { index: -1 },
    workExperience: { index: -1 },
    name: { nameString: "" },
  });
  const data = useAppSelector(recruitmentSelectors.getRecruitmentsSelector);
  const loading = useAppSelector(recruitmentSelectors.isLoadingSelector);

  useLayoutEffect(() => {
    dispatch(getAllRecuitmentAction());
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Filter dataFilter={dataFilter} setDataFilter={setDataFilter} />
      <Container>
        <h1>Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc</h1>
        <p>
          Tiếp cận 30,000+ tin tuyển dụng việc làm mới mỗi ngày từ hàng nghìn
          doanh nghiệp uy tín tại Việt Nam
        </p>
      </Container>
      <StyleCarousel />
      <AllRecruitment data={data} dataFilter={dataFilter} />
    </Wrapper>
  );
};

export default Home;
