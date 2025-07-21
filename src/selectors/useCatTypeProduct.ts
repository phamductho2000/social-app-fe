import {useEffect, useState} from "react";
import {findAllTreeCatType} from "@/services/category/categoryController";
import {UNPAGED} from "@/core/constant";

const useCatTypeProduct = () => {
  const [listCatType, setListCatType] = useState<any[]>([]);
  useEffect(() => {
    findAllTreeCatType({body: {...UNPAGED}}).then(res => {
      if (res && res?.body) {
        setListCatType(res.body);
      }
    })
  }, []);

  return {listCatType}
}

export default useCatTypeProduct;
