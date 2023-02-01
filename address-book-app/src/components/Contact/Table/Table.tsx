import * as React from 'react';

import { Container, HeadCell, Paper } from './Styles';
import { TableBody, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import Table from '@mui/material/Table';
import TablePaginationActions from './TablePagination';
import Spinner from '../../Spinner/Spinner';
import { SpinnerContainer } from '../CommonStyles';

interface ITable {
    columns: any,
    rows: any,
    pageSize?: number,
    topBar?: any,
    count: number,
    onPageChanged: (page: number) => void,
    isSearching: boolean,
    isError: boolean,
    searchText?: string
}


const SearchableTable: React.FC<ITable> = ({ rows, columns, pageSize = 5, topBar, onPageChanged, count = 0, isSearching = false, isError = false, searchText }) => {
    const [page, setPage] = React.useState(0);


    React.useEffect(() => {
        !!searchText && setPage(0)
    }, [searchText])

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
                        isError ?
                            <SpinnerContainer>
                                Oops! try again!
                            </SpinnerContainer> :
                            rows.length === 0 ?
                                searchText ?
                                    <SpinnerContainer>
                                        No records match your search.
                                    </SpinnerContainer> :
                                    <SpinnerContainer>
                                        Looks like you don't have any contact yet! :'( <br />
                                        Start adding contacts through the "Add contact" button :)
                                    </SpinnerContainer>
                                :
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow key='head'>
                                            {columns.map((col: any, idx: number) => (
                                                <HeadCell align="left" key={idx}> {col.header}</HeadCell >
                                            )
                                            )}
                                        </TableRow>
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
        </Container >)
}


export default SearchableTable