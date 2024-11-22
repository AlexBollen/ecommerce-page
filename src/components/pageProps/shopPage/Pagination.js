import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import api from "../../../utils/api";

function Items({ currentItems }) {
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
              des={item.existences}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ itemsPerPage }) => {
  const [productsData, setProductsData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const lsAgency = JSON.parse(localStorage.getItem("sucursal"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = process.env.REACT_APP_API_URL;

        const response = await api.get("/products/productos_paginados", {
          params: { page: currentPage, limit: itemsPerPage },
        });

        const { data, totalPages, total } = response.data;

        const updatedProductsPromises = data.map((product) =>
          api
            .get(`/stocks/existencias_sucursal`, {
              params: {
                id_producto: product.id_producto,
                id_sucursal: lsAgency.id_sucursal,
              },
            })
            .then((existenceResponse) => ({
              ...product,
              imagen: `${url}/${product.imagen}`,
              existences: existenceResponse?.data ?? 0,
            }))
            .catch((error) => {
              console.error(
                `Error obteniendo existencias de producto ${product.id_producto}`,
                error
              );
              return { ...product, existences: 0, quantity: 1 };
            })
        );

        const updatedProducts = await Promise.all(updatedProductsPromises);

        setProductsData(updatedProducts);
        setTotalPages(totalPages);
        setTotalProducts(total);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage]);

  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const endOffset = itemOffset + itemsPerPage;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalProducts;
    setItemOffset(newOffset);
    setItemStart(newOffset);
    setCurrentPage(event.selected + 1);
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
          pageCount={totalPages}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Productos del {itemStart === 0 ? 1 : itemStart} al {endOffset} de{" "}
          {totalProducts}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
