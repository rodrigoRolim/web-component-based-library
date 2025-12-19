import { readdirSync, writeFileSync } from 'fs'
import { join } from 'path'

const COMPONENTS_DIR = 'src/components'
const OUTPUT = 'src/index.ts'

const lines = []

for (const dir of readdirSync(COMPONENTS_DIR, { withFileTypes: true })) {
  if (!dir.name.includes('register')) continue

  const base = dir.name.replace('.register.ts', '.register')
  const registerFile = base //`${base}.register.ts`

  lines.push(
    `export * from './components/${registerFile}'`
  )
}

writeFileSync(
  OUTPUT,
  lines.join('\n') + '\n'
)

console.log('✔ barrel gerado:', OUTPUT)
