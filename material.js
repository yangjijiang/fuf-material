const fs = require('fs')
const path = require('path')
const dirPath = path.resolve(__dirname, './packages')
const materials = []

fs.readdirSync(dirPath).forEach((name) => {
  const filePath = path.join(dirPath, name, 'package.json')
  if (fs.existsSync(filePath)) {
    const p = require(filePath)
    materials.push({name: name, ...p.material})
  }
})

fs.writeFileSync('material.json', JSON.stringify(materials), (err) => {
})
