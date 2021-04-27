// 获取权限列表
export const getPermissions = (permissions = JSON.parse(sessionStorage.getItem('permissions')))=>{
  return permissions
}

export const core = (name, permissions = getPermissions()) => {
  const target = name.split(':')
  return !!((permissions && permissions['permissions']) || []).find((x) => {
    if (x === '*' || x === name) {
      return true
    }
    let z = 0
    let source = x.split(':')
    for (let j = 0; j < source.length; j++) {
      if (source[j] === target[j] || source[j] === '*') {
        z++
      } else {
        z = 0
        break
      }
    }
    if (z > 0 && source.length === z) {
      if (target.length > z) {
        return source.includes('*')
      }
      return true
    }
    source = x.split('*')
    if (source.length === 2) {
      const first = source[0].split(':')
      z = 0
      for (let i = 0; i < (first.length - 1); i++) {
        if (first[i] === target[i]) {
          z++
        }
      }
      if ((first.length - 1) === z) {
        const target1 = target.reverse()
        const tail = source[1].split(':').reverse()
        z = 0
        for (let i = 0; i < (tail.length - 1); i++) {
          if (tail[i] === target1[i]) {
            z++
          }
        }
        if ((tail.length - 1) === z) {
          return true
        }
      }
    }
  })
}
