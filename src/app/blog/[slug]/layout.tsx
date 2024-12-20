import { generateMetadata } from './metadata'

export { generateMetadata }

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
  }
  
  export default async function BlogPostLayout({
    children,
    params
  }: LayoutProps) {
    const { slug: _slug} = await params;
    return children;
  }
  