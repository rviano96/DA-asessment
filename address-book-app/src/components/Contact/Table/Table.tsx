import * as React from 'react';

import { Container, Paper, SpinnerContainer } from './Styles';
import { TableBody, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import Table from '@mui/material/Table';
import TablePaginationActions from './TablePagination';
import Spinner from '../../Spinner/Spinner';

interface ITable {
    columns: any,
    rows: any,
    pageSize?: number,
    topBar?: any,
    count: number,
    onPageChanged: (page: number) => void,
    isSearching: boolean,
    isError: boolean
}


const SearchableTable: React.FC<ITable> = ({ rows, columns, pageSize = 5, topBar, onPageChanged, count = 0, isSearching = false, isError = false }) => {
    const [page, setPage] = React.useState(0);


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * pageSize - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        onPageChanged(newPage)
    };


    return (
        <Container>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                {!!topBar && topBar}
                <TableContainer sx={{ height: 440, marginTop: '1rem' }}>
                    {isSearching ?
                        <SpinnerContainer>
                            <Spinner size={50} />
                        </SpinnerContainer>
                        :
                        isError ? <SpinnerContainer>
                            Oops! try again!
                        </SpinnerContainer> :
                            <Table stickyHeader>
                                <TableHead>
                                    {columns}
                                </TableHead>
                                <TableBody>
                                    {rows}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[pageSize]}
                                            colSpan={columns.length}
                                            count={count}
                                            rowsPerPage={pageSize}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>}
                </TableContainer>
            </Paper>
        </Container>)
}


export default SearchableTable