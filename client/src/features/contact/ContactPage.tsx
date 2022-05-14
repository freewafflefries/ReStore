import { Button, ButtonGroup, Typography } from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { increment, decrement, reset } from "./counterSlice";

export default function ContactPage() {

    const dispatch = useAppDispatch()

    const {data, title} = useAppSelector(state => state.counter)

    return (
        <>
            <Typography variant='h2'>
                {title}
            </Typography>
            <Typography variant='h5'>
                The data is: {data}
            </Typography>
            <ButtonGroup>
                <Button onClick={() => dispatch(increment(1))} variant='contained' color='primary'>Increase</Button>
                <Button onClick={() => dispatch(decrement(1))} variant='contained' color='error'>Decrease</Button>
                <Button onClick={() => dispatch(reset(0))} variant='contained' color='secondary'>Reset</Button>
            </ButtonGroup>
        </>
    )
}