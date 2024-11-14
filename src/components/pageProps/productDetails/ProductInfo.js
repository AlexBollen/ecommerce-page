import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import ProductExistences from "./ProductExistences";
import api from "../../../utils/api";

const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [closestAgency, setClosestAgency] = useState("");
  const [errorMsg, setErrorMsg] = useState(null)

  function handleLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
      });
    } else {
      console.log("Geolocalización no disponible");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
  }

  function error() {
    setErrorMsg("Fallo al obtener tu ubicación");
    console.log("Fallo al obtener tu ubicación");
  }

  useEffect(() => {
    handleLocation();
  }, []);

  useEffect(() => {
    if (location !== null) {
      api
        .get("/agencies/sucursalCercana", {
          params: { latitud: location.latitude, longitud: location.longitude },
        })
        .then((response) => {
          setClosestAgency(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location]);

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
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Más cercano:</span>{" "}
        {errorMsg !== null ? errorMsg :
        <>{closestAgency.nombre_sucursal} - {closestAgency.direccion_detallada}</>}
      </p>
      <ProductExistences productId={productInfo._id} />
    </div>
  );
};

export default ProductInfo;
