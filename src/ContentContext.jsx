import React, { createContext, useContext, useState, useEffect } from 'react'

// Import static data
import heroData from './data/content/hero.json'
import aboutData from './data/content/about.json'
import linksData from './data/links.json'

const ContentContext = createContext()

export const useContent = () => useContext(ContentContext)

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({
    hero: heroData,
    about: aboutData
  })
  const [blogs, setBlogs] = useState([])
  const [links, setLinks] = useState(linksData.links || [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogs = async () => {
      // Use Vite's glob import to get all markdown blogs
      const blogFiles = import.meta.glob('./data/blogs/*.md', { eager: true, query: '?raw' })
      
      const loadedBlogs = Object.entries(blogFiles).map(([path, module]) => {
        const content = module.default
        // Simple frontmatter parser (assuming Decap CMS format)
        const match = content.match(/^---([\s\S]*?)---([\s\S]*)$/)
        if (!match) return { id: path, body: content }
        
        const yaml = match[1]
        const body = match[2]
        const data = {}
        
        yaml.split('\n').forEach(line => {
          const [key, ...val] = line.split(':')
          if (key && val.length) data[key.trim()] = val.join(':').trim()
        })
        
        return {
          id: path,
          title: data.title || 'Untitled',
          date: data.date,
          excerpt: data.excerpt,
          body: body.trim(),
          tags: data.tags ? data.tags.replace(/[\[\]"]/g, '').split(',') : []
        }
      })

      setBlogs(loadedBlogs.sort((a, b) => new Date(b.date) - new Date(a.date)))
      setLoading(false)
    }

    loadBlogs()
  }, [])

  const getContent = (key, defaultValue = '') => {
    // Try direct access first
    if (content[key]) return content[key]

    // Handle underscore notation (e.g., about_eyebrow -> about.eyebrow)
    if (key.includes('_')) {
      const [section, ...fieldParts] = key.split('_')
      const field = fieldParts.join('_')
      if (content[section]?.[field]) return content[section][field]
    }

    // Handle dot notation
    if (key.includes('.')) {
      const [section, field] = key.split('.')
      return content[section]?.[field] || defaultValue
    }
    
    return defaultValue
  }

  const getLinksByCategory = (category) => {
    return links.filter(link => link.category === category)
  }

  return (
    <ContentContext.Provider value={{ 
      content, 
      blogs, 
      links, 
      loading, 
      getContent,
      getLinksByCategory
    }}>
      {children}
    </ContentContext.Provider>
  )
}
