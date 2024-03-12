import { arrayToTree } from 'performant-array-to-tree'
import { CartItemSchemaWithDependecies } from './calcSchemasPrice'

export const getDependenciesTree = <T extends { id: string; dependencies: string[] }>(
  schemas: T[],
) => {
  // Converting children ids to parents ids
  const data = [...schemas].map((schema) => {
    const parents = schemas
      .filter(({ dependencies }) => dependencies.some((id) => id === schema.id))
      .map(({ id }) => id)

    // TODO: currently supporting only one child dependecy
    return { ...schema, parentId: parents[0], children: [] }
  })

  return arrayToTree(data, {
    id: 'id',
    parentId: 'parentId',
    childrenField: 'children',
    dataField: null,
  }) as CartItemSchemaWithDependecies[]
}
