import arrayToTree from 'array-to-tree'

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
    parentProperty: 'parentId',
  })
}
