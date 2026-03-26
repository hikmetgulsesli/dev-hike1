import { describe, it, expect } from 'vitest';
import { 
  projects, 
  blogPosts, 
  author, 
  experiences, 
  skills, 
  categories 
} from './data';

describe('Data Layer', () => {
  describe('author', () => {
    it('has required fields', () => {
      expect(author.id).toBeDefined();
      expect(author.name).toBe('Hikmet Güleşli');
      expect(author.avatar).toBeDefined();
      expect(author.title).toBeDefined();
      expect(author.bio).toBeDefined();
      expect(author.social).toBeDefined();
      expect(author.social.github).toBeDefined();
      expect(author.social.linkedin).toBeDefined();
    });
  });

  describe('projects', () => {
    it('contains published projects', () => {
      const publishedProjects = projects.filter(p => p.status === 'published');
      expect(publishedProjects.length).toBeGreaterThan(0);
    });

    it('has valid slug for each project', () => {
      projects.forEach(project => {
        expect(project.slug).toBeDefined();
        expect(typeof project.slug).toBe('string');
        expect(project.slug.length).toBeGreaterThan(0);
      });
    });

    it('has required fields for each project', () => {
      projects.forEach(project => {
        expect(project.id).toBeDefined();
        expect(project.title).toBeDefined();
        expect(project.description).toBeDefined();
        expect(project.shortDescription).toBeDefined();
        expect(project.thumbnail).toBeDefined();
        expect(project.category).toBeDefined();
        expect(['web', 'mobile', 'open-source', 'freelance']).toContain(project.category);
        expect(project.techStack).toBeDefined();
        expect(Array.isArray(project.techStack)).toBe(true);
        expect(project.featured).toBeDefined();
        expect(typeof project.featured).toBe('boolean');
        expect(project.publishedAt).toBeDefined();
        expect(project.status).toBeDefined();
      });
    });

    it('featured projects have valid featured flag', () => {
      const featuredProjects = projects.filter(p => p.featured);
      featuredProjects.forEach(project => {
        expect(project.featured).toBe(true);
      });
    });
  });

  describe('blogPosts', () => {
    it('contains published posts', () => {
      const publishedPosts = blogPosts.filter(p => p.status === 'published');
      expect(publishedPosts.length).toBeGreaterThan(0);
    });

    it('has valid slug for each post', () => {
      blogPosts.forEach(post => {
        expect(post.slug).toBeDefined();
        expect(typeof post.slug).toBe('string');
      });
    });

    it('has required fields for each post', () => {
      blogPosts.forEach(post => {
        expect(post.id).toBeDefined();
        expect(post.title).toBeDefined();
        expect(post.excerpt).toBeDefined();
        expect(post.category).toBeDefined();
        expect(['teknik', 'kariyer', 'kisisel', 'tutorial', 'tasarim']).toContain(post.category);
        expect(post.tags).toBeDefined();
        expect(Array.isArray(post.tags)).toBe(true);
        expect(post.readTime).toBeGreaterThan(0);
        expect(post.author).toBeDefined();
        expect(post.featured).toBeDefined();
        expect(post.pinned).toBeDefined();
      });
    });

    it('all posts reference the author', () => {
      blogPosts.forEach(post => {
        expect(post.author.id).toBe(author.id);
      });
    });
  });

  describe('experiences', () => {
    it('contains experience entries', () => {
      expect(experiences.length).toBeGreaterThan(0);
    });

    it('has required fields for each experience', () => {
      experiences.forEach(exp => {
        expect(exp.id).toBeDefined();
        expect(exp.title).toBeDefined();
        expect(exp.company).toBeDefined();
        expect(exp.startDate).toBeDefined();
        expect(exp.current).toBeDefined();
        expect(typeof exp.current).toBe('boolean');
        expect(exp.type).toBeDefined();
      });
    });

    it('current experience has no endDate', () => {
      const currentExp = experiences.find(exp => exp.current);
      if (currentExp) {
        expect(currentExp.endDate).toBeUndefined();
      }
    });
  });

  describe('skills', () => {
    it('contains skill entries', () => {
      expect(skills.length).toBeGreaterThan(0);
    });

    it('has required fields for each skill', () => {
      skills.forEach(skill => {
        expect(skill.id).toBeDefined();
        expect(skill.name).toBeDefined();
        expect(skill.category).toBeDefined();
        expect(['frontend', 'backend', 'database', 'devops', 'mobile', 'design', 'soft-skills']).toContain(skill.category);
      });
    });

    it('skills with proficiency are between 0 and 100', () => {
      skills.forEach(skill => {
        if (skill.proficiency !== undefined) {
          expect(skill.proficiency).toBeGreaterThanOrEqual(0);
          expect(skill.proficiency).toBeLessThanOrEqual(100);
        }
      });
    });

    it('has skills in all main categories', () => {
      const categories = [...new Set(skills.map(s => s.category))];
      expect(categories).toContain('frontend');
      expect(categories).toContain('backend');
    });
  });

  describe('categories', () => {
    it('contains blog categories', () => {
      expect(categories.length).toBeGreaterThan(0);
    });

    it('each category has required fields', () => {
      categories.forEach(cat => {
        expect(cat.category).toBeDefined();
        expect(cat.label).toBeDefined();
        expect(cat.count).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
