"use client";

/**
 * ResultChart.tsx - 4가지 지표(E/I, N/S, T/F, J/P) 막대 시각화
 *
 * 각 행: 왼쪽 문자 — 막대 — 오른쪽 문자
 * 막대는 왼쪽 문자 비율만큼 채워지고, 나머지는 오른쪽
 */

import type { DimensionPercentages } from "@/shared/utils/calculate-mbti";

const DIMENSIONS: {
  key: keyof DimensionPercentages;
  left: string;
  right: string;
}[] = [
  { key: "EI", left: "E", right: "I" },
  { key: "SN", left: "N", right: "S" },
  { key: "TF", left: "T", right: "F" },
  { key: "JP", left: "J", right: "P" },
];

export interface ResultChartProps {
  /** 지표별 퍼센트 (왼쪽 문자 기준 0~100) */
  percentages: DimensionPercentages;
}

export function ResultChart({ percentages }: ResultChartProps) {
  return (
    <div className="w-full max-w-md space-y-5">
      {DIMENSIONS.map(({ key, left, right }) => {
        const leftPct = percentages[key];
        const rightPct = 100 - leftPct;
        return (
          <div key={key} className="space-y-1.5">
            <div className="flex justify-between text-sm font-medium text-zinc-600">
              <span className={leftPct >= 50 ? "text-amber-700" : ""}>
                {left}
              </span>
              <span className={rightPct > 50 ? "text-amber-700" : ""}>
                {right}
              </span>
            </div>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-200">
              <div
                className="h-full rounded-l-full bg-amber-500 transition-all duration-500 ease-out"
                style={{ width: `${leftPct}%` }}
              />
              <div
                className="h-full rounded-r-full bg-amber-300/80 transition-all duration-500 ease-out"
                style={{ width: `${rightPct}%` }}
              />
            </div>
            <p className="text-center text-xs text-zinc-500">
              {leftPct}% : {rightPct}%
            </p>
          </div>
        );
      })}
    </div>
  );
}
