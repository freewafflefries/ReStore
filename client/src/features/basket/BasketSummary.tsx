import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, Typography } from "@material-ui/core";
import { PreviewTwoTone } from "@material-ui/icons";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

export default function BasketSummary() {
    
    const {basket} = useStoreContext()
    
    function calculateSubtotal() {
        if (!basket) return 0
        const subtotal = basket?.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity)
        },0)

        return subtotal
    }

    function calculateDeliveryFee() {
        if (subtotal/100 >= 100.00) {
            return 0
        } else {
            return 500
        }
    }
    
    const subtotal = calculateSubtotal()
    const deliveryFee = calculateDeliveryFee()

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{fontStyle: 'italic'}}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}