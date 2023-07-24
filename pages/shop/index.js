import CustomerLayout from "@/layouts/CustomerLayout";
import React, { Fragment } from "react";
import { Col, Pagination, Row } from "antd";
import FilterSection from "@/components/FilterSection";
import { useFilterContext } from "@/context/FilterContext";
import Product from "@/components/Product/Product";

function Shopping(props) {
  const { filter_products } = useFilterContext();
  const { currentPage, setCurrentPage } = useFilterContext();

  return (
    <Fragment>
      {filter_products && (
        <Row>
          <Col flex="400px" className="pl-4">
            <FilterSection />
          </Col>
          <Col flex="1">
            <div className="grid grid-cols-4 gap-4 h-full">
              <Product data={filter_products} dataLimit={4} />
            </div>
          </Col>
          {filter_products.length > 0 && (
            <div className="w-full flex justify-center mt-10">
              <Pagination
                className="w-1/3"
                onChange={(page, pageSize) => setCurrentPage(page)}
                current={currentPage}
                pageSize={4}
                total={filter_products.length}
              />
            </div>
          )}
        </Row>
      )}
    </Fragment>
  );
}

Shopping.getLayout = (page) => <CustomerLayout>{page}</CustomerLayout>;

export default Shopping;
