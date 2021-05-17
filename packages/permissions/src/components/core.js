/**
 * 权限判断逻辑（与shrio框架处理逻辑一样）
 * @param part
 * @returns {boolean|{implies(*=): boolean}}
 * @constructor
 */
function WildcardPermission (part) {
  const includesAll = (arr1, arr2) => {
    for (const arr of arr2) {
      if (!arr1.includes(arr)) {
        return false
      }
    }
    return true
  }
  const setParts = (wildcardString) => {
    return wildcardString.split(':').map(part => new Set(part.split(',')))
  }
  const getParts = setParts(part)
  return {
    implies (permission) {
      let i = 0
      const otherParts = setParts(permission)
      for (const otherPart of otherParts) {
        if (getParts.length - 1 < i) {
          return true
        } else {
          const part = [...getParts[i]]
          if (!part.includes('*') && !includesAll(part, otherPart)) {
            return false
          }
          i++
        }
      }
      for (; i < getParts.length; i++) {
        if (![...getParts[i]].includes('*')) {
          return false
        }
      }
      return true
    }
  }
}

// 获取权限列表
export const getPermissions = (permissions = JSON.parse(sessionStorage.getItem('permissions')))=>{
  return permissions
}

export const core = (name, permissions = getPermissions()) => {
  const perms = (permissions && permissions['permissions']) || []
  for (const perm of perms) {
    const wp = new WildcardPermission(perm)
    if (wp.implies(name)) {
      return true
    }
  }
  return false
}
