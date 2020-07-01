export const GET_ORGANIZATION = (queryString, cursor) => {
  let search = `{
    search(query: "${queryString}", type: REPOSITORY, first:5,after:"${cursor}") {
       pageInfo {
         endCursor
         startCursor
         hasNextPage
       }
       edges {
         node {
           ... on Repository {
             name
             id
             description
             stargazers{
               totalCount
             }
             url
           }
         }
       }
     }
 }`

  if (!cursor) search = search.replace(`,after:"${cursor}"`, '')

  return search
}
