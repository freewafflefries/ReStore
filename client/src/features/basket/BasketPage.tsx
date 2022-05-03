import { Box,  Button,  Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import { Add, Delete, Remove } from "@material-ui/icons";
import { LoadingButton } from "@material-ui/lab";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";
import BasketSummary from "./BasketSummary";



export default function BasketPage() {

    const {basket, setBasket, removeItem} = useStoreContext();
    const [status, setStatus] = useState({
        loading: false,
        name: ''
    })

    function handleAddItem(productId: number, name: string) {
        setStatus({loading: true, name})

        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setStatus({loading: false, name: ''}))
    }

   function handleRemoveItem(productId: number, quantity= 1, name: string) {
       setStatus({loading: true,  name})

       agent.Basket.deleteItem(productId, quantity)
        .then(() => removeItem(productId, quantity))
        .catch(error => console.log(error))
        .finally(() => setStatus({loading: false, name: ''}))
   }


   

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
                                <img src={item.pictureUrl} alt={item.nameOfProduct} style={{height: 50, marginRight: 20}}/>
                                <span>{item.nameOfProduct}</span>
                            </Box>
                        </TableCell>
                        <TableCell align="right">{currencyFormat(item.price)}</TableCell>
                        <TableCell align="center">
                            <LoadingButton 
                                color='error' 
                                loading={status.loading && status.name==='remove' + item.productId} 
                                onClick={() => handleRemoveItem(item.productId, 1, 'remove' + item.productId)}>
                                <Remove />
                            </LoadingButton>
                            {item.quantity}
                            <LoadingButton 
                                color='secondary' 
                                loading={status.loading && status.name==='add' + item.productId} 
                                onClick={() => handleAddItem(item.productId, 'add' + item.productId)}>
                                <Add />
                            </LoadingButton>
                        </TableCell>
                        <TableCell align="right">{currencyFormat((item.price * item.quantity))}</TableCell>
                        <TableCell align="right">
                            <LoadingButton 
                                color='primary' 
                                loading={status.loading && status.name==='delete'+ item.productId} 
                                onClick={() => handleRemoveItem(item.productId, item.quantity, 'delete'+ item.productId)}>
                                <Delete/>
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