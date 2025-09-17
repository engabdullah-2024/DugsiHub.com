import { z } from "zod";

export const zSubjectUpsert = z.object({
  name: z.string().min(2).max(60),
  slug: z.string().regex(/^[a-z0-9-]+$/).min(2).max(80),
  desc: z.string().max(300).optional().or(z.literal("")),
});
export type SubjectUpsert = z.infer<typeof zSubjectUpsert>;
