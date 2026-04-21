// successData.js — data for the /success page
// Each section maps to a tab. Each item has: title, description, images[]

export const successData = {
  achievements: [
    {
      id: 'a1',
      title: 'Winner at Microsoft Imagine Cup (India Round)',
      description:
        'Led a cross-functional team to build an AI-powered platform that won at Microsoft\'s flagship student competition. Responsible for product vision, pitch deck, and live demo — competed against 200+ teams nationwide.',
      images: ['/winner at microsoft.jpg', '/pfp.jpg'],
    },
    {
      id: 'a2',
      title: 'Featured in Hindustan Times',
      description:
        'Got media coverage in Hindustan Times for entrepreneurial work in the education-tech space, spotlighting InTheBox\'s early traction and vision to democratise practical learning for Indian students.',
      images: ['/featured in hindustan times.jpg'],
    },
    {
      id: 'a3',
      title: 'Registered My Startup at 18',
      description:
        'Formally registered InTheBox Pvt. Ltd. as a legal entity while still in college — navigating company registration, compliance, and early fundraising conversations as a first-time founder.',
      images: ['/registered my startup.jpg', '/entrepunarship journey.jpg'],
    },
    {
      id: 'a4',
      title: 'Entrepreneurship Journey',
      description:
        'A continuous pursuit of building real products from scratch — from ideation and validation to team-building and shipping. Every milestone shaped my conviction that builders change the world.',
      images: ['/entrepunarship journey.jpg', '/InTheBox founder.jpg'],
    },
  ],

  awards: [
    {
      id: 'aw1',
      title: 'TiE-U Entrepreneurship Recognition',
      description:
        'Selected by TiE (The Indus Entrepreneurs) for their university program — one of few students recognised for demonstrating exceptional entrepreneurial potential and early traction with a real product.',
      images: ['/tieU.jpg'],
    },
    {
      id: 'aw2',
      title: 'InTheBox Founder Recognition',
      description:
        'Acknowledged as the founding force behind InTheBox — the platform designed to accelerate learning through hands-on, project-based pathways. Led product, community, and early partnerships.',
      images: ['/InTheBox founder.jpg', '/ITB Reg..jpg'],
    },
    {
      id: 'aw3',
      title: 'ITB Registration Launch',
      description:
        'Marked the official registration and public launch of InTheBox — a milestone that translated months of ground-level work, user research, and prototype iterations into a live, incorporated product.',
      images: ['/ITB Reg..jpg', '/registered my startup.jpg'],
    },
  ],

  certificates: [
    {
      id: 'c1',
      title: 'ACM Chapter — Marketing Head',
      description:
        'Served as Marketing Head for the ACM student chapter, driving outreach campaigns, technical event branding, and community engagement initiatives that grew membership by over 40% during tenure.',
      images: ['/ACM Marketing Head.jpg'],
    },
    {
      id: 'c2',
      title: 'Devlearn — Founding Member',
      description:
        'One of the original founding members of Devlearn — a peer-driven learning community. Helped define curriculum tracks, onboard early contributors, and scale the community from 0 to its first 500 members.',
      images: ['/Devlearn Founding Member.jpg'],
    },
    {
      id: 'c3',
      title: 'HQ — Mentor',
      description:
        'Served as a mentor on the HQ platform, guiding early-stage student entrepreneurs through product discovery, go-to-market strategy, and founder mindset workshops.',
      images: ['/HQ Mentor.jpg'],
    },
  ],

  letters: [
    {
      id: 'l1',
      title: 'InTheBox — Founder\'s Letter',
      description:
        'A personal note to the earliest InTheBox community members, outlining the mission, the "why" behind building the platform, and a commitment to shipping products that create real career outcomes for students.',
      images: ['/InTheBox founder.jpg', '/entrepunarship journey.jpg'],
    },
    {
      id: 'l2',
      title: 'Startup Registration — Official Record',
      description:
        'The official certificate of incorporation for InTheBox Pvt. Ltd. — a landmark document representing the formal beginning of the entrepreneurial chapter, obtained after months of legal and financial groundwork.',
      images: ['/registered my startup.jpg', '/ITB Reg..jpg'],
    },
  ],
}

export const TAB_LABELS = [
  { key: 'achievements', label: 'Achievements' },
  { key: 'awards',       label: 'Awards'        },
  { key: 'certificates', label: 'Certificates'  },
  { key: 'letters',      label: 'Letters'       },
]
