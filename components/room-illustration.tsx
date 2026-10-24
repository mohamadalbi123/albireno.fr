export function RoomIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`room-art ${compact ? "compact" : ""}`}>
      <svg
        viewBox="0 0 600 540"
        role="img"
        aria-label="Illustration architecturale d’un intérieur en cours d’aménagement, et non une réalisation de Luna Plâtrerie"
      >
        <defs>
          <pattern
            id="grid"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M26 0H0V26"
              fill="none"
              stroke="#c8c6bc"
              strokeWidth=".5"
              opacity=".45"
            />
          </pattern>
          <linearGradient id="floor" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#e5dfd2" />
            <stop offset="1" stopColor="#d3cabb" />
          </linearGradient>
          <linearGradient id="wall" x1="0" x2="1">
            <stop stopColor="#faf9f6" />
            <stop offset="1" stopColor="#ede9df" />
          </linearGradient>
          <filter id="shadow">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        <rect width="600" height="540" fill="url(#grid)" />
        <ellipse
          cx="309"
          cy="440"
          rx="220"
          ry="40"
          fill="#7d817d"
          opacity=".15"
          filter="url(#shadow)"
        />
        <g stroke="#253e4a" strokeWidth="1.2" strokeLinejoin="round">
          <path d="m75 346 218 112 237-132-219-108Z" fill="url(#floor)" />
          <path d="m75 346 218 112v13L75 360Z" fill="#b7b09f" />
          <path d="m293 458 237-132v14L293 471Z" fill="#a19b8f" />
          <path d="M75 346V142L311 25v193Z" fill="url(#wall)" />
          <path d="M311 25 530 137v189L311 218Z" fill="#e3e0d6" />
          <path d="m75 142 9 5L320 30l-9-5Z" fill="#fff" />
          <path d="m311 25 219 112-8 5L303 30Z" fill="#fff" />
          <path d="m113 159 76-38v113l-76 38Z" fill="#dbe7e7" />
          <path d="m121 163 60-30v94l-60 30Z" fill="#c6d9da" />
          <path
            d="m151 148 1 94m-31-39 60-30"
            stroke="#f9faf8"
            strokeWidth="6"
          />
          <path d="m113 272 9 5 76-39-9-4Z" fill="#fff" />
          <path d="m371 99 104 53v94l-104-53Z" fill="#d1d2c6" />
          <path d="m379 113 87 45v76l-87-44Z" fill="#e8e9df" />
          <path d="m424 136 0 75" stroke="#fff" strokeWidth="5" />
          <path d="m262 243 12-6 117 60-12 7Z" fill="#fff" />
          <path d="m262 243 117 61v132l-117-60Z" fill="#f9f7f0" />
          <path d="m379 304 12-7v132l-12 7Z" fill="#c6c1b5" />
          <path
            d="m286 272 69 36v112l-16-8v-95l-37-19v95l-16-8Z"
            fill="#e7e3d8"
          />
          <path d="m306 298 0 95 33 17v-93Z" fill="#c9c4b8" />
          <path
            d="M228 69v190m-64-158v43m64 35-39 20M84 285l178-88"
            stroke="#c8c6bc"
            strokeDasharray="4 5"
          />
          <path d="m432 286 37 18-20 76-37-19Z" fill="#e2a375" />
          <path d="m443 281 36 18-20 76-10 5 20-76-37-18Z" fill="#c77b4d" />
          <path d="m110 325 79-39 54 28-79 41Z" fill="#f4f1e8" />
          <path
            d="m110 325 54 30v7l-54-30Zm54 30 79-41v7l-79 41Z"
            fill="#d7d2c6"
          />
          <path d="m164 362 0 32m69-68v28m-114-17v31" strokeWidth="4" />
          <path d="m140 323 37-18 24 13-37 18Z" fill="#fff" stroke="#b4c1be" />
          <path d="m151 322 15 8 21-11m-16-12v14" stroke="#72948e" />
        </g>
        <g fill="none" stroke="#7d918f" strokeWidth="1">
          <path d="m53 369 235 121m20-1 246-138M52 363v13m236 108v12m19-13v12m246-149v12" />
          <path d="M52 142v202m-5-202h10m-10 202h10" />
        </g>
        <g
          fill="#6b7d79"
          fontFamily="sans-serif"
          fontSize="10"
          letterSpacing="2"
        >
          <text x="142" y="440" transform="rotate(27 142 440)">
            VOTRE NOUVEL ESPACE
          </text>
          <text x="362" y="470" transform="rotate(-29 362 470)">
            PENSÉ POUR VOUS
          </text>
        </g>
      </svg>
      <span className="art-tag">
        <span />
        L’intérieur prend forme.
      </span>
      <span className="art-caption">
        Illustration d’aménagement · Photo de chantier à venir
      </span>
    </div>
  );
}
