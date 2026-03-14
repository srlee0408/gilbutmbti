/**
 * pick-random.ts - 배열에서 랜덤 N개 추출
 *
 * Fisher-Yates 셔플 후 앞에서 count개만 반환하여
 * 30개 질문 풀에서 중복 없이 10문항 선택
 */

/**
 * 배열을 복사한 뒤 셔플하고 앞에서 count개 반환
 * @param array - 원본 배열 (변경하지 않음)
 * @param count - 추출할 개수
 * @returns 추출된 새 배열
 */
export function pickRandom<T>(array: T[], count: number): T[] {
  const copy = [...array];
  if (count >= copy.length) {
    shuffle(copy);
    return copy;
  }
  shuffle(copy);
  return copy.slice(0, count);
}

/**
 * Fisher-Yates 셔플 (in-place)
 */
function shuffle<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
