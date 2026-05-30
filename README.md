# @fictjs/skill

Production-ready skill library for Fict-focused coding agents.

## What this package provides

- A curated skill set under `skills/`
- Rule-based guidance in `skills/*/rules/`
- Generated `AGENTS.md` for one-file agent consumption
- Node API to enumerate and read bundled skill documents

## Included skills

- `fict-best-practices`
- `fict-devtools-playground`

## API

```ts
import {
  listSkills,
  hasSkill,
  readSkillDocument,
  readSkillMetadata,
  getSkillPackageInfo,
} from '@fictjs/skill'

console.log(getSkillPackageInfo())
console.log(listSkills())

if (hasSkill('fict-best-practices')) {
  const skillDoc = readSkillDocument('fict-best-practices', 'skill')
  const agentsDoc = readSkillDocument('fict-best-practices', 'agents')
  const metadata = readSkillMetadata('fict-best-practices')
  console.log(skillDoc.length, agentsDoc.length, metadata.version)
}
```

## Development workflow

```bash
pnpm build:skills
pnpm validate:skills
pnpm build
```

## Layout

```text
./
  src/                      # Runtime API
  scripts/                  # Build / validate tooling
  skills/
    manifest.json
    fict-best-practices/
      SKILL.md
      AGENTS.md
      metadata.json
      rules/
    fict-devtools-playground/
      SKILL.md
      AGENTS.md
      metadata.json
      rules/
```
