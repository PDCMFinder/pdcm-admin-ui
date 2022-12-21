import React, { useState } from "react";

import searchFacets from "../../data/search-facets.json";
import {
  buildSearchParameters,
  getCountsByStatusWithFilter,
  searchMappings,
  useQueryParams,
} from "../../apis/Mappings.api";
import { useQuery, useQueryClient } from "react-query";
import MappingsSearchTemplate from "../../components/mappingsSearch/mappingsSearchTemplate/MappingsSearchTemplate";
import { useNavigate } from "react-router-dom";

const MappingsSearchPage = () => {
  let navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const facets = searchFacets.facets;

  let [facetsByKey] = useQueryParams();

  let [facetSelection, setFacetSelection] = useState(facetsByKey);

  const { isLoading, data } = useQuery(
    ["searchMappings", { facetSelection, page, pageSize }],
    () => searchMappings(facetSelection, page, pageSize)
  );

  const countsByStatusQuery = useQuery(
    ["getCountsByStatusWithFilter", { facetSelection }],
    () => getCountsByStatusWithFilter(facetSelection)
  );

  const pageInfo = data?.page || {};

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFiltersChange = (newFilters) => {
    setFacetSelection(newFilters);
    updateSearchParams(newFilters);
  };

  const handleSearchBoxChange = (_e, v) => {
    if (v) {
      const query = '%' + v + '%';
      facetSelection['label'] = [encodeURIComponent(query)];
      handleFiltersChange(facetSelection)
    }
  };
  

  const handleDataChange = () => {
    queryClient.invalidateQueries(["searchMappings"]);
    queryClient.invalidateQueries(["getCountsByStatusWithFilter"]);
  };

  const updateSearchParams = (newfFacetSelection) => {
    navigate("../search?" + buildSearchParameters(newfFacetSelection), {
      replace: true,
    });
  };

  return (
    <MappingsSearchTemplate
      facets={facets}
      facetsSelection={facetSelection}
      onFacetSidebarChange={handleFiltersChange}
      onSearchBoxSelectionChange={handleSearchBoxChange}
      onDataChanged={handleDataChange}
      searchResults={data}
      loadingSearchResults={isLoading}
      loadingCountsByStatus={countsByStatusQuery.isLoading}
      countsByStatus={countsByStatusQuery.data}
      totalElements={pageInfo?.totalElements || 0}
      page={pageInfo?.number || 0}
      size={pageInfo?.size || 10}
      onPaginationChange={handleChangePage}
      onPageSizeChange={handleChangeRowsPerPage}
    />
  );
};

export default MappingsSearchPage;
