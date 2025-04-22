import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import path from 'path';

@Injectable()
export class MailerService {
    private transporter: any;
    constructor(private readonly configService: ConfigService) {
        Handlebars.registerHelper('formatVND', function (amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
            }).format(amount);
        });

        Handlebars.registerHelper('eq', function (a, b) {
            return a === b;
        });

        Handlebars.registerHelper('split', function (string, separator) {
            return string?.split(separator);
        });

        Handlebars.registerHelper('totalPrice', function (price, quantity) {
            const result = price * quantity;
            return result
                ? new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                  }).format(result)
                : '0đ';
        });

        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'), // Replace with your SMTP host
            port: this.configService.get('SMTP_PORT'), // Replace with your SMTP port
            secure: this.configService.get('SMTP_SECURE') === 'true', // true for 465, false for other ports
            auth: {
                user: this.configService.get('SMTP_USER'), // Replace with your email
                pass: this.configService.get('SMTP_PASS'), // Replace with your email password
            },
        });
    }

    private compileTemplate(templateName: string, context: any): string {
        const filePath = path.join(
            __dirname,
            '../../templates',
            `${templateName}.hbs`,
        );
        ///src/shared/templates/contact.hbs
        const templateSource = fs.readFileSync(filePath, 'utf8');
        const compiledTemplate = Handlebars.compile(templateSource);
        return compiledTemplate(context);
    }

    async sendMail(
        to: string,
        subject: string,
        template: string,
        context: any,
    ) {
        const html = this.compileTemplate(template, context);

        const mailOptions = {
            from: 'your-email@example.com', // Replace with your email
            to,
            subject,
            html, // Rendered HTML template
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('Message sent: %s', info.messageId);
            return info;
        } catch (error) {
            console.error('Error sending email: ', error);
            throw error;
        }
    }
}
