import { Injectable, SetMetadata } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LocalService {
  constructor(private readonly configService: ConfigService) {}
}
