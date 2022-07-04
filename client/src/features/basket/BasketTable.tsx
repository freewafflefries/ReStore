import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@material-ui/core";
import { Remove, Add, Delete } from "@material-ui/icons";
import { LoadingButton } from "@material-ui/lab";
import { BasketItem } from "../../app/models/baskets";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { productSelectors } from "../catalog/catalogSlice";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";

interface Props {
    items: BasketItem[] | undefined;
    isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {

    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch()

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">SubTotal</TableCell>
                        {isBasket && <><TableCell align="right"></TableCell></>}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {items?.map((item) => (
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
                                {isBasket && <><LoadingButton
                                    color='error'
                                    loading={status.includes('pendingRemoveItem' + item.productId + '*')}
                                    onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1 }))}>
                                    <Remove />
                                </LoadingButton> </>}
                                {item.quantity}
                                {isBasket && <><LoadingButton
                                    color='secondary'
                                    loading={status.includes('pendingAddItem' + item.productId + '*')}
                                    onClick={() => dispatch(addBasketItemAsync({ productId: item.productId, quantity: 1 }))}>
                                    <Add />
                                </LoadingButton> </>}
                            </TableCell>
                            <TableCell align="right">{currencyFormat((item.price * item.quantity))}</TableCell>
                            {isBasket && <TableCell align="right">
                                <LoadingButton
                                    color='primary'
                                    loading={false}
                                    onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity }))}>
                                    <Delete />
                                </LoadingButton>
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}