import { existsSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import {
  getSkillDocuments,
  getSkillManifestEntry,
  getSkillPackageInfo,
  getSkillPath,
  hasSkill,
  listSkills,
  readSkillDocument,
  readSkillMetadata,
} from '../src/index'

describe('@fictjs/skill package API', () => {
  it('lists bundled skills from the manifest', () => {
    expect(listSkills()).toEqual([
      expect.objectContaining({ name: 'fict-best-practices' }),
      expect.objectContaining({ name: 'fict-devtools-playground' }),
    ])
  })

  it('reads skill documents and metadata from package assets', () => {
    expect(hasSkill('fict-best-practices')).toBe(true)
    expect(hasSkill('missing-skill')).toBe(false)

    const skill = readSkillDocument('fict-best-practices', 'skill')
    const agents = readSkillDocument('fict-best-practices', 'agents')
    const metadata = readSkillMetadata('fict-best-practices')

    expect(skill).toContain('# Fict Compiler and Runtime Best Practices')
    expect(agents).toContain('# Fict Compiler and Runtime Best Practices')
    expect(metadata.organization).toBe('Fict Core Team')
  })

  it('returns manifest entries, package info, and resolved skill paths', () => {
    expect(getSkillPackageInfo()).toEqual({
      name: '@fictjs/skill',
      version: '0.21.0',
    })

    const entry = getSkillManifestEntry('fict-devtools-playground')
    expect(entry.title).toContain('DevTools')

    const skillPath = getSkillPath('fict-devtools-playground')
    expect(existsSync(skillPath)).toBe(true)
  })

  it('returns all documents for a skill', () => {
    const documents = getSkillDocuments('fict-devtools-playground')

    expect(documents.skill).toContain('# Fict DevTools')
    expect(documents.agents).toContain('# Fict DevTools and Playground Engineering')
    expect(documents.metadata.abstract).toContain('DevTools')
  })

  it('throws for unknown skills', () => {
    expect(() => readSkillDocument('unknown', 'skill')).toThrow(/Unknown skill/)
  })
})
