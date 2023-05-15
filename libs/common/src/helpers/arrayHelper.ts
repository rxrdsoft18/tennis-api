export const groupBy = (array: any[], key: string) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue,
    );
    return result;
  }, {});
};

export const countBy = (array: any[], key: string) => {
  return array.reduce((acc, item) => {
    const countKey = item[key];
    acc[countKey] = (acc[countKey] || 0) + 1;

    return acc;
  }, {});
};

export const sumBy = (array: any[], key: string) => {
  return array.reduce((acc, item) => {
    return acc + item[key];
  }, 0);
};

export const orderBy = (array: any[], key: string, criteria = 'asc') => {
  if (criteria === 'desc') {
    return array.sort((a, b) => b[key] - a[key]);
  }
  return array.sort((a, b) => a[key] - b[key]);
};
