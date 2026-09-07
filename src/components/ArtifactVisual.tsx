import { ArrowUpRight } from "lucide-react";

export default function ArtifactVisual({
  index,
  link = false,
}: {
  index: number;
  link?: boolean;
}) {
  return (
    <div
      className={`artifact-visual artifact-visual-${index}`}
      aria-hidden="true"
    >
      <span className="artifact-index">FIG. 0{index + 1}</span>
      <svg viewBox="0 0 400 250" fill="none">
        {index === 0 && (
          <g stroke="currentColor">
            <path d="M200 36 294 88v96l-94 52-94-52V88Z" />
            <path
              d="m106 88 94 52 94-52M200 140v96M200 36v104M106 184l94-44 94 44"
              strokeDasharray="3 6"
            />
            <circle cx="200" cy="140" r="7" fill="currentColor" />
            {[0, 1, 2, 3].map((n) => (
              <path
                key={n}
                d={`M${125 + n * 19} ${99 + n * 10.5}v96`}
                opacity=".3"
              />
            ))}
          </g>
        )}
        {index === 1 && (
          <g stroke="currentColor">
            {[0, 1, 2, 3, 4].map((n) => (
              <rect
                key={n}
                x={125 + n * 12}
                y={50 + n * 12}
                width={150 - n * 24}
                height={150 - n * 24}
                rx="4"
                opacity={0.2 + n * 0.16}
              />
            ))}
            {Array.from({ length: 11 }, (_, n) => (
              <path
                key={n}
                d={`M${140 + n * 12} 34v16m0 150v16M109 ${65 + n * 12}h16m150 0h16`}
                opacity=".5"
              />
            ))}
            <path d="m185 131 11-22 9 34 10-24" />
          </g>
        )}
        {index === 2 && (
          <g stroke="currentColor">
            {Array.from({ length: 11 }, (_, n) => (
              <ellipse
                key={n}
                cx="200"
                cy={76 + n * 10}
                rx={34 + Math.sin(n * 0.28) * 45}
                ry="22"
                opacity={0.25 + n * 0.065}
              />
            ))}
            <path
              d="M200 31v188M103 181l97 38 97-38"
              strokeDasharray="2 6"
              opacity=".3"
            />
          </g>
        )}
      </svg>
      <span className="artifact-medium">
        {
          ["Perception / Autonomy", "Compute / Inference", "Matter / Making"][
            index
          ]
        }
      </span>
      {link && <ArrowUpRight className="artifact-arrow" size={18} />}
    </div>
  );
}
