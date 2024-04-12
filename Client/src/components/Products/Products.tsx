import { useState, useEffect } from "react";
import { getProducts } from "../../utilis/actions/productActions.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import classes from "./Products.module.scss";
import ProductInterface from "../../utilis/interface/Product.interface";
import Product from "./Product/Product";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import NewProduct from "./Product/NewProduct";

const Products = () => {
  const [products, setProducts] = useState<ProductInterface[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [newProduct, setNewProduct] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);

  const getData = async (page: number) => {
    const data = await getProducts(user.token, page);
    if (data) {
      setNewProduct(false);
      setProducts(data.results);
      setHasNextPage(data.next != null);
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={classes.__products}>
      <div className={classes.__newProduct}>
        {" "}
        <button
          onClick={() => {
            setNewProduct((prev) => !prev);
          }}
        >
          {newProduct ? "Cancel" : "Add New Product"}
        </button>
        {newProduct && <NewProduct getData={() => getData(currentPage)} />}
      </div>{" "}
      <Grid sx={{ flexGrow: 1 }} container justifyContent="center">
        <Grid item xs={10} sx={{ margin: "auto" }}>
          <Grid container justifyContent="center" spacing={2}>
            {products &&
              products.map((product) => (
                <Grid key={product.id} item>
                  <Product
                    ProductInfo={product}
                    getData={() => getData(currentPage)}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.__togglePages}>
        {" "}
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>{currentPage}</span>
        <Button onClick={handleNext} disabled={!hasNextPage}>
          Next
        </Button>{" "}
      </div>
    </div>
  );
};

export default Products;
