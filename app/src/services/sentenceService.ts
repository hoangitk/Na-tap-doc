import db, { type SentenceInsert } from "src/db"

export async function initSampleSentences() {
  const count = await db.sentences.count()
  if (count === 0) {
    console.log('Init Sample Sentences')
    const sampleSentences = [
      "Na rất thích Tiếng Việt.",
      "Mẹ Na thật xinh đẹp.",
      "Bạn Na rất ngoan.",
      "Na rất yêu chị Mi.",
      "Bé đi học đúng giờ.",
      "Mẹ nấu cơm ngon lắm.",
      "Con mèo nằm ngủ.",
      "Bố mua bánh cho bé.",
      "Trời hôm nay rất mát.",
      "Em bé đang chơi bóng.",
      "Ông đọc sách mỗi tối.",
      "Chị tô màu con cá.",
      "Chó chạy quanh sân.",
      "Bé hát bài vui nhộn.",
      "Cây xanh mọc tốt.",
      "Mưa rơi tí tách.",
      "Bé thích ăn kem.",
      "Đèn sáng trong phòng.",
      "Chú chim bay cao.",
      "Hoa hồng thơm ngát.",
      "Cá bơi dưới nước.",
      "Bé vẽ mặt trời.",
      "Trăng tròn sáng quá."
    ].map((sentence) => ({ sentence }))
    await db.sentences.bulkPut(sampleSentences as SentenceInsert[])
  }
}

export async function randomSentence() {
  const count = await db.sentences.count()
  const randIdx = Math.floor(Math.random() * count)
  const [randSentence] = await db.sentences
    .offset(randIdx)
    .limit(1)
    .toArray()

  return randSentence
}
