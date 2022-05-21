import { debounce, TextField } from "@material-ui/core";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSearch() {

    const { productParams } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch();

    const [searchText, setSearchText] = useState(productParams.searchTerm)


    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({ searchTerm: event.target.value }))
    }, 1000)



    return (
        <TextField
            label='Search Products'
            variant='outlined'
            fullWidth
            value={searchText || ''}
            onChange={(event: any) => {
                setSearchText(event.target.value)
                debouncedSearch(event)
            }}
        />
    )
}