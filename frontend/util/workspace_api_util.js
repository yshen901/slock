// DESIGN: GET BY ADDRESS NOT ID!!!
export const getWorkspace = (workspaceAddress) => (
  $.ajax({
    method: "GET",
    url: `/api/workspaces/${workspaceAddress}`
  })
)

export const getWorkspaces = () => (
  $.ajax({
    method: "GET",
    url: `/api/workspaces`
  })
)

export const postWorkspace = (workspace) => (
  $.ajax({
    method: "POST",
    url: '/api/workspaces',
    data: {workspace}
  })
)