import raw from './resume.json';
import type { Resume } from '@/types/resume';

const resume: Resume = {
  ...raw,
  basics: { ...raw.basics },
};

const email = import.meta.env.PUBLIC_CONTACT_EMAIL?.trim();
const github = import.meta.env.PUBLIC_CONTACT_GITHUB?.trim();
const linkedin = import.meta.env.PUBLIC_CONTACT_LINKEDIN?.trim();

if (email) resume.basics.email = email;
if (github) resume.basics.github = github;
if (linkedin) resume.basics.linkedin = linkedin;

export { resume };
