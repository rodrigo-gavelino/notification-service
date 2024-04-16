export interface IMessagingService {
    consume(queue: string, onMessage: (message: any) => Promise<void>): Promise<void>;
}