import { Dexie } from 'dexie'
import type { EntityTable, InsertType } from 'dexie'

export interface Lesson {
  id: number
  title: string
  content: string
}
export type LessonInsert = InsertType<Lesson, 'id'>

export interface Sentence {
  id: number,
  sentence: string
}
export type SentenceInsert = InsertType<Sentence, 'id'>

export class Db extends Dexie {
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
