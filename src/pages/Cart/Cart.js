import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { resetCart } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import api from "../../utils/api";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import approval from "../../assets/svg/approval.svg";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.orebiReducer.products);
  const [totalAmt, setTotalAmt] = useState("");
  const [shippingCharge, setShippingCharge] = useState("");
  const [customer, setCustomer] = useState(null);
  const [agency, setAgency] = useState(null);
  const [successMode, setSuccessMode] = useState(false);

  useEffect(() => {
    let price = 0;
    products.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [products]);

  useEffect(() => {
    if (totalAmt <= 200) {
      setShippingCharge(30);
    } else if (totalAmt <= 400) {
      setShippingCharge(25);
    } else if (totalAmt > 401) {
      setShippingCharge(20);
    }
  }, [totalAmt]);

  useEffect(() => {
    const lsCustomer = localStorage.getItem("customer");
    if (lsCustomer != null) {
      setCustomer(JSON.parse(lsCustomer));
    }
    const lsAgency = localStorage.getItem("sucursal");
    if (lsAgency != null) {
      setAgency(JSON.parse(lsAgency));
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const data = {
        monto_total: totalAmt + shippingCharge,
        cliente: customer.id_cliente,
        sucursalId: agency.id_sucursal,
        usuario: 1,
        lista_productos: products.map((product) => [
          product._id,
          product.quantity,
        ]),
        tipo_transaccion: "V",
        tipo: true
      };
      const response = await api.post("/quotes", data);
      if (response.status === 201) {
        setSuccessMode(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEndSale = () => {
    dispatch(resetCart());
    setSuccessMode(false);
    navigate("/shop");
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Carrito" />
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Producto</h2>
            <h2>Precio</h2>
            <h2>Cantidad</h2>
            <h2>Sub Total</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Limpiar carrito
          </button>

          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Coupon Number"
              />
              <p className="text-sm mdl:text-base font-semibold">
                Apply Coupon
              </p>
            </div>
            <p className="text-lg font-semibold">Update Cart</p>
          </div>
          <div className="flex flex-col mdl:flex-row justify-between py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="w-96 flex flex-col gap-4 align-left">
              <h1 className="text-2xl font-semibold text-left">
                Datos entrega
              </h1>

              {customer != null ? (
                <div>
                  <p className="flex items-center justify-between text-lg px- font-medium">
                    Entrega a: {customer.nombre_cliente}
                  </p>
                  <p className="flex items-center justify-between text-lg px- font-medium">
                    Dirección: {customer.direccion_cliente}
                  </p>
                  <p className="flex items-center justify-between text-lg px- font-medium">
                    Municipio: {customer.municipio_cliente}
                  </p>
                  <p className="flex items-center justify-between text-lg px- font-medium">
                    Departamento: {customer.departamento_cliente}
                  </p>
                </div>
              ) : (
                <>
                  <h1 className="text-1xl font-semibold text-left">
                    Debes iniciar sesión o registrarte!
                  </h1>
                </>
              )}
            </div>
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">
                Total carrito
              </h1>
              <h4 className="text-l font-semibolg text-right">
                *Pago contra entrega
              </h4>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Subtotal
                  <span className="font-semibold tracking-wide font-titleFont">
                    Q{totalAmt}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Comisión Ing. Arturo
                  <span className="font-semibold tracking-wide font-titleFont">
                    Q{shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Total
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    Q{totalAmt + shippingCharge}
                  </span>
                </p>
              </div>
              {customer == null && (
                <h4 className="text-l font-semibolg text-right">
                  Registrate!!
                </h4>
              )}
              <div className="flex justify-end">
                <button
                  className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300"
                  onClick={handleSubmit}
                  disabled={customer == null}
                >
                  Realizar compra
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Tu carrito se siente solito.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Tu carrito de compra vive para servir. Dale propósito - llenalo
              con computadoras, accesorios, cámaras... y hazlo muy muy feliz :)
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continuar comprando
              </button>
            </Link>
          </div>
        </motion.div>
      )}
      <Dialog
        open={successMode}
        onClose={handleEndSale}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          sx={{
            fontSize: "28px",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={approval} height="100" width="100" />
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" className="align-center">
            ¡Compra realizada con éxito!
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "flex-end", mt: 3, alignItems: "right" }}
          >
            <Button variant="contained" color="primary" onClick={handleEndSale}>
              Gracias
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
