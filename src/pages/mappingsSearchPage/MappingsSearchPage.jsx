import React, { useState } from "react";

import searchFacets from "../../data/search-facets.json";
import { searchMappings, useQueryParams } from "../../apis/Mappings.api";
import { useQuery } from "react-query";
import MappingsSearchTemplate from "../../components/mappingsSearch/mappingsSearchTemplate/MappingsSearchTemplate";

const MappingsSearchPage = () => {
  let [facetSelection, setFacetSelection] = useState({});

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const facets = searchFacets.facets;
  console.log("facets", facets);

  let [facetsByKey] = useQueryParams();

  console.log("facetsByKey", facetsByKey);

  const { isLoading, data, error } = useQuery(
    ["searchMappings", { facetSelection, page, pageSize }],
    () => searchMappings(facetSelection, page, pageSize)
  );

  const pageInfo = data?.page || {};

  const handleChangePage = (event, newPage) => {
    console.log("newPage:", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updateSearchParams = (x) => {
    console.log(updateSearchParams, x);
  };
  // /!isLoading &&
  if (
    Object.keys(facetsByKey).length > 0 &&
    Object.keys(facetSelection).length === 0
  ) {
    console.log("setFacetSelection", facetsByKey);
    setFacetSelection(facetsByKey);
  }
  console.log(pageInfo);
  console.log("facetSelection", facetSelection);

  return (
    <div>
      {/* {Object.keys(facetSelection).map((x, y) => {
        return (
          <div key={y}>
            {x} , {y}, {facetSelection[x]}
          </div>
        );
      })} */}
      <div>{pageInfo?.size || "no size"}</div>
      <div>{pageInfo?.totalElements || "no totalPages"}</div>
      <div>{pageInfo?.totalPages || "no totalPages"}</div>
      <div>{pageInfo?.number || "no number"}</div>
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
        size={pageInfo?.size || 0}
        onPaginationChange={handleChangePage}
        onPageSizeChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default MappingsSearchPage;
