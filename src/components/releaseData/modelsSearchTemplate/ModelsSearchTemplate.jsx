import { Grid, TablePagination } from '@mui/material'
import React from 'react'
import ModelsSearchResults from '../modelsSearchResults/ModelsSearchResults';
import FacetSideBar from '../../facets/facetSideBar/FacetSideBar';

const ModelsSearchTemplate = ({
    facets,
    facetsSelection,
    onFacetSidebarChange,
    searchResults,
    loadingSearchResults,
    totalElements,
    page,
    size,
    onPaginationChange,
    onPageSizeChange
}) => {

    const models = searchResults || [];

    return (

        <Grid container spacing={2} style={{ marginTop: "5px" }}>
            <Grid item xs={3}>
                <FacetSideBar
                    facets={facets}
                    onSelectionChange={(facet, options) => {
                        let newSelection = {
                            [facet]: options,
                        };
                        onFacetSidebarChange(newSelection);
                    }}
                    facetsSelection={facetsSelection}
                    onReset={() => {
                        onFacetSidebarChange(facetsSelection);
                        onPaginationChange(0);
                    }}
                />
            </Grid>

            <Grid item xs={9}>
            <Grid container spacing={2} style={{ marginTop: "5px" }}>
                <TablePagination
                    component="div"
                    count={totalElements}
                    page={page}
                    onPageChange={onPaginationChange}
                    rowsPerPage={size}
                    rowsPerPageOptions={[10, 20, 50]}
                    onRowsPerPageChange={onPageSizeChange}
                />
            </Grid>

            <Grid item xs={9}>
                <ModelsSearchResults
                    results={models}
                    isLoading={loadingSearchResults}
                />
            </Grid>

            <Grid item xs={9}>
                <TablePagination
                    component="div"
                    count={totalElements}
                    page={page}
                    onPageChange={onPaginationChange}
                    rowsPerPage={size}
                    rowsPerPageOptions={[10, 20, 50]}
                    onRowsPerPageChange={onPageSizeChange}
                />
            </Grid>
            </Grid>
        </Grid>
    )
}

export default ModelsSearchTemplate