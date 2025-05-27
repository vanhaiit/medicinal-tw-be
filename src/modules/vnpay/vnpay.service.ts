import { Injectable } from '@nestjs/common';
import * as querystring from 'querystring';
import * as crypto from 'crypto'; // Import module crypto
import { VnPayRequestDto } from './dto/vnpay.dto';
import dayjs from 'dayjs';

@Injectable()
export class VnPayService {
    private vnp_TmnCode = 'M3KV0AWY';
    private vnp_HashSecret = 'QDSM0KAY4X4DGGTW783C4P5Z2FRTXCM6';
    private vnp_Url = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

    createPaymentUrl(body: VnPayRequestDto) {
        // Tạo vnp_TxnRef duy nhất dựa trên timestamp
        const vnp_TxnRef = Date.now().toString();
        const vnp_CreateDate = dayjs().format('YYYYMMDDHHmmss');

        let vnp_Params: any = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: this.vnp_TmnCode,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: vnp_TxnRef,
            vnp_OrderInfo: 'thanhtoandonhang',
            vnp_OrderType: 'other',
            vnp_Amount: 0,
            vnp_ReturnUrl: 'https://domainmerchant.vn/ReturnUrl',
            vnp_IpAddr: '127.0.0.1',
            vnp_CreateDate,
            ...body
        };

        // Sắp xếp tham số
        vnp_Params = this.sortObject(vnp_Params);
        console.log('Sorted Params:', vnp_Params);

        // Tạo chuỗi ký
        const signData = querystring.stringify(vnp_Params);
        console.log('Sign Data:', signData);

        // Tạo chữ ký HMAC-SHA512
        const hmac = crypto.createHmac('sha512', this.vnp_HashSecret);
        const signed = hmac.update(signData, 'utf-8').digest('hex');
        console.log('Signed:', signed);

        // Thêm chữ ký vào params
        vnp_Params['vnp_SecureHash'] = signed;

        // Tạo URL cuối cùng
        const paymentUrl = this.vnp_Url + '?' + querystring.stringify(vnp_Params);
        console.log('Final URL:', paymentUrl);

        return paymentUrl;
    }

    private sortObject(obj: any) {
        const sorted: any = {};
        const keys = Object.keys(obj).sort();
        keys.forEach((key) => {
            sorted[key] = obj[key].toString(); // Chuyển tất cả giá trị thành chuỗi
        });
        return sorted;
    }
}