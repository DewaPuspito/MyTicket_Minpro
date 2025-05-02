import { UserPayload } from "../../models/interface";

export const passwordResetTemplate = (user: UserPayload['name'], resetLink: string, expiryHours: number = 24) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #0f62fe;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
    }
    .content {
      padding: 30px;
      font-size: 16px;
      line-height: 1.6;
    }
    .footer {
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #777;
      background-color: #f1f1f1;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #0f62fe;
      color: white !important;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin: 20px 0;
    }
    .warning {
      color: #ff6b6b;
      font-size: 14px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Permintaan Reset Password
    </div>
    <div class="content">
      <h2>Halo ${user},</h2>
      <p>Kami menerima permintaan reset password untuk akun Anda. Silakan klik tombol di bawah ini untuk melanjutkan:</p>
      
      <a href="${resetLink}" class="button">Reset Password</a>
      
      <p>Jika tombol di atas tidak bekerja, salin dan tempel link berikut di browser Anda:</p>
      <p><small>${resetLink}</small></p>
      
      <p class="warning">⚠️ Link ini akan kadaluarsa dalam ${expiryHours} jam. Jangan berikan link ini kepada siapapun.</p>
      
      <p>Jika Anda tidak merasa meminta reset password, abaikan email ini atau hubungi tim support kami.</p>
    </div>
    <div class="footer">
      Email ini dikirim otomatis oleh sistem keamanan. Harap tidak membalas.
    </div>
  </div>
</body>
</html>
`;
