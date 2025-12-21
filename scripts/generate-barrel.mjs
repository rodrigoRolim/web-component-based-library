import { readdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const COMPONENTS_DIR = 'src/components'
const OUTPUT = 'src/index.ts'

const lines = []

for (const dir of readdirSync(COMPONENTS_DIR, { withFileTypes: true })) {
  if (dir.name.includes('.htm') || dir.name.includes('.stories.ts')) continue

  const registerFile = dir.name.replace('.ts', '')

  lines.push(
    `export * from './components/${registerFile}'`
  )
}

writeFileSync(
  OUTPUT,
  lines.join('\n') + '\n'
)

console.log('✔ barrel gerado:', OUTPUT)
