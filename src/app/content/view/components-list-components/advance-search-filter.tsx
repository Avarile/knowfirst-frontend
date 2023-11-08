import React, { useState } from "react";
import type { CascaderProps } from "antd";
import { AutoComplete, Button, Cascader, Checkbox, Col, Flex, Form, Input, InputNumber, Row, Select, notification } from "antd";
import { log } from "console";
import { ICompany, ISearchParams } from "../company-list";
import { http } from "../../../../api/state/http";
import { APP_DOMAIN } from "../../../../config";

const { Option } = Select;

const stateOptions = [
  {
    id: "0",
    value: "all",
    label: "National",
  },
  {
    id: "1",
    value: "NSW",
    label: "New South Wales",
  },
  {
    id: "2",
    value: "VIC",
    label: "Victoria",
  },
  {
    id: "3",
    value: "QLD",
    label: "Queensland",
  },
  {
    id: "4",
    value: "ACT",
    label: "Australian Capital Territory",
  },
  {
    id: "5",
    value: "SA",
    label: "South Australia",
  },
  {
    id: "6",
    value: "WA",
    label: "Western Australia",
  },
  {
    id: "7",
    value: "TAS",
    label: "Tasmania",
  },
  {
    id: "8",
    value: "NT",
    label: "Northern Territory",
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export interface SearchProps {
  searchParams: Object;
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchParams>>;
  setCompanyList: React.Dispatch<React.SetStateAction<ICompany[] | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<any>>;
  setAdvanceSearch: React.Dispatch<React.SetStateAction<boolean>>;
  advanceSearch: boolean;
}

const AdvanceSearch = (props: SearchProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    if (values.state === "all") {
      values.state = undefined;
    }
    if (values.postcode === null) {
      values.postcode = undefined;
    }

    console.log("Received values of form: ", values);
    // for (const [key, value] of Object.entries(values)) {
    //   console.log(`${key}: ${value}`);
    // }

    handleSearch(values);
  };

  const handleSearch = async (searchParams: {
    q: string | undefined;
    postcode: number | undefined;
    state: string | undefined;
    sector: string | undefined;
    type: string | undefined;
    tag: string | undefined;
  }) => {
    props.setIsLoading(true);
    try {
      const res = await http.post(`${APP_DOMAIN}/api/company/query/list`, {
        q: searchParams.q,
        postcode: searchParams.postcode,
        state: searchParams.state,
        sector: searchParams.sector,
        type: searchParams.type,
        tag: searchParams.tag,
      });

      console.log(res);

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
    <Form
      {...formItemLayout}
      form={form}
      name="filter"
      onFinish={onFinish}
      initialValues={{
        state: "all",
      }}
      style={{ maxWidth: "100%" }}
      scrollToFirstError>
      <Flex vertical={false} gap={25}>
        <Form.Item
          name="q"
          label="keyword"
          rules={[
            {
              type: "string",
              message: "The input is not valid keyword!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="postcode"
          label="postcode"
          rules={[
            {
              type: "number",
              message: "The input must be number!",
            },
          ]}>
          <InputNumber />
        </Form.Item>

        <Form.Item name="state" label="State">
          <Select
            // mode="multiple"
            allowClear
            placeholder="select the State"
            style={{
              width: 500,
            }}>
            {stateOptions.map((state) => {
              return <Option value={state.value}>{state.label}</Option>;
            })}
          </Select>
        </Form.Item>
      </Flex>

      <Flex vertical={false} gap={25}>
        <Form.Item
          name="sector"
          label="Sector"
          rules={[
            {
              type: "string",
              message: "The input is not valid sector!",
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="tag"
          label="Tags"
          rules={[
            {
              type: "string",
              message: "The input is not valid!",
            },
          ]}>
          <Input />
        </Form.Item>
      </Flex>

      <Button htmlType="submit" type="primary">
        Search
      </Button>
    </Form>
  );
};

export default AdvanceSearch;
