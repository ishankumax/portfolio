import PageHeader from './ui/PageHeader'
import { useContent } from '../ContentContext'
import ReactMarkdown from 'react-markdown'
import EditableText from './admin/EditableText'

const defaultAboutText = `i'm ishankumax,\n\ni'm driven by how ideas become movements — not just products or posts, but real-world momentum that pulls people in.\n\ni live at the intersection of **community, creation, and tech** — not as separate lanes but as overlapping ways of shaping what matters. over time, that's pulled me into **building things like InTheBox**, mentoring teams, organizing meetups, and helping others find their wings before the world tells them to be "ready."\n\ni didn't start with a polished plan or a neat business blueprint. i just started doing in form of launching projects, spearheading campus tech communities, running events, and sharing every messy, exhilarating step of the journey publicly. what i learned fast is this: people don't connect most with *perfection*. they connect with **progress**. they connect with the person showing up, figuring it out, and inviting others to build alongside them.\n\nthat insight didn't just inform how i work , it shaped why i work. what matters to me isn't chasing scale or awards for their own sake. it's growing a space where **learning, experimentation, and real relationships** are the currency. where failure is data and iteration is celebration.\n\nmy vision for what i create isn't about ticking boxes. it's about making room for ideas that feel too early, too weird, too unformed, and giving them the time to become something people care about.\n\ni won't claim to have it all figured out. i'm still learning, still testing, still rethinking. but i'm serious about **the direction i'm heading** and about **shipping work instead of preparing forever**.\n\nthis space will evolve as i do. let's see how far it stretches.\nif you're here, it probably means you believe in building with purpose too. i'm glad you found your way here.\n\n— ishankumax, curious and relentless`

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
            <EditableText 
              as="div" 
              id="about_body" 
              section="about" 
              defaultText={defaultAboutText}
              renderAsMarkdown={true}
              className="w-full"
            />
          </div>
        </article>

    </div>
  )
}

export default About
