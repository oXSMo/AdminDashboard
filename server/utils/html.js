export const confirmEmail = ({
  logoURL,
  username,
  supportEmail,
  OTP,
}) => `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Reset styles */
        body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #FFFFFF; /* Primary color */
        }
        /* Main container */
        .container { 
            max-width: 600px; 
            margin: 20px auto; 
            padding: 30px; 
            background-color: #FFFFFF; /* Primary color */
            border: 1px solid #EB5930; /* Secondary color */
            border-radius: 8px;
        }
        /* Header */
        .header { 
            text-align: center; 
            padding-bottom: 20px; 
            border-bottom: 2px solid #041B31; /* Tertiary color */
        }
        /* Content */
        .content { 
            padding: 30px 20px; 
            color: #041B31; /* Tertiary color for text */
            line-height: 1.6; 
        }
        /* OTP Box */
        .otp-box { 
            background-color: #f8f9fa; 
            padding: 15px; 
            text-align: center; 
            font-size: 32px; 
            margin: 25px 0;
            border-radius: 8px;
            color: #041B31; /* Tertiary color */
            border: 2px solid #EB5930; /* Secondary color */
            font-weight: bold;
        }
        /* Footer */
        .footer { 
            text-align: center; 
            padding-top: 20px;
            color: #FFFFFF; /* White text */
            font-size: 12px;
            background-color: #041B31; /* Tertiary color */
            border-radius: 0 0 6px 6px;
            margin: -30px;
            padding: 20px;
            margin-top: 30px;
        }
        /* Button */
        .copy-button {
            background-color: #EB5930; /* Secondary color */
            color: #FFFFFF !important; /* White text */
            padding: 10px 25px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin: 15px 0;
            transition: background-color 0.3s;
        }
        .copy-button:hover {
            background-color: #D94825; /* Darker shade of secondary */
        }
        /* Links */
        a {
            color: #EB5930 !important; /* Secondary color */
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src=${logoURL} alt="Company Logo" style="max-height: 80px;">
        </div>

        <!-- Content -->
        <div class="content">
            <h2 style="color: #041B31; margin-top: 0;">Confirm Your Email Address</h2>
            <p>Hello ${username},</p>
            <p>Please use the following OTP code to verify your email address:</p>
            
            <div class="otp-box">
                ${OTP}
            </div>

            <p>If you didn't request this code, you can safely ignore this email.</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Need help? Contact us at <a href="mailto:${supportEmail}">${supportEmail}</a></p>
            <p>© 2024 FiixIt. All rights reserved.</p>
            
        </div>
    </div>
</body>
</html>`;

////////! PASSWORD

export const SendPassword = ({
  logoURL,
  username,
  supportEmail,
  OTP,
}) => `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Reset styles */
        body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #FFFFFF; /* Primary color */
        }
        /* Main container */
        .container { 
            max-width: 600px; 
            margin: 20px auto; 
            padding: 30px; 
            background-color: #FFFFFF; /* Primary color */
            border: 1px solid #EB5930; /* Secondary color */
            border-radius: 8px;
        }
        /* Header */
        .header { 
            text-align: center; 
            padding-bottom: 20px; 
            border-bottom: 2px solid #041B31; /* Tertiary color */
        }
        /* Content */
        .content { 
            padding: 30px 20px; 
            color: #041B31; /* Tertiary color for text */
            line-height: 1.6; 
        }
        /* Password Box */
        .password-box { 
            background-color: #f8f9fa; 
            padding: 15px; 
            text-align: center; 
            font-size: 24px; 
            margin: 25px 0;
            border-radius: 8px;
            color: #041B31; /* Tertiary color */
            border: 2px solid #EB5930; /* Secondary color */
            font-weight: bold;
        }
        /* Footer */
        .footer { 
            text-align: center; 
            padding-top: 20px;
            color: #FFFFFF; /* White text */
            font-size: 12px;
            background-color: #041B31; /* Tertiary color */
            border-radius: 0 0 6px 6px;
            margin: -30px;
            padding: 20px;
            margin-top: 30px;
        }
        /* Button */
        .login-button {
            background-color: #EB5930; /* Secondary color */
            color: #FFFFFF !important; /* White text */
            padding: 10px 25px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin: 15px 0;
            transition: background-color 0.3s;
        }
        .login-button:hover {
            background-color: #D94825; /* Darker shade of secondary */
        }
        /* Links */
        a {
            color: #EB5930 !important; /* Secondary color */
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="${logoURL}" alt="Company Logo" style="max-height: 60px;">
        </div>

        <!-- Content -->
        <div class="content">
            <h2 style="color: #041B31; margin-top: 0;">Your New Password</h2>
            <p>Hello ${username},</p>
            <p>As requested, here is your new password. Please log in and change it immediately for security reasons.</p>
            
            <div class="password-box">
                ${OTP}
            </div>

            <p>For your security, we recommend:</p>
            <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Changing your password after logging in</li>
                <li>Using a strong, unique password</li>
            </ul>

            <a href="https://fix-iiit.com/sign" class="login-button">Log In Now</a>

            <p>If you didn't request this password reset, please contact us immediately at <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Need help? Contact us at <a href="mailto:${supportEmail}">${supportEmail}</a></p>
            <p>© 2024 Fix iiit. All rights reserved.</p>
            
        </div>
    </div>
</body>
</html>`;

////////! CONTACT

export const contactHTML = ({
  logoURL,
  username,
  supportEmail,
  OTP,
}) => `<!DOCTYPE html>
  <html>
  <head>
      <style>
          /* Reset styles */
          body { 
              margin: 0; 
              padding: 0; 
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              background-color: #FFFFFF; /* Primary color */
          }
          /* Main container */
          .container { 
              max-width: 600px; 
              margin: 20px auto; 
              padding: 30px; 
              background-color: #FFFFFF; /* Primary color */
              border: 1px solid #EB5930; /* Secondary color */
              border-radius: 8px;
          }
          /* Header */
          .header { 
              text-align: center; 
              padding-bottom: 20px; 
              border-bottom: 2px solid #041B31; /* Tertiary color */
          }
          /* Content */
          .content { 
              padding: 30px 20px; 
              color: #041B31; /* Tertiary color for text */
              line-height: 1.6; 
          }
          /* Password Box */
          .password-box { 
              background-color: #f8f9fa; 
              padding: 15px; 
              text-align: center; 
              font-size: 16px; 
              margin: 25px 0;
              border-radius: 8px;
              color: #041B31; /* Tertiary color */
              border: 2px solid #EB5930; /* Secondary color */
              font-weight: bold;
          }
          /* Footer */
          .footer { 
              text-align: center; 
              padding-top: 20px;
              color: #FFFFFF; /* White text */
              font-size: 12px;
              background-color: #041B31; /* Tertiary color */
              border-radius: 0 0 6px 6px;
              margin: -30px;
              padding: 20px;
              margin-top: 30px;
          }
          /* Button */
          .login-button {
              background-color: #EB5930; /* Secondary color */
              color: #FFFFFF !important; /* White text */
              padding: 10px 25px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              margin: 15px 0;
              transition: background-color 0.3s;
          }
          .login-button:hover {
              background-color: #D94825; /* Darker shade of secondary */
          }
          /* Links */
          a {
              color: #EB5930 !important; /* Secondary color */
              text-decoration: none;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <!-- Header -->
          <div class="header">
              <img src="${logoURL}" alt="Company Logo" style="max-height: 60px;">
          </div>
  
          <!-- Content -->
          <div class="content">
              <h2 style="color: #041B31; margin-top: 0;">Your New Password</h2>
              <p>Message From ${username},</p>
              <p>${username} is trying to contact you and send :</p>
              
              <div class="password-box">
                  ${OTP}
              </div>
  
          </div>
  
          <!-- Footer -->
          <div class="footer">
              <p>© 2024 Fix iiit. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
