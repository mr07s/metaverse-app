import z from "zod";

export const SignupSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
  type: z.enum(["user", "admin"]),
});

export const SigninSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

export const UpdateMetaDataSchema = z.object({
  avatarId: z.string(),
});

export const CreateSpaceSchema = z.object({
  name: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  mapId: z.optional(z.string()),
});

export const DeleteElementSchema = z.object({
  id: z.string(),
});

export const AddAnElementSchema = z.object({
  elementId: z.string(),
  spaceId: z.string(),
  x: z.string(),
  y: z.string(),
});

export const DeleteAnElementSchema = z.object({
  id: z.string(),
});

//admin end ponit
export const CreateAnElementSchema = z.object({
  imageUrl: z.string(),
  width: z.number(),
  height: z.number(),
  static: z.boolean(),
});

export const UpdateAnElementSchema = z.object({
  imageUrl: z.string(),
});

export const CreateAnAvatarSchema = z.object({
  imageUrl: z.string(),
  name: z.string(),
});

export const CreateAMapSchema = z.object({
  thumbnail: z.string(),
  dimensions: z.string().regex(/^[0-9]{1,4}x[0-9]{1,4}$/),
  name: z.string(),
  defaultElements: z.array(
    z.object({
      elementId: z.string(),
      x: z.number(),
      y: z.number(),
    })
  ),
});

declare global {
  namespace Express {
    export interface Request {
      role: "Admin" | "User";
      userId?: string;
    }
  }
}
