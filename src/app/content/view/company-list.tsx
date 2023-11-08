import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Avatar, List, Space } from "antd";
import SearchBar from "./components-list-components/search-bar";
import useIsMobile from "../../../api/util/useIsMobile";
import { useNavigate } from "react-router-dom";
import storageService from "../../../api/util/storageServicve";
import { isNull } from "lodash-es";
import AdvanceSearch from "./components-list-components/advance-search-filter";

const mockData = [
  {
    id: "9ptrc95sh",
    name: "AARON SANSONI GROUP INTERNATIONAL",
    legal_name: "AARON SANSONI GROUP INTERNATIONAL PTY LTD",
    url: "https://app.knowfirst.ai/business/aaron-sansoni-group-international-9ptrc95sh/profile/overview",
    initials: "ASG",
    logo: {
      med: "https://cdn.knowfirst.ai/image/bf0e1bb6a89ab979390c3f561cc6448d/140x140.png",
      lrg: "https://cdn.knowfirst.ai/image/bf0e1bb6a89ab979390c3f561cc6448d/450x450.png",
    },
    countrycode: "au",
    status: "active",
    description: "Investor, Empire Builder, Philanthropist & Best-Selling Author",
  },
  {
    id: "kd5wm5jyn",
    name: "AARON SANSONI FOUNDATION",
    legal_name: "AARON SANSONI FOUNDATION LIMITED",
    url: "https://app.knowfirst.ai/business/aaron-sansoni-foundation-kd5wm5jyn/profile/overview",
    initials: "ASF",
    logo: {
      med: "https://cdn.knowfirst.ai/image/f9603b3adf7995b0a92ddeeec9102f55/140x140.png",
      lrg: "https://cdn.knowfirst.ai/image/f9603b3adf7995b0a92ddeeec9102f55/450x450.png",
    },
    countrycode: "au",
    status: "active",
    description:
      "The Aaron Sansoni Foundation was established to create real change where it's needed. We do this by creating global awareness for the charities we partner with, as well as mobilising large volunteer networks to help Give Back.",
  },
  {
    id: "e6z8y3prx",
    name: "SANSONI MANAGEMENT",
    legal_name: "SANSONI MANAGEMENT PTY LTD",
    url: "https://app.knowfirst.ai/business/sansoni-management-e6z8y3prx/profile/overview",
    initials: "SM",
    logo: {
      med: "https://cdn.knowfirst.ai/image/f31e6e26aa1162d6885fd6bfa76d87d4/140x140.png",
      lrg: "https://cdn.knowfirst.ai/image/f31e6e26aa1162d6885fd6bfa76d87d4/450x450.png",
    },
    countrycode: "au",
    status: "active",
    description: "Sansoni Management",
  },
];

export interface ICompany {
  id: string;
  name: string;
  legal_name: string;
  url: string;
  initials: string;
  logo: {
    med: string;
    lrg: string;
  };
  countrycode: string;
  status: string;
  description: string;
}

export interface ISearchParams {
  sector: string | null;
  type: string | null;
  countrycode: string | null;
  state: string | null;
  postcode: string | null;
  suburb: string | null;
  revenue: number | null;
  tags: string | null;
  q: string | null;
}

const CompanyList: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = React.useState<ISearchParams>({
    sector: null,
    type: null,
    countrycode: null,
    state: null,
    postcode: null,
    suburb: null,
    revenue: null,
    tags: null,
    q: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [advanceSearch, setAdvanceSearch] = useState<boolean>(false); // TODO: implement advance search
  const [companyList, setCompanyList] = React.useState<ICompany[] | null>(null);
  const [error, setError] = React.useState<any>(null);

  return (
    <>
      <SearchBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setCompanyList={setCompanyList}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        setError={setError}
        setAdvanceSearch={setAdvanceSearch}
        advanceSearch={advanceSearch}
      />
      {advanceSearch && (
        <AdvanceSearch
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setCompanyList={setCompanyList}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          setError={setError}
          setAdvanceSearch={setAdvanceSearch}
          advanceSearch={advanceSearch}
        />
      )}
      {companyList ? (
        <List
          loading={isLoading}
          itemLayout={isMobile ? "horizontal" : "vertical"}
          size="large"
          pagination={{
            onChange: (page) => {},
            pageSize: 6,
          }}
          dataSource={companyList}
          footer={<div></div>}
          renderItem={(item) => (
            <List.Item
              style={{ cursor: "pointer" }}
              onClick={() => {
                storageService.setItem("CURRENT_COMPANY", item.id);
                navigate(`/companies/${item.id}`);
              }}
              key={item.id}
              // actions={[
              //   <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              //   <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              //   <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              // ]}
              extra={<img width={272} alt="logo" src={item.logo.med} />}>
              <List.Item.Meta avatar={<Avatar src={item.logo.med} />} title={<a href={item.id}>{item.name}</a>} description={item.description} />
              {item.legal_name}
            </List.Item>
          )}
        />
      ) : (
        <div>no data</div>
      )}
    </>
  );
};

export default CompanyList;
