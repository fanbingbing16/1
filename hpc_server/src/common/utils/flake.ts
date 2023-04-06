import Flake from "@rockerapp/flake";
import * as dayjs from "dayjs";

export function generateFlakeID(
  nodeId: number = 1,
  timeOffset?: number
): string {
  const flake = new Flake({
    nodeId: nodeId, // optional, define machine ID
    timeOffset: timeOffset, // optional, define a time offset (in milliseconds)
  });
  return flake.generate();
}

export function generateCaseID(): string {
  return dayjs(new Date()).format("YYYYMMDDHHmmss");
}
