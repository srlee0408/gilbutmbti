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
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-zinc-600">결과를 불러올 수 없습니다.</p>
        <Link
          href="/"
          className="rounded-full bg-amber-500 px-5 py-2 text-sm font-medium text-white hover:bg-amber-600"
        >
          처음으로
        </Link>
      </div>
    );
  }

  const { percentages, type, info } = result;

  return (
    <div className="flex min-h-screen flex-col items-center bg-amber-50/50 px-4 py-10">
      <h1 className="mb-2 text-xl font-bold text-amber-900">당신의 MBTI</h1>
      <p className="mb-8 text-2xl font-bold tracking-widest text-amber-700">
        {type}
      </p>
      <p className="mb-1 text-base font-medium text-zinc-700">{info.name}</p>
      <p className="mb-10 max-w-md text-center text-sm leading-relaxed text-zinc-600">
        {info.description}
      </p>
      <h2 className="mb-4 text-sm font-semibold text-zinc-600">
        4가지 지표 분포
      </h2>
      <ResultChart percentages={percentages} />
      <Link
        href="/"
        className="mt-10 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
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
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-zinc-500">결과를 불러오는 중...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
