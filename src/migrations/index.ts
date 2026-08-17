import * as migration_20250929_111647 from './20250929_111647'
import * as migration_20260817_125318_portfolio_content from './20260817_125318_portfolio_content'

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260817_125318_portfolio_content.up,
    down: migration_20260817_125318_portfolio_content.down,
    name: '20260817_125318_portfolio_content',
  },
]
