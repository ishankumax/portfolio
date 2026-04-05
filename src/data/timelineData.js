// ============================================================================
// SHARED DATA: timelineData
// ----------------------------------------------------------------------------
// Single source of truth for all experience/timeline entries.
// Each item has a `slug` for anchor-based deep linking on /experience page.
// ============================================================================

export const timelineData = [
  {
    year: '2026',
    items: [
      {
        id: 'cmo-inthebox',
        slug: 'chief-marketing-officer',
        role: 'Chief Marketing Officer',
        company: 'InTheBox',
        date: 'NOV 2024 - PRESENT',
        images: [
          { src: '/InTheBox founder.jpg', caption: 'InTheBox Founder' },
          { src: '/ITB Reg..jpg', caption: 'Registered My Startup' },
          { src: '/entrepunarship journey.jpg', caption: 'Entrepreneurship Journey' },
          { src: '/featured in hindustan times.jpg', caption: 'Featured in Hindustan Times' },
          { src: '/tieU.jpg', caption: 'National Winner at TiE U' }
        ],
        bullets: [
          'Driving innovation and packaging excellence',
          'Focusing on quality and sustainability',
          'Delivering customer-centric solutions'
        ]
      },
      {
        id: 'harvard-ylc',
        slug: 'harvard-ylc-coordinator',
        role: 'Harvard YLC Coordinator',
        company: 'Chitkara University',
        date: 'Jan 2026',
        images: [
          { src: '/pfp.jpg', caption: 'At the Event' },
          { src: '/banner.jpg', caption: 'YLC Coordination' }
        ],
        bullets: [
          'Driving innovation and packaging excellence',
          'Focusing on quality and sustainability',
          'Delivering customer-centric solutions'
        ]
      },
    ]
  },
  {
    year: '2025',
    items: [
      {
        id: 'head-marketing-acm',
        slug: 'head-of-marketing',
        role: 'Head of Marketing',
        company: 'ACM Student Chapter',
        date: 'NOV 2024 - JUL 2025',
        images: [
          { src: '/ACM Marketing Head.jpg', caption: 'ACM Marketing Head' },
          { src: '/pfp.jpg', caption: 'Leading the Team' },
          { src: '/banner.jpg', caption: 'Lady Ada Event' }
        ],
        bullets: [
          'Organised Annual ACM-W India Lady Ada',
          'Managed Lady Ada Facilitation'
        ]
      },
      {
        id: 'ecosystem-mgr-devlearn',
        slug: 'ecosystem-manager',
        role: 'Ecosystem Manager',
        company: 'DevLearn',
        date: 'MAY 2024 - FEB 2025',
        images: [
          { src: '/Devlearn Founding Member.jpg', caption: 'Founding Member' },
          { src: '/HQ Mentor.jpg', caption: 'HQ Mentorship' },
          { src: '/workspace-1.jpg', caption: 'Co Learning Camp' }
        ],
        bullets: [
          'Managed community and ecosystem',
          'Organised the Co Learning Camp',
          'Handled event and operations management'
        ]
      },
      {
        id: 'graphics-exec-cb',
        slug: 'graphics-exec',
        role: 'Graphics Exec.',
        company: 'Coding Blocks',
        date: 'DEC 2023 - MAY 2025',
        images: [
          { src: '/winner at microsoft.jpg', caption: 'Winner at Microsoft' },
          { src: '/workspace-2.jpg', caption: 'Web3 Hackathon' },
          { src: '/lapinlaptop.jpg', caption: 'Design Work' }
        ],
        bullets: [
          "Organised India's biggest Web3 Hackathon",
          'Honoured for graphic design and web design'
        ]
      }
    ]
  },
  {
    year: '2024',
    items: [
      {
        id: 'marketing-exec-acm',
        slug: 'marketing-exec',
        role: 'Marketing Exec.',
        company: 'ACM Student Chapter',
        date: 'SEP 2024 - NOV 2024',
        images: [
          { src: '/ACM Marketing Head.jpg', caption: 'ISCCSC Event' },
          { src: '/banner.jpg', caption: 'Student Outreach' }
        ],
        bullets: [
          'Organised ISCCSC',
          'Organised 1st ICSCCS',
          'Managed marketing and student outreach'
        ]
      },
      {
        id: 'campus-amb-kotlin',
        slug: 'campus-ambassador',
        role: 'Campus Ambassador',
        company: 'Kotlin Delhi',
        date: 'JUN 2024 - JUL 2024',
        images: [
          { src: '/delhi-train.png', caption: 'KotlinConf Delhi' },
          { src: '/workspace-1.jpg', caption: 'Campus Outreach' }
        ],
        bullets: [
          'Promoted KotlinConfDelhi',
          'Managed selection mails and outreach'
        ]
      },
      {
        id: 'design-branding-gfg',
        slug: 'design-and-branding',
        role: 'Design & Branding',
        company: 'GFG CUIET',
        date: 'JAN 2024 - JUL 2024',
        images: [
          { src: '/workspace-2.jpg', caption: 'Branding Work' },
          { src: '/lapinlaptop.jpg', caption: 'Design Sessions' }
        ],
        bullets: [
          'Managed branding for 23-24 Team',
          'Led group photo graphic design'
        ]
      },
      {
        id: 'graphics-head-devlearn',
        slug: 'graphics-head',
        role: 'Graphics Head',
        company: 'DevLearn',
        date: 'FEB 2024 - MAY 2024',
        images: [
          { src: '/Devlearn Founding Member.jpg', caption: 'Leading Design' },
          { src: '/HQ Mentor.jpg', caption: 'Team Mentoring' },
          { src: '/workspace-1.jpg', caption: 'Web Design' }
        ],
        bullets: [
          'Led graphic design team',
          'Managed web design initiatives'
        ]
      },
      {
        id: 'outreach-exec-cn',
        slug: 'outreach-exec',
        role: 'Outreach Exec.',
        company: 'Coding Ninjas',
        date: 'JAN 2024 - FEB 2024',
        images: [
          { src: '/jaipur-.png', caption: 'Utkrishti 2024' },
          { src: '/delhi-train.png', caption: 'Outreach Drive' }
        ],
        bullets: [
          'Managed outreach for Utkrishti 2024',
          'Led student outreach initiatives'
        ]
      }
    ]
  },
  {
    year: '2023',
    items: [
      {
        id: 'graphics-exec-devlearn',
        slug: 'graphics-exec-devlearn',
        role: 'Graphics Exec.',
        company: 'DevLearn',
        date: 'NOV 2023 - FEB 2024',
        images: [
          { src: '/Devlearn Founding Member.jpg', caption: 'Community Design' },
          { src: '/workspace-2.jpg', caption: 'Visual Identity' }
        ],
        bullets: [
          'Executed remote graphic design tasks',
          'Supported community visual identity'
        ]
      }
    ]
  }
];

// ============================================================================
// MAPPING: Story cards → Experience slugs
// ----------------------------------------------------------------------------
// Maps "Writing My Story" card labels to their corresponding experience slug
// for deep-linking from the homepage cards to the experience page.
// ============================================================================
export const storyToExperienceMap = {
  'InTheBox Founder': 'chief-marketing-officer',
  'Registered My Startup': 'chief-marketing-officer',
  'National Winner at TiE U': 'chief-marketing-officer',
  'Winner at Microsoft': 'graphics-exec',
  'Featured in Hindustan Times': 'chief-marketing-officer',
  'Entrepreneurship Journey': 'chief-marketing-officer',
  'HQ Mentor': 'ecosystem-manager',
  'Devlearn Founding Member': 'ecosystem-manager',
  'ACM Marketing Head': 'head-of-marketing',
};
