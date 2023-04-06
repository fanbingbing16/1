import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

export function Auth(...args: string[]) {
  return applyDecorators(
    SetMetadata("whiteurl", args),
    UseGuards(JwtAuthGuard)
  );
}
