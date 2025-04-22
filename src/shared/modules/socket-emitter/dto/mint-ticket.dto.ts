export class MintTicketDto {
    userId: number;
    holdTicketId?: number;
    eventId: number;
}
export class OpenBoxDto {
    userId: number;
    transactionHash: string;
    boxId: string;
}
export class BuyTokenSuccessfullyData {
    collectionConfigId: number;
    collectionId: number;
    remainAmount: string;
    transactionHash: string;
}
