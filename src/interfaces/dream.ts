import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export interface Dream {
  image: string | StaticImport;
  slug: string;
  title: string;
  description: string;
}

export interface Comment {
  name: string;
  email?: string;
  comment: string;
  createdAt: Date;
}
