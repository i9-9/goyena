import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
});

// Tipos básicos para imágenes y proyectos
export type ContentfulImage = {
  url: string;
  width: number;
  height: number;
  title: string;
  description?: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string[];
  mainImage: ContentfulImage;
  images: ContentfulImage[];
  order: number;
};

export type ProjectCollection = {
  items: Project[];
  total: number;
};

// Tipos para las respuestas de Contentful
interface ContentfulImageFields {
  title?: string;
  description?: string;
  file?: {
    url?: string;
    details?: {
      image?: {
        width: number;
        height: number;
      };
    };
  };
}

interface ContentfulImageAsset {
  fields: ContentfulImageFields;
}

interface ContentfulProjectFields {
  title?: string;
  slug?: string;
  description?: string;
  category?: string[];
  mainImage?: ContentfulImageAsset;
  images?: ContentfulImageAsset[];
  order?: number;
}

interface ContentfulProjectEntry {
  sys: {
    id: string;
  };
  fields: ContentfulProjectFields;
}

interface ContentfulEntries {
  items: ContentfulProjectEntry[];
  total?: number;
}

// Imagen por defecto en caso de que no exista
const defaultImage: ContentfulImage = {
  url: '/placeholder.jpg',
  width: 800,
  height: 600,
  title: 'Placeholder Image',
  description: 'This is a placeholder image',
};

// Función para parsear las entradas de proyectos
function parseProjectEntries(entries: ContentfulEntries): Project[] {
  if (!entries || !entries.items) return [];
  
  return entries.items.map((item: ContentfulProjectEntry) => parseProjectEntry(item));
}

// Función para parsear una entrada de proyecto
function parseProjectEntry(entry: ContentfulProjectEntry): Project {
  const fields = entry.fields;
  
  // Extraer y formatear la imagen principal
  const mainImage = fields.mainImage?.fields ? {
    url: 'https:' + (fields.mainImage.fields.file?.url || ''),
    width: fields.mainImage.fields.file?.details?.image?.width || 800,
    height: fields.mainImage.fields.file?.details?.image?.height || 600,
    title: fields.mainImage.fields.title || 'Project Image',
    description: fields.mainImage.fields.description || ''
  } : defaultImage;
  
  // Extraer y formatear las imágenes adicionales
  const images = fields.images?.map((img: ContentfulImageAsset) => ({
    url: 'https:' + (img.fields.file?.url || ''),
    width: img.fields.file?.details?.image?.width || 800,
    height: img.fields.file?.details?.image?.height || 600,
    title: img.fields.title || 'Project Image',
    description: img.fields.description || ''
  })) || [];
  
  return {
    id: entry.sys.id || '',
    title: fields.title || 'Untitled Project',
    slug: fields.slug || '',
    description: fields.description || '',
    category: fields.category || [],
    mainImage,
    images,
    order: fields.order || 0
  };
}

// Obtener todos los proyectos
export async function getAllProjects(): Promise<Project[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'project',
      order: ['fields.order']
    });
    
    return parseProjectEntries(entries as unknown as ContentfulEntries);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Obtener un proyecto por su slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const entries = await client.getEntries({
      content_type: 'project',
      'fields.slug': slug,
      limit: 1
    });
    
    const projects = parseProjectEntries(entries as unknown as ContentfulEntries);
    return projects.length > 0 ? projects[0] : null;
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    return null;
  }
}

// Obtener proyectos por categoría
export async function getProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const entries = await client.getEntries({
      content_type: 'project',
      'fields.category': category,
      order: ['fields.order']
    });
    
    return parseProjectEntries(entries as unknown as ContentfulEntries);
  } catch (error) {
    console.error(`Error fetching projects in category ${category}:`, error);
    return [];
  }
}

// Obtener todas las categorías únicas de los proyectos
export async function getAllCategories(): Promise<string[]> {
  try {
    const projects = await getAllProjects();
    const categoriesSet = new Set<string>();
    
    projects.forEach(project => {
      project.category.forEach(cat => categoriesSet.add(cat));
    });
    
    return Array.from(categoriesSet);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
} 