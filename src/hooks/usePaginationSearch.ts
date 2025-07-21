import {useNavigate} from 'umi';
import {useEffect, useState} from "react";
import {useLocation} from "@@/exports";

function usePaginationSearch() {
  const navigate = useNavigate();
  const [paginationQuery, setPaginationQuery] = useState();
  const [searchQuery, setSearchQuery] = useState<any>();
  const location = useLocation();

  const updateToSearchParams = (obj: any) => {
    const searchParams = new URLSearchParams();
    obj.queries.forEach((query: any) => {
      searchParams.append('queries.key', query.key);
      searchParams.append('queries.value', query.value);
      searchParams.append('queries.operation', query.operation);
    });
    navigate({search: searchParams.toString()});
    setSearchQuery(obj);
  }

  useEffect(() => {
    if (location.search) {
      console.log('location.search', location.search)
      const searchParams = new URLSearchParams(location.search);
      const keys = searchParams.getAll('queries.key');
      const values = searchParams.getAll('queries.value');
      const operations = searchParams.getAll('queries.operation');
      const queries = keys.map((key, index) => ({
        key,
        value: values[index],
        operation: operations[index]
      }));
      setSearchQuery({queries});
    }
  }, [location.search]);

  return {paginationQuery, searchQuery, updateToSearchParams};
}

export default usePaginationSearch;
