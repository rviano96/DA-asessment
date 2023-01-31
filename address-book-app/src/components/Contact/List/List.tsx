import React, { useEffect } from "react"
import { TableCell, TableRow } from '@mui/material'
import SearchBar from "material-ui-search-bar"
import SearchableTable from '../Table/Table'
import { HeadCell, NameCell, Row, TopBarContainer, } from './Styles'
import { Contact } from '../../../models/contact.model'
import { getAllContacts } from '../../../services/contact.service'
import { CONTACT_CREATE_PATH, CONTACT_EDIT_PATH } from "../../../Constants"
import { useNavigate } from "react-router-dom"
import { Button, Image } from "../CommonStyles"

const PAGE_SIZE: number = 5

const List: React.FC = () => {
    const [searchText, setSearchText] = React.useState<string>("")
    const [isError, setIsError] = React.useState<boolean>(false)
    const [isSearching, setIsSearching] = React.useState<boolean>(false)
    const [count, setCount] = React.useState<number>(0)
    const [contacts, setContacts] = React.useState<Contact[]>([])
    const debouncedSearch: string = useDebounce<string>(searchText, 500)
    const navigate = useNavigate()

    useEffect(() => {
        getContacts(0)
    }, [])


    const getContacts = (offset: number, searchText?: string) => {
        setIsSearching(true)
        setIsError(false)
        getAllContacts({ offset, limit: (offset + 1) * PAGE_SIZE, search: searchText })
            .then((response: any) => {
                setContacts(response.data.contacts)
                response.data.count && setCount(response.data.count)
            }).catch((e: Error) => {
                console.log(e)
                setIsError(true)
            }).finally(() => {
                setIsSearching(false)
            })
    }

    useEffect(
        () => {
            if (debouncedSearch) {
                getContacts(0, debouncedSearch)
            }
        },
        [debouncedSearch]
    )

    const cancelSearch = () => {
        setSearchText("")
    }

    const navigateToEditUser = (id: string | undefined) => {
        id && navigate(`${CONTACT_EDIT_PATH}/${id}`)
    }

    const columns: any = [{ header: '' }, { header: 'Full Name' }, { header: 'Email' }, { header: 'Phone' }]

    const getRows = (rows: Contact[]) => {
        return (
            rows.map((row: Contact) => {
                const contact = new Contact(row)
                return (
                    <Row key={contact.id}
                        onClick={() => navigateToEditUser(contact.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <TableCell align="left" component="th" scope="row" style={{ width: 30, height: 30 }}>
                            {contact.photoUrl ? <Image src={contact.photoUrl} width={'30'} height={'30'} /> : <Image src='' width={'30'} height={'30'} />}
                        </TableCell>
                        <NameCell align="left" component="th" scope="row" >
                            {contact.fullName}
                        </NameCell>
                        <TableCell align="left" component="th" scope="row">{contact.email}</TableCell>
                        <TableCell align="left" component="th" scope="row">{contact.phone}</TableCell>

                    </Row>)
            })
        )
    }

    const getColumns = (columns: any) => {
        return (
            <TableRow key={'header'} >
                {columns.map((column: any) => {
                    return (<>
                        <HeadCell align="left" key={column.header}> {column.header}</HeadCell >
                    </>)
                })}

            </TableRow>
        )
    }

    const searchBar = () => {
        return (
            <SearchBar
                style={{ 'margin-right': '1rem' }}
                value={searchText}
                onChange={(searchVal) => setSearchText(searchVal)}
                onCancelSearch={() => cancelSearch()}
            />
        )
    }

    const topBar = () => {
        return (
            <TopBarContainer>
                {searchBar()}
                <Button onClick={() => navigate(CONTACT_CREATE_PATH)}>
                    Add contact
                </Button>

            </TopBarContainer>)
    }

    return <SearchableTable
        rows={getRows(contacts)}
        columns={getColumns(columns)}
        pageSize={PAGE_SIZE}
        onPageChanged={(page) => getContacts(page)}
        topBar={topBar()}
        count={count}
        isSearching={isSearching}
        isError={isError}
    />

}

//This can be done inside a helper.
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

    useEffect(
        () => {

            const handler = setTimeout(() => {
                setDebouncedValue(value)
            }, delay)


            return () => {
                clearTimeout(handler)
            }
        },
        [value, delay]
    )

    return debouncedValue
}

export default List