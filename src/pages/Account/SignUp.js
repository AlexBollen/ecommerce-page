import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import api from "../../utils/api";

const SignUp = () => {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nit, setNit] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [checked, setChecked] = useState(false);
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errNit, setErrNit] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errCity, setErrCity] = useState("");
  const [errCountry, setErrCountry] = useState("");

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setErrPhone("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  const handleNit = (e) => {
    setNit(e.target.value);
    setErrNit("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setErrAddress("");
  };
  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
    setErrCountry("");
  };

  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (checked) {
      if (!clientName) {
        setErrClientName("Ingresa tu nombre");
      }
      if (!email) {
        setErrEmail("Ingresa tu correo");
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Ingresa un correo electrónico válido");
        }
      }
      if (!phone) {
        setErrPhone("Ingresa tu número de teléfono");
      }
      if (!password) {
        setErrPassword("Ingresa una contraseña");
      } else {
        if (password.length < 6) {
          setErrPassword("La contraseña debe tener 6 caracteres");
        }
      }
      if (!address) {
        setErrAddress("Ingresa tu dirección");
      }
      if (!city) {
        setErrCity("Ingresa tu municipio");
      }
      if (!country) {
        setErrCountry("Ingresa tu departamento");
      }
      if (!nit) {
        setErrNit("Ingresa tu NIT");
      }
      const customerData = {
        nombre_cliente: clientName,
        correo_cliente: email,
        password_cliente: password,
        telefono_cliente: phone,
        nit_cliente: nit,
        direccion_cliente: address,
        municipio_cliente: city,
        departamento_cliente: country,
      };
      if (
        clientName &&
        email &&
        EmailValidation(email) &&
        password &&
        password.length >= 6 &&
        phone &&
        nit &&
        address &&
        city &&
        country
      ) {
        api
        .post("/customers", customerData)
        .then((response) => {
          localStorage.setItem("customer", JSON.stringify(response.data));
          window.location.href = '/'
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Registrate gratis!!
            </h1>
            <p className="text-base">Crea tu cuenta para más beneficios</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Registra tu correo
              </span>
              <br />
              Registrate con tu correo electrónico para recibir todas nuestras
              ofertas lo más pronto posible.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        <form className="w-full lgl:w-[500px]  flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[100%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
              Registrate
            </h1>
            <div className="flex flex-col gap-3">
              {/* client name */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Nombre
                </p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="ej. María Rojas"
                />
                {errClientName && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errClientName}
                  </p>
                )}
              </div>
              {/* Email */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Correo electrónico
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="email"
                  placeholder="ej. example@mail.com"
                />
                {errEmail && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errEmail}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Contraseña
                </p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="******"
                />
                {errPassword && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errPassword}
                  </p>
                )}
              </div>
              {/* Phone Number */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Teléfono
                </p>
                <input
                  onChange={handlePhone}
                  value={phone}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="ej. 12345678"
                />
                {errPhone && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errPhone}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Nit
                </p>
                <input
                  onChange={handleNit}
                  value={nit}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="ej. 123456789"
                />
                {errNit && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errNit}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Dirección
                </p>
                <input
                  onChange={handleAddress}
                  value={address}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="ej. 3ra av. 6ta calle 01-01 zona 10"
                />
                {errAddress && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errAddress}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Municipio
                </p>
                <input
                  onChange={handleCity}
                  value={city}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="ej. Quetzaltenango"
                />
                {errCity && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errCity}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Departamento
                </p>
                <input
                  onChange={handleCountry}
                  value={country}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="text"
                  placeholder="ej. Quetzaltenango"
                />
                {errCountry && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errCountry}
                  </p>
                )}
              </div>
              <div className="flex items-start mdl:items-center gap-2">
                <input
                  onChange={() => setChecked(!checked)}
                  className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                  type="checkbox"
                />
                <p className="text-sm text-primeColor">
                  Estoy de acuerdo con los{" "}
                  <span className="text-blue-500">Términos y Condiciones</span>{" "} de OREBI{" "}
                </p>
              </div>
              <button
                onClick={handleSignUp}
                className={`${
                  checked
                    ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                    : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
              >
                Registrarme
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                ¿Ya tienes una cuenta?{" "}
                <Link to="/signin">
                  <span className="hover:text-blue-600 duration-300">
                    Sign in
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
