import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import ExistencesCard from "./ExistencesCard";

const ProductExistences = ({ productId }) => {
  const [existencesData, setExistencesData] = useState([]);

  useEffect(() => {
    if (productId !== undefined) {
      api
        .get(`/stocks/producto/${parseInt(productId)}`)
        .then((response) => {
          setExistencesData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [productId]);

  return (
    <>
      <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
        <h2 className="col-span-3">Sucursal</h2>
        <h2>Existencias</h2>
      </div>
      <div className="mt-1">
        {existencesData.map((item) => (
          <div key={item.sucursal}>
            <ExistencesCard item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductExistences;
