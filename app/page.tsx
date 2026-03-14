"use client";

/**
 * page.tsx - MBTI 퀴즈 홈 (시작 화면)
 */

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50/50 px-4">
      <main className="flex max-w-md flex-col items-center gap-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-amber-900">
          MBTI 퀴즈
        </h1>
        <p className="text-zinc-600 leading-relaxed">
          10개의 질문에 답하면 당신의 성향을 바탕으로 MBTI를 알려드려요.
          <br />
          카드를 넘기며 재미있게 참여해 보세요.
        </p>
        <Link
          href="/quiz"
          className="rounded-full bg-amber-500 px-8 py-3 text-base font-medium text-white shadow-md transition-colors hover:bg-amber-600 active:scale-[0.98]"
        >
          시작하기
        </Link>
      </main>
    </div>
  );
}
