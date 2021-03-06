
import { Grid, Paper } from "@material-ui/core";
import { useEffect } from "react";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import AppPagination from "../../app/components/AppPagination";

import LoadingComponent from "../../app/layout/LoadingComponent";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
import useProducts from "../../app/hooks/useProducts";


const sortOptions = [
  { value: 'name', label: 'Alphabetical' },
  { value: 'priceDesc', label: 'Price - High to Low' },
  { value: 'price', label: 'Price - Low to High' }
]



export default function Catalog() {
  const { products, brands, types, filtersLoaded, metaData } = useProducts()
  const { productParams } = useAppSelector(state => state.catalog)
  const dispatch = useAppDispatch()

  if (!filtersLoaded) {
    return (
      <LoadingComponent message="Loading the Catalog" />
    )
  }


  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
            options={sortOptions}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
        {metaData &&
          <AppPagination
            onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
            metaData={metaData}
          />}
      </Grid>
    </Grid>
  )
}