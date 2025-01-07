import { Card, CardHeader, CardBody, CardFooter, Link, Chip } from "@nextui-org/react";
import { Paper } from '@/lib/types';
import { DocumentIcon, StarIcon } from '@heroicons/react/24/outline';

interface PaperCardProps {
  paper: Paper;
}

export default function PaperCard({ paper }: PaperCardProps) {
  return (
    <Card className="glassmorphism neural-glow">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-xl font-semibold">{paper.title}</p>
          <div className="flex items-center gap-2 text-small text-default-500">
            <StarIcon className="h-4 w-4" />
            <span>{paper.stars} stars</span>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <p className="text-default-500">{paper.summary}</p>
          
          <div className="space-y-2">
            {paper.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-success">✅</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {paper.tags.map((tag) => (
              <Chip key={tag} color="success" variant="flat" size="sm">
                {tag}
              </Chip>
            ))}
          </div>
        </div>
      </CardBody>
      <CardFooter className="gap-4">
        <Link 
          href={paper.github_link}
          isExternal
          showAnchorIcon
          className="text-success"
        >
          GitHub
        </Link>
        <Link 
          href={paper.arxiv_link}
          isExternal
          showAnchorIcon
          className="text-success"
        >
          arXiv
        </Link>
      </CardFooter>
    </Card>
  );
} 