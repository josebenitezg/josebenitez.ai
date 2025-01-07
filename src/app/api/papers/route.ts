import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { Paper } from '@/lib/types';
import * as cheerio from 'cheerio';

const openai = new OpenAI();

async function getPapersFromPapersWithCode(): Promise<Partial<Paper>[]> {
  try {
    const response = await fetch('https://paperswithcode.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const papers: Partial<Paper>[] = [];

    // Select all paper cards
    $('.paper-card').each((_, element) => {
      const $element = $(element);
      
      // Extract paper information
      const title = $element.find('h1 a').text().trim();
      const uid = $element.find('h1 a').attr('href') || '';
      const subtitle = $element.find('.item-strip-abstract').text().trim();
      const stars = parseInt($element.find('.entity-stars .badge').text().trim().replace(',', '')) || 0;
      const github_link = $element.find('.item-github-link a').attr('href') || '';
      
      // Extract tags
      const tags: string[] = [];
      $element.find('.badge-primary').each((_, tag) => {
        tags.push($(tag).text().trim());
      });

      // Get paper image if available
      const mediaStyle = $element.find('.item-image').attr('style') || '';
      const mediaMatch = mediaStyle.match(/url\(['"]?(.*?)['"]?\)/);
      const media = mediaMatch ? mediaMatch[1] : undefined;

      papers.push({
        uid,
        title,
        subtitle,
        tags,
        stars,
        github_link,
        media,
      });
    });

    // If no papers were found, throw an error
    if (papers.length === 0) {
      throw new Error('No papers found in the HTML');
    }

    return papers;
  } catch (error) {
    console.error('Error fetching papers:', error);
    // Return mock data as fallback
    return [{
      uid: '/paper/sample-paper',
      title: 'Sample Paper: Advanced AI Techniques',
      subtitle: 'A groundbreaking paper about AI and machine learning',
      tags: ['AI', 'Machine Learning', 'Neural Networks'],
      stars: 100,
      github_link: 'https://github.com/example/sample-paper',
      arxiv_link: 'https://arxiv.org/abs/1234.5678',
      media: 'https://example.com/sample-image.jpg',
    }];
  }
}

async function generatePaperSummary(paper: Partial<Paper>) {
  const systemPrompt = `You are Pepe, an AI assistant specialized in summarizing research papers. 
  Your summaries are concise, accurate, and highlight the key contributions.`;
  
  const userPrompt = `This is one trending AI paper in JSON format:
    ${JSON.stringify(paper)}
    
    Please follow this template exactly:
    📚 New paper: <paper title> <3 relevant emojis>
    
    <paper summary in one paragraph, max 279 characters>
    
    ✅ <key point 1>
    ✅ <key point 2>
    ✅ <key point 3>
    
    Do not include any other text or sections.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 1024,
      temperature: 0.7,
    });

    const summary = completion.choices[0].message.content || '';
    
    // Parse the summary to extract highlights
    const lines = summary.split('\n').filter(line => line.trim());
    const highlights = lines
      .filter(line => line.startsWith('✅'))
      .map(line => line.replace('✅', '').trim());

    return {
      summary: lines[1], // The one-paragraph summary
      highlights,
    };
  } catch (error) {
    console.error('Error generating summary:', error);
    return {
      summary: paper.subtitle || 'Summary not available',
      highlights: ['Could not generate highlights'],
    };
  }
}

export async function GET() {
  try {
    const papers = await getPapersFromPapersWithCode();
    const processedPapers = await Promise.all(
      papers.map(async (paper) => {
        const { summary, highlights } = await generatePaperSummary(paper);
        return {
          ...paper,
          summary,
          highlights,
        };
      })
    );

    return NextResponse.json(processedPapers);
  } catch (error) {
    console.error('Error processing papers:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process papers',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
} 