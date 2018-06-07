import union from 'lodash/union';
import keys from 'lodash/keys';
import filter from 'lodash/filter';

const changedKeys = (o1: object, o2: object) => {
  const unionKeys = union(keys(o1), keys(o2));
  return filter(unionKeys, key => o1[key] !== o2[key]);
};
export default changedKeys;
