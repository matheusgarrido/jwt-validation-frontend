export type ITokenType = 'access' | 'refresh';
export type IKey = ITokenType;

const Storage = {
  //Creates or update an item
  setItem: (key: IKey, value: any) => {
    //If is an object, be converted to string
    const formattedValue =
      typeof value === 'object' ? JSON.stringify(value) : value;
    localStorage.setItem(key, formattedValue);
  },
  //Get the value of an item
  getItem: (key: IKey): any => {
    const item: any = localStorage.getItem(key);
    //Check if is an object
    if (item && typeof item === 'string') {
      const formattedItem =
        item[0] === '{' && item[item.length - 1] === '}'
          ? JSON.parse(item)
          : item;
      return formattedItem;
    }
    return item;
  },
};

export default Storage;
