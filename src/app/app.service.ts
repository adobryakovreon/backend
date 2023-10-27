import { Injectable } from '@nestjs/common';
import { Logger } from '../core/logger/logger.service';

@Injectable()
export class AppService {
    constructor(private readonly logger: Logger) {}

    public ping(): string {
        const loggerContext = `${AppService.name}/${this.ping.name}`;

        try {
            this.logger.info('SERVER WORKED', loggerContext);
            return `SERVER WORKING RIGHT NOW ${Date.now()}`;
        } catch (error) {
            this.logger.error(error, loggerContext);
        }
    }
}
