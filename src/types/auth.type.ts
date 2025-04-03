import { SuccessResponse } from "./untils.type";
import { User } from "./user.type";

export type AuthResponse = SuccessResponse<{
  access_token: string
  user: User
}>
