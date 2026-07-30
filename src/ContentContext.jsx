/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBlogs, getLinks, getContentDocument, updateContentDocument } from './lib/db';

// Import static data as fallback
import heroData from './data/content/hero.json';
import aboutData from './data/content/about.json';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({
    hero: heroData,
    about: aboutData
  });
  const [blogs, setBlogs] = useState([]);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch dynamic content
      const [dbLinks, dbBlogs, dbHero, dbAbout] = await Promise.all([
        getLinks(),
        getBlogs(),
        getContentDocument('hero'),
        getContentDocument('about')
      ]);

      setLinks(dbLinks || []);
      setBlogs(dbBlogs || []);
      
      setContent(prev => {
        const h = { ...prev.hero, ...(dbHero || {}) };
        if (typeof h.description === 'string' && h.description.includes('20-year-old')) {
          h.description = h.description.replace(/20-year-old/g, '21-year-old');
        }
        return {
          ...prev,
          hero: h,
          about: { ...prev.about, ...(dbAbout || {}) }
        };
      });
    } catch (error) {
      console.error('Error fetching content:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const handle = setTimeout(() => {
      fetchData();
    }, 0);
    return () => clearTimeout(handle);
  }, []);

  const getContent = (key, defaultValue = '') => {
    if (content[key]) return content[key];

    if (key.includes('_')) {
      const [section, ...fieldParts] = key.split('_');
      const field = fieldParts.join('_');
      if (content[section]?.[field]) return content[section][field];
    }

    if (key.includes('.')) {
      const [section, field] = key.split('.');
      return content[section]?.[field] || defaultValue;
    }
    
    return defaultValue;
  };

  const getLinksByCategory = (category) => {
    return links.filter(link => link.category === category);
  };

  const updateContentField = async (section, field, value) => {
    // Optimistic UI Update
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    // Save to Firestore
    try {
      await updateContentDocument(section, { [field]: value });
    } catch (error) {
      console.error(`Failed to update ${section}.${field}:`, error);
      // Optional: Revert on error
    }
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      blogs, 
      links, 
      loading, 
      getContent,
      getLinksByCategory,
      updateContentField,
      refreshContent: fetchData
    }}>
      {children}
    </ContentContext.Provider>
  );
};
