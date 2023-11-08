import React, { useState, useMemo } from "react";
import { Button, Flex, Input, notification } from "antd";
import { http } from "../../../../api/state/http";
import { APP_DOMAIN } from "../../../../config";
import storageService from "../../../../api/util/storageServicve";
import { ICompany, ISearchParams } from "../company-list";

const { Search } = Input;

export interface SearchBarProps {
  searchParams: Object;
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchParams>>;
  setCompanyList: React.Dispatch<React.SetStateAction<ICompany[] | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  setAdvanceSearch: React.Dispatch<React.SetStateAction<boolean>>;
  advanceSearch: boolean;
}

const SearchBar = (props: SearchBarProps) => {
  const [search, setSearch] = React.useState<string>("");
  
  const handleSearch = async (search: string) => {
    props.setIsLoading(true);
    try {
      const res = await http.post(`${APP_DOMAIN}/api/company/query/list`, {
        q: search,
      });
      // @ts-ignore
      props.setCompanyList(res.list);
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Error",
        // @ts-ignore
        description: error,
      });
      props.setError(error);
    }
    props.setIsLoading(false);
  };

  return (
    <div
      style={{
        width: "50%",
        marginBottom: "40px",
        marginLeft: "20px",
      }}>
      <Flex vertical={false} gap={25}>
        {!props.advanceSearch && (
          <Search
            placeholder="Search company name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            enterButton="Search"
            size="large"
            onSearch={(value) => {
              handleSearch(value);
            }}
            loading={props.isLoading}
          />
        )}
        <Button
          size="large"
          onClick={() => {
            props.setAdvanceSearch(!props.advanceSearch);
          }}>
          {props.advanceSearch ? "Simple Search" : "Advance Search"}
        </Button>
      </Flex>
    </div>
  );
};
export default SearchBar;
