import React from 'react'

/**
 * PageHeader
 * Unified header pattern used across the entire portfolio.
 * Reduces redundant JSX in page components.
 */
const PageHeader = ({ eyebrow, title, sub }) => (
  <header className="page-header">
    <p className="page-header__eyebrow">{eyebrow}</p>
    <h1 className="page-header__title">
      {title}
      <span className="page-header__cursor">_</span>
    </h1>
    {sub && <p className="page-header__sub">{sub}</p>}
  </header>
)

export default PageHeader
