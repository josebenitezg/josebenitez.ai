type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function BlogPostLayout(props: LayoutProps) {
  const { slug } = await props.params;
  
  return (
    <div>
      {props.children}
    </div>
  );
}