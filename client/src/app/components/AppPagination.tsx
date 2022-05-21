import { Box, Typography, Pagination } from "@material-ui/core";
import LoadingComponent from "../layout/LoadingComponent";
import { MetaData } from "../models/pagination";


interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void
}

export default function AppPagination({ metaData, onPageChange }: Props) {

    const { currentPage, totalPages, totalCount, pageSize } = metaData
    console.log('metadata in app pagination', metaData)

    if (!metaData) {
        return (
            <LoadingComponent message="Loading the Catalog" />
        )
    }

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Displaying {(currentPage - 1) * pageSize + 1} - {currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize} of {totalCount} items
            </Typography>
            <Pagination
                color='secondary'
                size="small"
                count={totalPages}
                page={currentPage}
                onChange={(e, page) => onPageChange(page)}
            />
        </Box>
    )
}