import React from "react";
import Meta from "@/components/Meta";
import ButtonCreate from "@/components/ButtonCreate";
import ButtonDelete from "@/components/ButtonDelete";
import TableViewItem from "@/components/TableViewItem";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";

const index = () => {
  return (
    <>
      <Meta title={"View announcement"} />
      <div className="bg-slate-50 h-full pt-6"></div>
    </>
  );
};

export default index;
