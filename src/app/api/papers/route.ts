import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { Paper } from '@/lib/types';
import * as cheerio from 'cheerio';
import { createClient } from '@/utils/supabase/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      
      // If we get a 429 (Too Many Requests), wait before retrying
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        await new Promise(resolve => setTimeout(resolve, (parseInt(retryAfter || '10') * 1000)));
        continue;
      }
      
      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i))); // Exponential backoff
    }
  }
  throw new Error('Max retries reached');
}

async function getPapersFromPapersWithCode(): Promise<Partial<Paper>[]> {
  try {
    return await fetchPapersFromWeb();
  } catch (error) {
    console.error('Error in getPapersFromPapersWithCode:', error);
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

// Helper function to fetch papers from web
async function fetchPapersFromWeb(): Promise<Partial<Paper>[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  const response = await fetchWithRetry('https://paperswithcode.com/', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0'
    },
    signal: controller.signal,
  });

  clearTimeout(timeoutId);

  const html = await response.text();
  const $ = cheerio.load(html);
  const papers: Partial<Paper>[] = [];

  $('.paper-card').each((_, element) => {
    const $element = $(element);
    
    // Extract paper information
    const title = $element.find('h1 a').text().trim();
    const uid = $element.find('h1 a').attr('href') || '';
    const subtitle = $element.find('.item-strip-abstract').text().trim();
    const stars = parseInt($element.find('.entity-stars .badge').text().trim().replace(',', '')) || 0;
    const github_link = $element.find('.item-github-link a').attr('href') || '';
    
    // Extract arXiv link - look for links containing 'arxiv.org'
    let arxiv_link = '';
    $element.find('a').each((_, link) => {
      const href = $(link).attr('href') || '';
      if (href.includes('arxiv.org')) {
        arxiv_link = href;
      }
    });
    
    // If no arXiv link found, create a fallback one from the UID
    if (!arxiv_link) {
      // Extract paper ID from the UID or use a fallback
      const paperId = uid.split('/').pop() || 'unknown';
      arxiv_link = `https://arxiv.org/abs/${paperId}`;
    }
    
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
      arxiv_link,
      media,
    });
  });

  return papers;
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
      model: "gpt-4o-mini",
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
    const supabase = await createClient();
    
    // First check if we have recent papers in Supabase
    const { data: existingPapers, error: fetchError } = await supabase
      .from('papers_web_jb')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    // If we have recent papers (less than 1 hour old), return them
    if (existingPapers?.length && existingPapers[0].created_at) {
      const mostRecentPaper = new Date(existingPapers[0].created_at);
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      
      if (mostRecentPaper > oneHourAgo) {
        console.log('Returning cached papers from Supabase');
        return NextResponse.json(existingPapers);
      }
    }

    // If no recent papers, fetch and process new ones
    const rawPapers = await fetchPapersFromWeb();
    
    // Process papers with OpenAI
    const processedPapers = await Promise.all(
      rawPapers.map(async (paper) => {
        const { summary, highlights } = await generatePaperSummary(paper);
        return {
          ...paper,
          summary,
          highlights,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      })
    );

    // Store the processed papers in Supabase
    if (processedPapers.length > 0) {
      const { error: insertError } = await supabase
        .from('papers_web_jb')
        .insert(processedPapers);

      if (insertError) {
        console.error('Error inserting papers:', insertError);
      }
    }

    return NextResponse.json(processedPapers);
  } catch (error) {
    console.error('Error processing papers:', error);
    
    // Try to get papers from Supabase as fallback
    const supabase = await createClient();
    const { data: fallbackPapers } = await supabase
      .from('papers_web_jb')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (fallbackPapers?.length) {
      return NextResponse.json(fallbackPapers);
    }

    return NextResponse.json(
      { 
        error: 'Failed to process papers',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
} 