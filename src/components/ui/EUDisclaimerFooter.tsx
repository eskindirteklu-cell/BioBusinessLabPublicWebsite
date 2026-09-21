import React from 'react';

/**
 * Official European Union flag graphic emblem badge
 * Features the mandatory blue background with 12 gold stars in a circle
 */
export const EUFlagBadge: React.FC<{ className?: string }> = ({ className = 'w-14 h-9' }) => {
  return (
    <svg
      viewBox="0 0 810 540"
      className={`${className} shrink-0 rounded-sm shadow-xs`}
      aria-label="Official European Union Flag"
      role="img"
    >
      {/* European Union Blue Field */}
      <rect width="810" height="540" fill="#003399" />
      {/* 12 Yellow Stars */}
      <g fill="#FFCC00" transform="translate(405,270)">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const r = 180;
          const x = r * Math.sin(angle);
          const y = -r * Math.cos(angle);
          return (
            <polygon
              key={i}
              points="0,-24 7,-7 24,-7 11,4 16,21 0,10 -16,21 -11,4 -24,-7 -7,-7"
              transform={`translate(${x},${y})`}
            />
          );
        })}
      </g>
    </svg>
  );
};

export const EUDisclaimerFooter: React.FC<{
  disclaimerText?: string;
  projectCode?: string;
}> = ({
  disclaimerText = 'Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Education and Culture Executive Agency (EACEA). Neither the European Union nor EACEA can be held responsible for them.',
  projectCode = 'Project Ref: 2023-1-EL01-KA220-HED-000159428',
}) => {
  return (
    <div
      id="eu-funding-disclaimer-box"
      className="mt-8 pt-8 border-t border-[#007360]/15"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg bg-white border border-[#007360]/10 shadow-xs">
        <EUFlagBadge className="w-16 h-11" />
        <div className="text-xs text-[#333333]/90 leading-relaxed font-normal">
          <div className="font-bold text-[#007360] uppercase tracking-wider text-[10px] mb-0.5">
            Erasmus+ Programme of the European Union • {projectCode}
          </div>
          <p id="eu-disclaimer-verbatim-text">{disclaimerText}</p>
        </div>
      </div>
    </div>
  );
};
