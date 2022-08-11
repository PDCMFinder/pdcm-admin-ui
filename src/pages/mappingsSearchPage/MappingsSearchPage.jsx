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
  let [facetSelection, setFacetSelection] = useState({});

  let navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const facets = searchFacets.facets;

  let [facetsByKey] = useQueryParams();

  const { isLoading, data, error } = useQuery(
    ["searchMappings", { facetSelection, page, pageSize }],
    () => searchMappings(facetSelection, page, pageSize)
  );

  const pageInfo = data?.page || {};

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updateSearchParams = (facetSelection) => {
    // setActivePage(1);
    navigate("../search?" + buildSearchParameters(facetSelection), {
      replace: true,
    });
  };

  if (
    !isLoading &&
    Object.keys(facetsByKey).length > 0 &&
    Object.keys(facetSelection).length === 0
  ) {
    setFacetSelection(facetsByKey);
  }

  return (
    <MappingsSearchTemplate
      facets={facets}
      facetsSelection={facetSelection}
      onFacetSidebarChange={(facetSelection) => {
        setFacetSelection(facetSelection);
        updateSearchParams(facetSelection);
      }}
      searchResults={data}
      loadingSearchResults={isLoading}
      totalElements={pageInfo?.totalElements || 0}
      page={pageInfo?.number || 0}
      size={pageInfo?.size || 5}
      onPaginationChange={handleChangePage}
      onPageSizeChange={handleChangeRowsPerPage}
    />
  );
};

export default MappingsSearchPage;
