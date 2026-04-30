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
        website: 'https://www.inthebox.co.in',
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
        website: 'https://www.chitkara.edu.in/harvard/',
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
        id: 'codex',
        slug: 'codex',
        role: 'CodeX 2.O Mentor',
        company: 'Panipat Institute Of Engineering And Technology',
        website: 'https://www.instagram.com/p/DNVZiGWSIey/',
        date: '12 AUG - 13 AUG',
        images: [
          { src: '/facillitation1.jpg', caption: 'Opening Ceremony' },
          { src: '/PIET Award.jpg', caption: 'Appreciation Award' },
          { src: '/facillitation2.jpg', caption: 'Facilitation Ceremony' },
          { src: '/jaipur-.png', caption: 'Mentors Banner' },
          { src: '/PIET Mentors.jpg', caption: 'Mentors' }
        ],
        bullets: [
          'Mentored 50+ Teams',
          'Worked with 500+ Students'
        ]
      },
      {
        id: 'head-marketing-acm',
        slug: 'head-of-marketing',
        role: 'Head of Marketing',
        company: 'ACM Student Chapter',
        website: 'https://www.acm.org',
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
        id: 'community-mgr-hackquest',
        slug: 'community-manager',
        role: 'Community Manager Intern',
        company: 'HackQuest',
        website: 'https://hackquest.io/',
        date: 'FEB 2025 - MAR 2025',
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
        id: 'ecosystem-mgr-devlearn',
        slug: 'ecosystem-manager',
        role: 'Ecosystem Manager',
        company: 'DevLearn',
        website: 'https://devlearnevent.vercel.app/',
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
        website: 'https://codingblocks.com',
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
        role: 'Core Team Member',
        company: 'Center for Entrepreneurship Education and Development (CEED)',
        website: 'https://www.facebook.com/CUCEED/',
        date: 'NOV 2024 - PRESENT',
        images: [
          { src: '/iim amritsar.jpg', caption: 'IIM Amritsar Event' },
          { src: '/ACM.jpg', caption: 'ACM Lady Ada Event' }
        ],
        bullets: [
          'Organised 1st ICSCCS',
          'Managed SPHERON X APTOS Tour',
          'Managed marketing and student outreach'
        ]
      },
      {
        id: 'marketing-exec-acm',
        slug: 'marketing-exec',
        role: 'Marketing Exec.',
        company: 'ACM Student Chapter',
        website: 'https://www.acm.org',
        date: 'SEP 2024 - NOV 2024',
        images: [
          { src: '/SPHERON.jpg', caption: 'SPHERON Event' },
          { src: '/ACM.jpg', caption: 'ACM Lady Ada Event' }
        ],
        bullets: [
          'Organised 1st ICSCCS',
          'Managed SPHERON X APTOS Tour',
          'Managed marketing and student outreach'
        ]
      },
      {
        id: 'campus-amb-kotlin',
        slug: 'campus-ambassador',
        role: 'Campus Ambassador',
        company: 'Kotlin Delhi',
        website: 'https://kotlinconf.com',
        date: 'JUN 2024 - JUL 2024',
        images: [
          { src: '/delhi-train.png', caption: 'KotlinConf Delhi' },
          { src: '/KOTLIN.jpg', caption: 'Kotlin Ambassadors' }
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
        website: 'https://www.geeksforgeeks.org',
        date: 'JAN 2024 - JUL 2024',
        images: [
          { src: '/gfg.jpeg', caption: 'GFG Team Glimpses' },
          { src: '/GFG CyberSurakhsha.jpeg', caption: 'Cyber Surakhsha' },
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
        website: 'https://devlearnevent.vercel.app/',
        date: 'FEB 2024 - MAY 2024',
        images: [
          { src: '/cube mania.jpeg', caption: 'Cube Mania Event' },
          { src: '/devlearn.jpeg', caption: 'DevLearn Merch' },
          { src: '/DevLearn X DTC.jpeg', caption: 'DevLearn X DTC' }
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
        website: 'https://www.codingninjas.com',
        date: 'JAN 2024 - FEB 2024',
        images: [
          { src: '/CN1.jpg', caption: 'Utkrishti 2024' },
          { src: '/CN2.jpg', caption: 'Outreach Drive' }
        ],
        bullets: [
          'Outreach Drive for Utkrishti 2024',
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
        website: 'https://devlearnevent.vercel.app/',
        date: 'NOV 2023 - FEB 2024',
        images: [
          { src: '/company visit.jpeg', caption: 'Company Visit' },
          { src: '/anchor.jpeg', caption: 'Anchor' },
          { src: '/appwrk.jpeg', caption: 'Appwrk visit' }
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
