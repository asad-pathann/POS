import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

export const sendOtp = ({ email, otp }) => {
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "asadullah.theofficial@gmail.com",
      pass: "",
    },
  });

  let option = {
    subject: "otp verificaton",
    from: "asadullah.theofficial@gmail.com",
    to: email,
    html: `<!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your OTP Code</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        body { margin:0; padding:0; background:#f4f7fa; font-family: Arial, sans-serif; }
        table { border-collapse:collapse; }
        a { text-decoration:none; }
        @media only screen and (max-width: 600px) {
          .container { width:100% !important; }
          .otp-code { font-size:48px !important; }
          .main { padding:20px !important; }
        }import { otpGenerator } from 'otp-generator';

      </style>
    </head>
    <body style="background:#f4f7fa; padding:20px 0;">
      <center>
    
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:0 auto;">
          <tr>
            <td align="center">
    
              <!-- White Card -->
              <table width="100%" class="container" bgcolor="#ffffff" style="border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.1);">
                <tr>
                  <td align="center" style="padding:40px 30px; background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <!-- Logo or Icon -->
                    <div style="width:90px; height:90px; background:#ffffff; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:44px; box-shadow:0 10px 20px rgba(0,0,0,0.2);">
                      🔐
                    </div>
                  </td>
                </tr>
    
                <tr>
                  <td class="main" style="padding:40px 30px; text-align:center;">
    
                    <h1 style="font-size:28px; color:#1a1a1a; margin:0 0 20px 0; font-weight:600;">
                      Your Verification Code
                    </h1>
    
                    <p style="font-size:16px; color:#555555; line-height:1.6; margin:0 0 30px 0;">
                      Hey there! 👋<br>
                      We received a request to verify your account.<br>
                      Use the code below to complete your login:
                    </p>
    
                    <!-- OTP Big Box -->
                    <div style="margin:40px 0;">
                      <div class="otp-code" style="font-size:56px; font-weight:bold; letter-spacing:12px; color:#667eea; background:#f0f2ff; padding:20px 30px; border-radius:16px; display:inline-block; border:3px dashed #667eea;">
                        ${otp} 
                      </div>
                    </div>
    
                    <p style="font-size:14px; color:#888888; margin:30px 0 0 0; line-height:1.6;">
                      <strong>This code will expire in 10 minutes.</strong><br>
                      If you didn’t request this, just ignore this email – your account is safe.
                    </p>
    
                  </td>
                </tr>
    
                <!-- Footer -->
                <tr>
                  <td style="padding:30px; background:#f8f9ff; text-align:center; border-top:1px solid #eee;">
                    <p style="font-size:13px; color:#999999; margin:0;">
                      © 2025 Your Company Name<br>
                      Need help? Reply to this email or contact support
                    </p>
                  </td>
                </tr>
              </table>
    
              <!-- Extra spacing for Gmail -->
              <div style="height:30px;"></div>
    
            </td>
          </tr>
        </table>
    
      </center>
    </body>
    </html>`,
  };
  let sendmail = transport.sendMail(option, (error, info) => {
    try {
      console.log("successfuly send Otp ");
    } catch (error) {
      console.log(error);
    }
  });
};
