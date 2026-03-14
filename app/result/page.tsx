"use client";

/**
 * result/page.tsx - MBTI 결과 페이지
 *
 * 쿼리(e,i,n,s,t,f,j,p) 파싱 → 지표별 퍼센트·타입 계산 →
 * 4지표 막대 시각화 + 16타입명·설명 표시
 */

import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import Link from "next/link";
import { ResultChart } from "@/components/ResultChart";
import { MBTI_TYPE_MAP } from "@/shared/constants/mbti-types";
import { getPercentages, getTypeFromCounts } from "@/shared/utils/calculate-mbti";
import type { DimensionCounts } from "@/shared/utils/calculate-mbti";

function parseCounts(searchParams: URLSearchParams): DimensionCounts | null {
  const e = Number(searchParams.get("e"));
  const i = Number(searchParams.get("i"));
  const n = Number(searchParams.get("n"));
  const s = Number(searchParams.get("s"));
  const t = Number(searchParams.get("t"));
  const f = Number(searchParams.get("f"));
  const j = Number(searchParams.get("j"));
  const p = Number(searchParams.get("p"));
  if (
    [e, i, n, s, t, f, j, p].some(
      (v) => typeof v !== "number" || Number.isNaN(v) || v < 0
    )
  ) {
    return null;
  }
  return { E: e, I: i, N: n, S: s, T: t, F: f, J: j, P: p };
}

function ResultContent() {
  const searchParams = useSearchParams();
  const result = useMemo(() => {
    const counts = parseCounts(searchParams);
    if (!counts) return null;
    const total =
      counts.E +
      counts.I +
      counts.N +
      counts.S +
      counts.T +
      counts.F +
      counts.J +
      counts.P;
    if (total === 0) return null;
    const percentages = getPercentages(counts);
    const type = getTypeFromCounts(counts);
    const info = MBTI_TYPE_MAP[type];
    return { counts, percentages, type, info };
  }, [searchParams]);

  if (!result) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 px-4"
        style={{ background: "var(--background)" }}
      >
        <p className="text-[var(--muted)]">결과를 불러올 수 없습니다.</p>
        <Link
          href="/"
          className="rounded border border-[var(--accent)] bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
        >
          처음으로
        </Link>
      </div>
    );
  }

  const { percentages, type, info } = result;

  return (
    <div
      className="flex min-h-screen flex-col items-center px-4 py-12"
      style={{ background: "var(--background)" }}
    >
      <h1 className="font-editorial mb-2 text-xl font-semibold text-[var(--foreground)]">
        당신의 MBTI
      </h1>
      <p
        className="font-editorial mb-6 text-3xl font-bold tracking-[0.2em]"
        style={{ color: "var(--accent)" }}
      >
        {type}
      </p>
      <p className="font-editorial mb-1 text-base font-semibold text-[var(--foreground)]">
        {info.name}
      </p>
      <p className="mb-10 max-w-md text-center text-sm leading-relaxed text-[var(--muted)]">
        {info.description}
      </p>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
        4가지 지표 분포
      </h2>
      <ResultChart percentages={percentages} />
      <Link
        href="/"
        className="mt-10 rounded border border-[var(--accent)] bg-[var(--accent)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--accent-hover)]"
      >
        다시 하기
      </Link>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-screen items-center justify-center"
          style={{ background: "var(--background)" }}
        >
          <p className="text-[var(--muted)]">결과를 불러오는 중...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
