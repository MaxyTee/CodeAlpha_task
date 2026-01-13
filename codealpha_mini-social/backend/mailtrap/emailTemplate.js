export const OTPEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #5d4037;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        .content h2 {
            color: #5d4037;
            font-size: 20px;
            margin-bottom: 15px;
        }
        .content p {
            color: #666;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .otp-box {
            background-color: #f5f5f5;
            border: 2px dashed #8d6e63;
            border-radius: 8px;
            padding: 25px;
            margin: 30px 0;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #5d4037;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
        }
        .expiry-text {
            color: #999;
            font-size: 13px;
            margin-top: 15px;
        }
        .warning {
            background-color: #fff3e0;
            border-left: 4px solid #8d6e63;
            padding: 15px;
            margin: 20px 0;
            text-align: left;
        }
        .warning p {
            color: #5d4037;
            font-size: 13px;
            margin: 0;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 20px;
            text-align: center;
        }
        .footer p {
            color: #999;
            font-size: 12px;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Verification Code</h1>
        </div>
        
        <div class="content">
            <h2>Hello!</h2>
            <p>We received a request to verify your account. Please use the code below to complete your verification:</p>
            
            <div class="otp-box">
                <div class="otp-code">{verificationCode}</div>
                <p class="expiry-text">This code will expire in 10 minutes</p>
            </div>
            
            <div class="warning">
                <p><strong>Security Notice:</strong> Never share this code with anyone. Our team will never ask for your verification code.</p>
            </div>
            
            <p>If you didn't request this code, please ignore this email or contact our support team if you have concerns.</p>
        </div>
        
        <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

export const WelcomeEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to {companyName}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(93, 64, 55, 0.1);
            overflow: hidden;
            border: 1px solid #d7ccc8;
        }
        .header {
            background-color: #5d4037;
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 32px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .content h2 {
            color: #5d4037;
            font-size: 24px;
            margin: 0 0 20px;
        }
        .content p {
            margin: 0 0 15px;
            color: #666666;
            font-size: 15px;
        }
        .highlight-box {
            background-color: #fff3e0;
            border-left: 4px solid #8d6e63;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 4px 4px 0;
        }
        .highlight-box h3 {
            margin: 0 0 10px;
            color: #5d4037;
            font-size: 18px;
        }
        .highlight-box p {
            margin: 0;
            color: #5d4037;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            background-color: #5d4037;
            color: #ffffff;
            text-decoration: none;
            padding: 14px 30px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            text-align: center;
        }
        .button:hover {
            background-color: #4e342e;
        }
        .features {
            margin: 25px 0;
        }
        .feature-item {
            margin: 15px 0;
            padding-left: 25px;
            position: relative;
        }
        .feature-item:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #5d4037;
            font-weight: bold;
            font-size: 18px;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #d7ccc8;
            color: #999999;
            font-size: 13px;
        }
        .footer p {
            margin: 5px 0;
        }
        .footer a {
            color: #8d6e63;
            text-decoration: none;
        }
        
        /* Responsive Design */
        @media only screen and (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 4px;
            }
            .header {
                padding: 30px 15px;
            }
            .header h1 {
                font-size: 26px;
            }
            .header p {
                font-size: 14px;
            }
            .content {
                padding: 30px 20px;
            }
            .content h2 {
                font-size: 20px;
            }
            .content p {
                font-size: 14px;
            }
            .button {
                padding: 12px 25px;
                font-size: 15px;
                display: block;
            }
            .highlight-box {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to {companyName}!</h1>
            <p>We're thrilled to have you on board</p>
        </div>

        <div class="content">
            <h2>Hi {userName},</h2>

            <p>Thank you for joining {companyName}! We're excited to help you get started on your journey with us.</p>

            <p>Your account has been successfully created and you're all set to explore everything we have to offer.</p>

            <div class="highlight-box">
                <h3>Quick Start Guide</h3>
                <p>Here are a few things you can do to get started:</p>
            </div>

            <div class="features">
                <div class="feature-item">Complete your profile to personalize your experience</div>
                <div class="feature-item">Explore our features and discover what's possible</div>
                <div class="feature-item">Check out our help center for tips and tutorials</div>
                <div class="feature-item">Connect with our community and share your ideas</div>
            </div>

            <center>
                <a href="{dashboardUrl}" class="button">Get Started</a>
            </center>

            <p>If you have any questions or need assistance, our support team is always here to help. Feel free to reach out anytime!</p>

            <p>Best regards,<br>
            <strong>The {companyName} Team</strong></p>
        </div>

        <div class="footer">
            <p>&copy; 2024 {companyName}. All rights reserved.</p>
            <p>Need help? <a href="{supportUrl}">Contact Support</a></p>
        </div>
    </div>
</body>
</html>
`;

export const ForgotPasswordEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(93, 64, 55, 0.1);
            overflow: hidden;
            border: 1px solid #d7ccc8;
        }
        .header {
            background-color: #5d4037;
            padding: 30px 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .content p {
            margin: 0 0 15px;
            color: #666666;
            font-size: 15px;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            background-color: #5d4037;
            color: #ffffff;
            text-decoration: none;
            padding: 14px 35px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
        }
        .button:hover {
            background-color: #4e342e;
        }
        .expiry-box {
            background-color: #fff3e0;
            border-left: 4px solid #8d6e63;
            padding: 15px;
            margin: 25px 0;
            border-radius: 0 4px 4px 0;
        }
        .expiry-box p {
            margin: 0;
            color: #5d4037;
            font-size: 14px;
        }
        .security-notice {
            background-color: #f5f5f5;
            padding: 20px;
            margin: 25px 0;
            border-radius: 6px;
            border: 1px solid #d7ccc8;
        }
        .security-notice h3 {
            margin: 0 0 10px;
            color: #5d4037;
            font-size: 16px;
        }
        .security-notice p {
            margin: 5px 0;
            font-size: 14px;
            color: #666666;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #d7ccc8;
            color: #999999;
            font-size: 13px;
        }
        .footer p {
            margin: 5px 0;
        }
        .footer a {
            color: #8d6e63;
            text-decoration: none;
        }
        
        /* Responsive Design */
        @media only screen and (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 4px;
            }
            .header {
                padding: 25px 15px;
            }
            .header h1 {
                font-size: 24px;
            }
            .content {
                padding: 30px 20px;
            }
            .content p {
                font-size: 14px;
            }
            .button {
                padding: 12px 30px;
                font-size: 15px;
                display: block;
            }
            .expiry-box {
                padding: 12px;
            }
            .security-notice {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
            <p>Account Security</p>
        </div>

        <div class="content">
            <p>Hello <strong>{userName}</strong>,</p>

            <p>We received a request to reset your password for your {companyName} account. Click the button below to create a new password:</p>

            <div class="button-container">
                <a href="{resetLink}" class="button">Reset Password</a>
            </div>

            <div class="expiry-box">
                <p><strong>This link will expire in {expiryTime} hours.</strong> For your security, please reset your password as soon as possible.</p>
            </div>

            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #8d6e63; font-size: 13px;">{resetLink}</p>

            <div class="security-notice">
                <h3>🔒 Security Tips</h3>
                <p>• If you didn't request this password reset, please ignore this email</p>
                <p>• Never share your password with anyone</p>
                <p>• Use a strong, unique password for your account</p>
                <p>• Contact support if you suspect unauthorized access</p>
            </div>

            <p>If you need any assistance, our support team is here to help.</p>

            <p>Best regards,<br>
            <strong>The {companyName} Team</strong></p>
        </div>

        <div class="footer">
            <p>&copy; 2024 {companyName}. All rights reserved.</p>
            <p>Need help? <a href="{supportUrl}">Contact Support</a></p>
        </div>
    </div>
</body>
</html>
`;
