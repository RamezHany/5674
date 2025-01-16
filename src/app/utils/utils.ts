import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

export type Team = {
    name: string;
    role: string;
    avatar: string;
    linkedIn: string;
};

type Metadata = {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images: string[];
    tag?: string;
    team: Team[];
};

type ResourceMetadata = {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    type: 'pdf' | 'video' | 'link';
    downloadUrl: string;
    tag?: string;
};

export type Resource = {
    slug: string;
    source: matter.GrayMatterFile<string>;
    metadata: ResourceMetadata;
};

export function getMDXFiles(dir: string): string[] {
    try {
        if (!existsSync(dir)) {
            console.error('Directory does not exist:', dir);
            return [];
        }
        const allFiles = readdirSync(dir);
        console.log('All files in directory:', allFiles); // Debug log
        return allFiles.filter(file => file.endsWith('.mdx'));
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
}

export function readMDXFile(filePath: string) {
    try {
        if (!existsSync(filePath)) {
            console.error('File does not exist:', filePath);
            throw new Error('File not found');
        }

        const fileContents = readFileSync(filePath, 'utf8');
        console.log('Reading file:', filePath); // Debug log
        
        if (!fileContents.trim().startsWith('---')) {
            console.error('Invalid MDX format - missing frontmatter');
            throw new Error('Invalid MDX format');
        }

        return matter(fileContents);
    } catch (error) {
        console.error('Error reading MDX file:', error);
        throw error;
    }
}

export function getMDXData(dir: string) {
    const mdxFiles = getMDXFiles(dir);
    return mdxFiles.map(fileName => {
        const filePath = join(dir, fileName);
        const source = readMDXFile(filePath);
        return {
            source,
            metadata: source.data,
            slug: fileName.replace('.mdx', '')
        };
    });
}

export function getPosts(customPath = ['', '', '', '']) {
    try {
        const postsDir = join(process.cwd(), ...customPath);
        console.log('Looking for posts in:', postsDir);
        
        if (!existsSync(postsDir)) {
            console.error('Posts directory not found:', postsDir);
            return [];
        }
        
        return getMDXData(postsDir);
    } catch (error) {
        console.error('Error getting posts:', error);
        return [];
    }
}

export function getPost(slug: string, locale: string = 'en') {
    try {
        const postsDir = join(process.cwd(), 'src', 'app', '[locale]', 'blog', 'posts', locale);
        const postPath = join(postsDir, `${slug}.mdx`);
        
        console.log('Looking for post at:', postPath);
        
        if (!existsSync(postPath)) {
            console.error('Post file not found:', postPath);
            return null;
        }

        const fileContents = readFileSync(postPath, 'utf8');
        const source = matter(fileContents);
        
        return {
            content: source.content,
            metadata: source.data,
            slug,
        };
    } catch (error) {
        console.error('Error getting post:', error);
        return null;
    }
}

export function getResources(locale: string = 'en'): Resource[] {
    const resourcesDirectory = join(process.cwd(), 'src', 'app', '[locale]', 'resources', 'content', locale);
    const resources = getMDXData(resourcesDirectory);
    return resources
        .map(resource => ({
            ...resource,
            slug: resource.slug,
            metadata: resource.metadata as ResourceMetadata
        }))
        .sort((a, b) => {
            if (a.metadata.publishedAt < b.metadata.publishedAt) return 1;
            if (a.metadata.publishedAt > b.metadata.publishedAt) return -1;
            return 0;
        });
}

export function getResource(slug: string, locale: string = 'en') {
    const resourcesDirectory = join(process.cwd(), 'src', 'app', '[locale]', 'resources', 'content', locale);
    const resourcePath = join(resourcesDirectory, `${slug}.mdx`);
    
    try {
        if (!existsSync(resourcePath)) {
            console.error('Resource file not found:', resourcePath);
            // Try alternative path
            const altResourcesDirectory = join(process.cwd(), 'src', 'app', locale, 'resources', 'content', locale);
            const altResourcePath = join(altResourcesDirectory, `${slug}.mdx`);
            
            if (!existsSync(altResourcePath)) {
                console.error('Resource file not found in alternative path:', altResourcePath);
                return null;
            }
            
            const fileContents = readFileSync(altResourcePath, 'utf8');
            const source = matter(fileContents);
            
            return {
                content: source.content,
                metadata: source.data as ResourceMetadata,
                slug,
            };
        }

        const fileContents = readFileSync(resourcePath, 'utf8');
        const source = matter(fileContents);
        
        return {
            content: source.content,
            metadata: source.data as ResourceMetadata,
            slug,
        };
    } catch (error) {
        console.error('Error getting resource:', error);
        return null;
    }
}
