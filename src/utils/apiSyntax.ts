import mapKeys from 'lodash.mapkeys';
import camelCase from 'lodash.camelcase';
const apiSyntax = <T>(dbObject: T) =>
  mapKeys(dbObject, (value, key) => camelCase(key)) as T;
export default apiSyntax;
