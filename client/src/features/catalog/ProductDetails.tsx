import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {

    const { status } = useAppSelector(state => state.basket)
    const { id } = useParams<{ id: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, id))
    const { status: productStatus } = useAppSelector(state => state.catalog)
    const [buttonLoading, setButtonLoading] = useState(false)



    const dispatch = useAppDispatch()

    function handleAddItem(productId: number) {
        setButtonLoading(true);

        dispatch(addBasketItemAsync({ productId, quantity: 1 }))
    }

    useEffect(() => {
        if (!product) dispatch(fetchProductAsync(parseInt(id)))
    }, [id, dispatch, product])

    if (productStatus.includes('pending')) return <LoadingComponent message="Loading Product..." />

    if (!product) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h4'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>In Stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <LoadingButton
                    loading={status.includes('pending')}
                    variant='contained'
                    size='small'
                    sx={{ marginTop: 5 }}
                    onClick={() => handleAddItem(parseInt(id))}>
                    Add to Cart
                </LoadingButton>
            </Grid>
        </Grid>
    )
}