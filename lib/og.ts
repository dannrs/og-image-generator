import * as z from 'zod'

export const ogBlogImageSchema = z.object({
  title: z.string(),
  type: z.string(),
  mode: z.enum(['light', 'dark']).default('dark')
})

export const ogHomeImageSchema = z.object({
  title: z.string(),
  route: z.enum(['home', 'about', 'blog', 'projects']).default('home'),
  mode: z.enum(['light', 'dark']).default('dark')
})