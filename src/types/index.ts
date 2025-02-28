export type IMeta = {
    page: number;
    limit: number;
    total: number;
}
export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorMessage: any;
}