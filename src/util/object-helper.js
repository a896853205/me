import { isArray } from "util";

export let objectHelper = {};

objectHelper.deepCopy = obj => {
  if (typeof obj !== 'object') {
    return obj;
  }

  if (isArray(obj)) {
    let newArr = [];

    for (let item of obj) {
      newArr.push(objectHelper.deepCopy(item));
    }

    return newArr;
  } else {
    let newObj = {};

    for (let attr in obj) {
      newObj[attr] = objectHelper.deepCopy(obj[attr]);
    }

    return newObj;
  }
}