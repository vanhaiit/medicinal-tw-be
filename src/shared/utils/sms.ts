import { HttpException, HttpStatus } from "@nestjs/common";
import { httpErrors } from "constant/http-error.constant";

interface SmsPayload {
    ApiKey: string;
    Content: string;
    Phone: string;
    SecretKey: string;
    Brandname: string;
    SmsType: string;
    IsUnicode: string;
    campaignid?: string;
    RequestId: string;
    CallbackUrl?: string;
}

interface SmsResponse {
    CodeResult: string;
    CountRegenerate: number;
    SMSID: string;
    ErrorMessage: string;
}

export async function sendSms(
    phone: string,
    content: string,
    options?: Partial<SmsPayload>
): Promise<SmsResponse> {

    const payload: SmsPayload = {
        ApiKey: process.env.ESMS_API_KEY || 'APIKEYCUABAN',
        SecretKey: process.env.ESMS_API_SECRET || 'SECRETKEYCUABAN',
        Phone: phone,
        Content: content,
        Brandname: process.env.ESMS_BRANCH || 'BRANCHNAME',
        SmsType: '2',
        IsUnicode: '0',
        RequestId: crypto.randomUUID(),
        ...options
    };



    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };

    try {
        const response = await fetch(
            'https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/',
            requestOptions
        );
        const result = await response.json();
        return result as SmsResponse;
    } catch (error) {
        throw new Error(`Failed to send SMS: ${error}`);
    }
}



export async function getOtpSms(
    phone: string
): Promise<any> {
    try {
        const url = `${process.env.ESMS_URL}?Phone=${phone}&ApiKey=${process.env.ESMS_API_KEY}&SecretKey=${process.env.ESMS_API_SECRET}&TimeAlive=2&Brandname=${process.env.ESMS_BRANCH}&Type=2&message=${process.env.ESMS_MSG}&IsNumber=1`;
        const response = await fetch(url);
        return await response.json() as SmsResponse;
    } catch (error) {
        throw new Error(`Failed to get OTP SMS: ${error}`);
    }
}

export async function verifyOtpSms(
    phone: string,
    code: number,
): Promise<any> {

    const url = `${process.env.ESMS_CHECK_URL}?ApiKey=${process.env.ESMS_API_KEY}&SecretKey=${process.env.ESMS_API_SECRET}&Phone=${phone}&Code=${code}`;

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        throw new Error(`Failed to verify OTP SMS: ${error}`);
    }
}