import React from "react";
import styled from "styled-components";
import {
  dataAddress,
  dataRank,
  dataSalary,
  dataType,
  dataWorkExperience,
  dataWorkingForm,
} from "../../config/data";
import { DataFilterRecruitment } from "../recruitment/MyRecruitment";

const StyledFilter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
`;

const Search = styled.div`
  width: 28%;
  padding-left: 0;
  input {
    border: 1px solid #eee;
    border-radius: 5px;
    background: #fff;
    box-shadow: none;
    color: #333;
    font-size: 14px;
    font-weight: 400;
    height: 45px;
    line-height: 24px;
    padding: 11px 0 11px 20px;
    display: block;
    width: 100%;
    font-family: inherit;
    margin: 0;
  }
`;
const StyledSelect = styled.select`
  border: 1px solid #eee;
  border-radius: 5px;
  background: #fff;
  box-shadow: none;
  color: #333;
  font-size: 14px;
  font-weight: 400;
  height: 45px;
  line-height: 24px;
  padding: 11px 0 11px 20px;
  display: block;
  font-family: inherit;
  margin: 0;
  width: 22%;
`;

interface props {
  dataFilter: DataFilterRecruitment;
  setDataFilter: React.Dispatch<React.SetStateAction<DataFilterRecruitment>>;
}
const Filter: React.FC<props> = ({ dataFilter, setDataFilter }) => {
  return (
    <>
      <StyledFilter>
        <Search>
          <input
            onChange={(e) => {
              setDataFilter({
                ...dataFilter,
                name: { nameString: e.target.value },
              });
            }}
            placeholder="Tên công việc, vị trí bạn muốn ứng tuyển ..."
          />
        </Search>
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              address: { index: +e.target.value },
            });
          }}
        >
          <option value={-1}>Tất cả địa điểm</option>
          {/* -1 is value null */}
          {dataAddress.map((address, index) => (
            <option value={address.address} key={index}>
              {address.name}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              type: { index: +e.target.value },
            });
          }}
        >
          <option value={-1}>Ngành nghề</option>
          {/* -1 is value null */}
          {dataType.map((type, index) => (
            <option value={type.type} key={index}>
              {type.name}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              salary: { index: +e.target.value },
            });
          }}
        >
          <option value={-1}>Mức lương</option>
          {/* -1 is value null */}
          {dataSalary.map((salary, index) => (
            <option value={salary.salary} key={index}>
              {salary.name}
            </option>
          ))}
        </StyledSelect>
      </StyledFilter>
      <StyledFilter
        style={{ paddingTop: " 10px", justifyContent: "space-around" }}
      >
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              rank: { index: +e.target.value },
            });
          }}
        >
          <option value={-1}>Cấp bậc</option>
          {/* -1 is value null */}
          {dataRank.map((rank, index) => (
            <option value={rank.rank} key={index}>
              {rank.name}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              workingForm: { index: +e.target.value },
            });
          }}
        >
          <option value={-1}>Hình thức làm việc</option>
          {/* -1 is value null */}
          {dataWorkingForm.map((item, index) => (
            <option value={item.typeWork} key={index}>
              {item.name}
            </option>
          ))}
        </StyledSelect>
        <StyledSelect
          onChange={(e) => {
            setDataFilter({
              ...dataFilter,
              workExperience: { index: +e.target.value },
            });
          }}
        >
          <option value={-1}>Kinh nghiệm</option>
          {/* -1 is value null */}
          {dataWorkExperience.map((item, index) => (
            <option value={item.experience} key={index}>
              {item.name}
            </option>
          ))}
        </StyledSelect>
      </StyledFilter>
    </>
  );
};

export default Filter;
