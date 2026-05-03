import PageHeader from './ui/PageHeader'
import { useContent } from '../ContentContext'
import ReactMarkdown from 'react-markdown'

function About() {
  const { getContent } = useContent()

  return (
    <div className="relative z-10">
      <PageHeader 
        eyebrow={getContent('about_eyebrow', 'portfolio / about')}
        title={getContent('about_title', "the founder's note")}
        sub={getContent('about_sub', 'who i am, why i build, and what drives me forward.')}
      />

        {/* The Founder's Note */}
        <article className="border-2 rounded-lg p-8 md:p-12 transition-all duration-300" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-card)' }}>
          <div className="space-y-6 leading-relaxed text-sm md:text-base prose prose-invert prose-sm max-w-none font-mono" style={{ color: 'var(--text-secondary)' }}>
            <ReactMarkdown>
              {getContent('about_body', `i'm ishankumax,

i'm driven by how ideas become movements — not just products or posts, but real-world momentum that pulls people in.

i live at the intersection of **community, creation, and tech** — not as separate lanes but as overlapping ways of shaping what matters. over time, that's pulled me into **building things like InTheBox**, mentoring teams, organizing meetups, and helping others find their wings before the world tells them to be "ready."

i didn't start with a polished plan or a neat business blueprint. i just started doing in form of launching projects, spearheading campus tech communities, running events, and sharing every messy, exhilarating step of the journey publicly. what i learned fast is this: people don't connect most with *perfection*. they connect with **progress**. they connect with the person showing up, figuring it out, and inviting others to build alongside them.

that insight didn't just inform how i work , it shaped why i work. what matters to me isn't chasing scale or awards for their own sake. it's growing a space where **learning, experimentation, and real relationships** are the currency. where failure is data and iteration is celebration.

my vision for what i create isn't about ticking boxes. it's about making room for ideas that feel too early, too weird, too unformed, and giving them the time to become something people care about.

i won't claim to have it all figured out. i'm still learning, still testing, still rethinking. but i'm serious about **the direction i'm heading** and about **shipping work instead of preparing forever**.

this space will evolve as i do. let's see how far it stretches.
if you're here, it probably means you believe in building with purpose too. i'm glad you found your way here.

— ishankumax, curious and relentless`)}
            </ReactMarkdown>
          </div>
        </article>

    </div>
  )
}

export default About
