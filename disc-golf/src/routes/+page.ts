import { base } from '$app/paths';
import type { AnalysisPayload } from '$lib/types';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch(`${base}/data/gannon-buhr-analysis.json`);

  if (!response.ok) {
    throw new Error('Unable to load disc golf analysis data.');
  }

  return {
    analysis: (await response.json()) as AnalysisPayload
  };
};

