import { Dexie } from 'dexie'
import type { EntityTable } from 'dexie'

interface Lesson {
  id: number
  title: string
  content: string
}
interface Sentence {
  id: number,
  sentence: string
}

class Db extends Dexie {
  lessons!: EntityTable<Lesson, 'id'>
  sentences!: EntityTable<Sentence, 'id'>

  constructor() {
    super('Na_tap_doc')
    this.version(1).stores({
      lessons: '++id, &title',
      sentences: '++id, &sentence'
    })
  }
}

const db = new Db()

export default db
export type { Db, Lesson, Sentence }
