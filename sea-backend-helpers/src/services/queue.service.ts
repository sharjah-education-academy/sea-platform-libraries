// libs/shared/queue/queue.service.ts
import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bullmq";
import { JobsOptions, Queue } from "bullmq";
import { Constants, Types } from "../";

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(Constants.Queue.Name) private readonly jobQueue: Queue
  ) {}

  async addJob<
    N extends keyof Types.Queue.MessageJobMap,
    T extends keyof Types.Queue.MessageJobMap[N]
  >(
    name: N,
    type: T,
    data: Types.Queue.MessageJobMap[N][T],
    options?: JobsOptions
  ) {
    await this.jobQueue.add(`${String(name)}:${String(type)}`, data, options);
  }
}
