import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import { Add, Delete, Remove } from "@material-ui/icons";
import { LoadingButton } from "@material-ui/lab";

import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import BasketSummary from "./BasketSummary";
import { removeBasketItemAsync, addBasketItemAsync } from '../../features/basket/basketSlice';



export default function BasketPage() {

    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch()




    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">SubTotal</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {basket.items.map((item) => (
                            <TableRow
                                key={item.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Box display='flex' alignItems='center'>
                                        <img src={item.pictureUrl} alt={item.nameOfProduct} style={{ height: 50, marginRight: 20 }} />
                                        <span>{item.nameOfProduct}</span>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                                <TableCell align="center">
                                    <LoadingButton
                                        color='error'
                                        loading={status.includes('pendingRemoveItem' + item.productId)}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1 }))}>
                                        <Remove />
                                    </LoadingButton>
                                    {item.quantity}
                                    <LoadingButton
                                        color='secondary'
                                        loading={status.includes('pendingAddItem' + item.productId)}
                                        onClick={() => dispatch(addBasketItemAsync({ productId: item.productId, quantity: 1 }))}>
                                        <Add />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">{currencyFormat((item.price * item.quantity))}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        color='primary'
                                        loading={status.includes('pendingRemoveItem' + item.productId)}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity }))}>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary />
                    <Button
                        fullWidth
                        size='large'
                        variant='contained'
                        component={Link}
                        to='/checkout'
                    >
                        Checkout
                    </Button>
                </Grid>

            </Grid>
        </>
    )
}