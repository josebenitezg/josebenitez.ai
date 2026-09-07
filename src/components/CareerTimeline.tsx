import { experience } from "@/lib/experience";

export default function CareerTimeline() {
  return (
    <ol className="career-timeline" aria-label="Professional experience">
      {experience.map((entry) => (
        <li
          key={`${entry.company}-${entry.start}`}
          className="career-entry"
          data-current={entry.end === null ? "true" : undefined}
        >
          <div className="career-period">
            <time dateTime={entry.start}>{entry.start.slice(0, 4)}</time>
            {entry.end === null ? (
              <> — now</>
            ) : entry.end.slice(0, 4) !== entry.start.slice(0, 4) ? (
              <>
                {" — "}
                <time dateTime={entry.end}>{entry.end.slice(0, 4)}</time>
              </>
            ) : null}
          </div>
          <div>
            <h2>{entry.company}</h2>
            <p>{entry.role}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
