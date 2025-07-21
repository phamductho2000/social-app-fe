export const renderNameByTierIndx = (skuTierIdx: number[], dataSource: any[]) => {
  const names: string[] = [];
  skuTierIdx.forEach((indexArr: number, index: number) => {
    names.push(dataSource[index]?.options[indexArr].name);
  });
  return names.join(" | ");
}

export const convertObjectToQuerySearch = (obj: any, config: any) => {
  const queries: { key: string; value: any; operation: any; }[] = [];
  Object.keys(obj).forEach((key: string) => {
    if (obj[key]) {
      queries.push({
        key: key,
        value: obj[key],
        operation: config[key]
      });
    }
  })
  return {queries};
}

export const convertSearchParamsToObject = (searchParams: any): { [key: string]: string } => {
  const params: any = {};
  for (let [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
}

export const getDaysOfMonth: any[] = Array.from({ length: 31 }, (_, i) => ({
  label: `${i + 1}`,
  value: "month",
}));

export const getMonthsOfYear = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}`,
  value: "month",
}));

export const getYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: currentYear - 1900 + 1 }, (_, i) => ({
    label: `${1900 + i}`,
    value: `${1900 + i}`,
  }))
};
