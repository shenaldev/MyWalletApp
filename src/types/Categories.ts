export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  primary: 1 | 0;
  user_id: number | null;
  created_at: string | null;
  updated_at: string | null;
};
