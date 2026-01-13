import React from "react";
import Card from "../components/Card";
import DashboardLayout from "../Root/DashboardLayout";

const FirstPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </DashboardLayout>
  );
};

export default FirstPage;
