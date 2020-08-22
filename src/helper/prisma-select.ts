import { dmmf } from '@prisma/client';
import { DMMF } from '@prisma/client/runtime';
import { GraphQLResolveInfo } from 'graphql';
import graphqlFields from 'graphql-fields';

export const schema: DMMF.Schema = dmmf.schema;
export const dataModel: DMMF.Datamodel = dmmf.datamodel;

/**
 * Convert `info` to select object accepted by `prisma client`.
 * @param info - GraphQLResolveInfo.
 * @example
 * // Graphql query
 * {
 *    findManyUser{
 *      id
 *      posts(where: { title: { contains: "a" } }, first: 10) {
 *        id
 *        comments{
 *          id
 *        }
 *      }
 *    }
 * }
 * // convert to
 * {
 *  select: {
 *    id: true,
 *    posts: {
 *      select: { id: true, comments: { select: { id: true } } },
 *      where: { title: { contains: "a" } },
 *      first: 10
 *    }
 *  }
 * }
 *
 * // Use
 *
 * const select = new PrismaSelect(info);
 *
 * prisma.user.findMany({
 *  ...args,
 *  ...select.value,
 * })
 *
 */
export class PrismaSelect {
  value: any;
  private availableArgs = ['where', 'orderBy', 'skip', 'cursor', 'take'];
  private readonly isAggregate: boolean = false;

  constructor(private info: GraphQLResolveInfo, mergeObject: any = {}) {
    const returnType = this.info.returnType.toString().replace(/]/g, '').replace(/\[/g, '').replace(/!/g, '');
    this.isAggregate = returnType.includes('Aggregate');
    this.value = PrismaSelect.mergeDeep(this.filterBy(returnType, this.getSelect(this.fields)), mergeObject);
  }

  private get fields() {
    return graphqlFields(
      this.info,
      {},
      {
        excludedFields: ['__typename'],
        processArguments: true,
      },
    );
  }

  static isObject(item: any) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  static mergeDeep(target: any, ...sources: any[]): any {
    if (!sources.length) return target;
    const source: any = sources.shift();

    if (PrismaSelect.isObject(target) && PrismaSelect.isObject(source)) {
      for (const key in source) {
        if (PrismaSelect.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          PrismaSelect.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return PrismaSelect.mergeDeep(target, ...sources);
  }

  /**
   * Get nested value from select object.
   * @param field - name of field in select object.
   * @param filterBy - Model name as you have in schema.prisma file.
   * @param mergeObject
   * @example
   * // Graphql query
   * {
   *    findManyUser{
   *      id
   *      posts{
   *        id
   *        comments{
   *          id
   *        }
   *      }
   *    }
   * }
   *
   * // when you need to get more nested fields just add `.`
   * PrismaSelect.valueOf('posts.comments', 'Comment');
   * // return
   * { select: { id: true } }
   *
   * PrismaSelect.valueOf('posts', 'Post');
   *
   * // return
   * { select: { id: true, comments: { select: { id: true } } } }
   *
   */
  valueOf(field: string, filterBy?: string, mergeObject: any = {}) {
    const splitItem = field.split('.');
    let newValue = this.getSelect(this.fields);
    // tslint:disable-next-line: no-shadowed-variable
    for (const field of splitItem) {
      if (this.isAggregate && newValue.hasOwnProperty(field)) {
        newValue = newValue[field];
      } else if (!this.isAggregate && newValue.hasOwnProperty('select') && newValue.select.hasOwnProperty(field)) {
        newValue = newValue.select[field];
      } else {
        return {};
      }
    }
    return filterBy ? PrismaSelect.mergeDeep(this.filterBy(filterBy, newValue), mergeObject) : newValue;
  }

  private filterBy(modelName: string, selectObject: any) {
    const model = dataModel.models.find((item) => item.name === modelName);
    if (model) {
      const filteredObject = {
        ...selectObject,
        select: {},
      };
      Object.keys(selectObject.select).forEach((key) => {
        const field = model.fields.find((item) => item.name === key);
        if (field) {
          if (field.kind !== 'object') {
            filteredObject.select[key] = true;
          } else {
            filteredObject.select[key] = this.filterBy(field.type, selectObject.select[key]);
          }
        }
      });
      return filteredObject;
    } else {
      return selectObject;
    }
  }

  private getSelect(fields: any) {
    const selectObject: any = this.isAggregate ? {} : { select: {} };
    Object.keys(fields).forEach((key) => {
      if (Object.keys(fields[key]).length === 0) {
        if (this.isAggregate) {
          selectObject[key] = true;
        } else {
          selectObject.select[key] = true;
        }
      } else if (key === '__arguments') {
        fields[key].forEach((arg: any) => {
          Object.keys(arg).forEach((key2) => {
            if (this.availableArgs.includes(key2)) {
              selectObject[key2] = arg[key2].value;
            }
          });
        });
      } else {
        if (this.isAggregate) {
          selectObject[key] = this.getSelect(fields[key]);
        } else {
          selectObject.select[key] = this.getSelect(fields[key]);
        }
      }
    });
    return selectObject;
  }
}
