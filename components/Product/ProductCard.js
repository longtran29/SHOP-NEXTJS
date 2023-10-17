import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import SpinTip from "../loading/SpinTip";

function ProductCard(props) {
  const { productDetails } = props;

  const router = useRouter();

  return (
   <Fragment>


{

  productDetails?  <div className="col-xl-3 col-sm-6 col-lg-4">
  <div className="wsus__product_item">
    <span className="wsus__new">New</span>
    <span className="wsus__minus">- ${productDetails.discount_percent} %</span>
    <a className="wsus__pro_link" href="product_details.html">
      <img src={productDetails.primaryImage} alt="product" className="img-fluid w-100 img_1" />
      <img src={productDetails.primaryImage} alt="product" className="img-fluid w-100 img_2" />
    </a>
    <ul className="wsus__single_pro_icon">
      <li><a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="far fa-eye" /></a></li>
      <li><a href="#"><i className="far fa-heart" /></a></li>
      <li><a href="#"><i className="far fa-random" /></a>
      </li></ul>
    <div className="wsus__product_details">
      <a className="wsus__category" href="#">fashion </a>
      <p className="wsus__pro_rating">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star-half-alt" />
        <span>(10 review)</span>
      </p>
      <a className="wsus__pro_name" href={`/product/detail/${productDetails.id}`}>  {productDetails.name}</a>
      <p className="wsus__price">${productDetails.original_price}</p>
      <a className="add_cart" href="#">add to cart</a>
    </div>
  </div>
</div>: <SpinTip />
}


   </Fragment>
  );
}

export default ProductCard;
