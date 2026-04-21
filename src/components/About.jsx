import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen text-white font-mono">
      <div className="max-w-5xl mx-auto px-6 pt-4 md:pt-0 pb-12 md:pb-20">

        {/* Header */}
        <div className="success-header">
          <p className="success-header__eyebrow">portfolio / about</p>
          <h1 className="success-header__title">the founder's note<span className="success-header__cursor">_</span></h1>
          <p className="success-header__sub">who i am, why i build, and what drives me forward.</p>
        </div>

        {/* The Founder's Note */}
        <article className="border-2 rounded-lg p-8 md:p-12 transition-all duration-300" style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-card)' }}>

          <div className="space-y-6 leading-relaxed text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
            
            <p className="italic">i'm ishankumax,</p>

            <p>
              i'm driven by how ideas become movements — not just products or posts, but 
              real-world momentum that pulls people in.
            </p>

            <p>
              i live at the intersection of <strong className="text-[color:var(--text-primary)]">community, creation, and tech</strong> — not as separate 
              lanes but as overlapping ways of shaping what matters. over time, that's 
              pulled me into <strong className="text-[color:var(--text-primary)]">building things like InTheBox</strong>, mentoring teams, organizing 
              meetups, and helping others find their wings before the world tells them to 
              be "ready."
            </p>

            <p>
              i didn't start with a polished plan or a neat business blueprint. i just started 
              doing in form of launching projects, spearheading campus tech communities, 
              running events, and sharing every messy, exhilarating step of the journey 
              publicly. what i learned fast is this: people don't connect most with 
              <em className="italic"> perfection</em>. they connect with <strong className="text-[color:var(--text-primary)]">progress</strong>. they connect with the person 
              showing up, figuring it out, and inviting others to build alongside them.
            </p>

            <div className="space-y-6">
              <p>
                that insight didn't just inform how i work , it shaped why i work. what 
                matters to me isn't chasing scale or awards for their own sake. it's growing a 
                space where <strong className="text-[color:var(--text-primary)]">learning, experimentation, and real relationships</strong> are the 
                currency. where failure is data and iteration is celebration.
              </p>

              <p>
                my vision for what i create isn't about ticking boxes. it's about making room 
                for ideas that feel too early, too weird, too unformed, and giving them the 
                time to become something people care about.
              </p>

              <p>
                i won't claim to have it all figured out. i'm still learning, still testing, still 
                rethinking. but i'm serious about <strong className="text-[color:var(--text-primary)]">the direction i'm heading</strong> and about <strong className="text-[color:var(--text-primary)]">shipping 
                work instead of preparing forever</strong>.
              </p>

              <p>
                this space will evolve as i do. let's see how far it stretches.<br />
                if you're here, it probably means you believe in building with purpose too. i'm 
                glad you found your way here.
              </p>
            </div>

            <p className="mt-10 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              — ishankumax, curious and relentless
            </p>

          </div>
        </article>

      </div>
    </div>
  )
}

export default About
