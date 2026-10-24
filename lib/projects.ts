/** Publish only with real photos, consent, and client-approved descriptions. */
export type Project = {
  slug: string;
  title: string;
  location: string;
  workType: string;
  description: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  published: boolean;
};
export const projects: Project[] = [];
