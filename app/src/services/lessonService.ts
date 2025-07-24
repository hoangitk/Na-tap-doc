import type { Lesson } from "src/db"
import db, { type LessonInsert } from "src/db"
import { useLiveQuery } from "src/db"

const latestUpdateOn = useLocalStorage('lessons-gist-latest-update-on', 0)
const OneDay = 24 * 60 * 60 * 1000

export async function pullFromCloud(force: boolean = false): Promise<[boolean, string]> {
  try {

    const now = Date.now()
    if (!force && now - latestUpdateOn.value < OneDay) {
      return [false, 'Dữ liệu đã được cập nhật trong 24 giờ']
    }

    const res = await fetch(`https://gist.githubusercontent.com/hoangitk/c2a121250ff54204a7e6df164e9260b2/raw/Na-tap-doc.md${(force ? `?v=${Date.now()}` : '')}`)

    if (res.status === 304) {
      return [false, 'Không có bài học mới']
    }

    const mdContent = await res.text()
    const lessons = mdContent
      .split(/^##\s+/gm)
      .filter(block => !!block && !block.startsWith('#'))
      .map(block => {
        const [rawTitle, ...restContent] = block.split('\n')
        return { title: rawTitle?.trim(), content: restContent.join('\n') }
      })

    await db.lessons.bulkPut(lessons as LessonInsert[])
      .catch(e => {
        console.log('Bỏ qua sô bài đã có: ', e.failures.length)
      })

    latestUpdateOn.value = now

    return [true, 'Đã cập nhập bài học mới']
  } catch (error) {
    console.warn('Tải bài học', error)
    return [false, `Tải bài học bị lỗi`]
  }
}

export function useLessonTitleList() {
  return useLiveQuery(async (db) => {
    const lessons = db.lessons.toArray()
    return (await lessons).map(({ id, title }) => ({ id, title }))
  })
}

export async function randomLesson() {
  const count = await db.lessons.count()
  const randIdx = Math.floor(Math.random() * count)
  console.log(randIdx)
  const [lesson] = await db.lessons
    .offset(randIdx)
    .limit(1)
    .toArray()
  return lesson
}

export const lessonToText = ({ title, content }: Lesson) => `${title}\n\n${content}`
