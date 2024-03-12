import React from "react";
import { Table } from "antd";

const Search = ({ demo }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "rno",
      key: "rno",
    },
    {
      title: "NAME",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "SCHOOL",

      dataIndex: "school",
      key: "school",
    },
    {
      title: "COURSE",

      dataIndex: "course",
      key: "course",
    },
  ];

  return <Table columns={columns} dataSource={demo} />;
};
export default Search;
