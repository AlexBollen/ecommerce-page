import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import api from "../../../utils/api";

function Items({ currentItems }) {
  const [totalExistences, setTotalExistences] = useState({});

  useEffect(() => {
    const fetchExistences = async () => {
      const existences = {};
      await Promise.all(
        currentItems.map(async (item) => {
          try {
            const response = await api.get(
              `/stocks/existencias/${item.id_producto}`
            );
            existences[item.id_producto] = response.data;
          } catch (error) {
            console.error("Error al obtener existencias totales");
          }
        })
      );
      setTotalExistences(existences);
    };
    if (currentItems) {
      fetchExistences();
    }
  }, [currentItems]);

  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div key={item.id_producto} className="w-full">
            <Product
              _id={item.id_producto}
              img={item.imagen}
              productName={item.nombre_producto}
              price={item.precio_venta}
              color={item.descripcion_producto}
              badge={item.nombre_categoria}
              des={totalExistences[item.id_producto]?.existencias}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProductsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const endOffset = itemOffset + itemsPerPage;
  const pageCount = Math.ceil(productsData.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productsData.length;
    setItemOffset(newOffset);
    setItemStart(newOffset);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={productsData} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Productos del {itemStart === 0 ? 1 : itemStart} al {endOffset} de{" "}
          {productsData.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
