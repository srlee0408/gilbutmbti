"use client";

/**
 * page.tsx - MBTI 퀴즈 홈 (시작 화면)
 */

import Link from "next/link";

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{ background: "var(--background)" }}
    >
      <main className="flex max-w-md flex-col items-center gap-10 text-center">
        <h1 className="font-editorial text-3xl font-semibold tracking-tight text-[var(--foreground)]">
          MBTI 퀴즈
        </h1>
        <p className="text-[var(--muted)] leading-relaxed">
          10개의 질문에 답하면 당신의 성향을 바탕으로 MBTI를 알려드려요.
          <br />
          카드를 넘기며 참여해 보세요.
        </p>
        <Link
          href="/quiz"
          className="rounded border-2 border-[var(--accent)] bg-[var(--accent)] px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)] active:scale-[0.98]"
        >
          시작하기
        </Link>
      </main>
    </div>
  );
}
