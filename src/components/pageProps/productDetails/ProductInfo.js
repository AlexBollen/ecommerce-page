import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import ProductExistences from "./ProductExistences";
import api from "../../../utils/api";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      <p className="text-xl font-semibold">Q{productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.color}</p>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo._id,
              name: productInfo.productName,
              quantity: 1,
              image: productInfo.img,
              badge: productInfo.badge,
              price: productInfo.price,
              colors: productInfo.color,
            })
          )
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Agregar al carrito
      </button>
      <ProductExistences productId={productInfo._id} />
    </div>
  );
};

export default ProductInfo;
