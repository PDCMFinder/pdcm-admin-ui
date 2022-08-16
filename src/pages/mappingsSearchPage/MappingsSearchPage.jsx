import React, { useState } from "react";

import searchFacets from "../../data/search-facets.json";
import {
  buildSearchParameters,
  searchMappings,
  useQueryParams,
} from "../../apis/Mappings.api";
import { useQuery } from "react-query";
import MappingsSearchTemplate from "../../components/mappingsSearch/mappingsSearchTemplate/MappingsSearchTemplate";
import { useNavigate } from "react-router-dom";

const MappingsSearchPage = () => {
  let navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const facets = searchFacets.facets;

  let [facetsByKey] = useQueryParams();

  let [facetSelection, setFacetSelection] = useState(facetsByKey);

  const { isLoading, data } = useQuery(
    ["searchMappings", { facetSelection, page, pageSize }],
    () => searchMappings(facetSelection, page, pageSize)
  );

  const pageInfo = data?.page || {};

  const handleChangePage = (newPage) => {
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
      searchResults={data}
      loadingSearchResults={isLoading}
      totalElements={pageInfo?.totalElements || 0}
      page={pageInfo?.number || 0}
      size={pageInfo?.size || 10}
      onPaginationChange={handleChangePage}
      onPageSizeChange={handleChangeRowsPerPage}
    />
  );
};

export default MappingsSearchPage;
