import { z } from "zod";

export const signUpSchema = z
  .object({
    zipCode: z.number().min(10000),
    city: z.string(),
    state: z.string(),
    inStateMin: z.number().min(0),
    inStateMax: z.number().min(0),
    outStateMin: z.number().min(0),
    outStateMax: z.number().min(0),
  })

export type TSignUpSchema = z.infer<typeof signUpSchema>;