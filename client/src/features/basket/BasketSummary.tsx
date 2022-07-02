import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@material-ui/core";


import { useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";

interface Props {
    providedSubtotal?: number
}

export default function BasketSummary({ providedSubtotal }: Props) {

    const { basket } = useAppSelector(state => state.basket)

    function calculateSubtotal() {
        if (!basket) return 0
        if (providedSubtotal === undefined) {
            const calculatedSubtotal = basket?.items.reduce((sum, item) => {
                return sum + (item.price * item.quantity)
            }, 0)

            return calculatedSubtotal
        }
        return providedSubtotal

    }

    function calculateDeliveryFee(sub: number) {
        if (sub / 100 >= 100.00) {
            return 0
        } else {
            return 500
        }
    }

    const subtotal = calculateSubtotal()
    const deliveryFee = calculateDeliveryFee(subtotal)

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
                                <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}