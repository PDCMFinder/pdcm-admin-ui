import React, { useState } from 'react'
import ReleaseSelector from '../releaseSelector/ReleaseSelector'
import { getModelsByViewAndRelease } from '../../../apis/Releases.api';
import { useQuery } from 'react-query';
import ModelsSearchTemplate from '../modelsSearchTemplate/ModelsSearchTemplate';
import modelsFacets from "../../../data/models-facets.json";
import { Typography } from '@mui/material';

/**
 * A generic component that displays information about models in a specific release.
 * The specific data will depend on a parameter passed to the component,
 * which influences the endpoint that provides the data. In this way, the 
 * component can be reused to show several views of data keeping the same 
 * structure and logic
 */
const ModelsByRelease = ({ viewName, viewTitle }) => {
  const [selectedRelease, setSelectedRelease] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const facets = modelsFacets.facets;
  let [facetSelection, setFacetSelection] = useState({});

  const { isLoading, data } = useQuery(
    ["models_by_release", { viewName,  selectedRelease, facetSelection, page, pageSize }],
    () => getModelsByViewAndRelease(viewName, selectedRelease,facetSelection, page, pageSize),
    {
      enabled: !!selectedRelease, // Set enabled to true when selectedRelease has a value
    }
  );

  const handleSelectionChange = (selectedReleaseId) => {
    setSelectedRelease(selectedReleaseId);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFiltersChange = (newFilters) => {
    setFacetSelection(newFilters);
  };

  const { content, pageable, totalElements } = data || {};

  return (
    <div>
      <Typography variant="h4" gutterBottom>
      {viewTitle}
      </Typography>
      <ReleaseSelector onSelectionChange={handleSelectionChange}></ReleaseSelector>
      {selectedRelease &&
        <ModelsSearchTemplate
          facets={facets}
          facetsSelection={facetSelection}
          onFacetSidebarChange={handleFiltersChange}
          searchResults={content}
          loadingSearchResults={isLoading}
          page={pageable?.pageNumber || 0}
          size={pageable?.pageSize || 10}
          totalElements={totalElements || 0}
          onPaginationChange={handleChangePage}
          onPageSizeChange={handleChangeRowsPerPage}
        >

        </ModelsSearchTemplate>
      }
    </div>

  )
}

export default ModelsByRelease