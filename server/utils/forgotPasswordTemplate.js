const forgotPasswordTemplate = ({ name, otp }) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Security Clearance Reset</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; color: #000000; border: 1px solid #000000; padding: 40px; border-radius: 4px; box-shadow: 0 8px 16px rgba(0,0,0,0.08);">
      
      <h2 style="text-align: center; text-transform: uppercase; letter-spacing: 3px; font-weight: 800; border-bottom: 2px solid #000000; padding-bottom: 15px; margin-top: 0;">
        Detective's Desk
      </h2>

      <h3 style="text-align: center; text-transform: uppercase; letter-spacing: 1.5px; color: #333333; margin-top: 25px; font-size: 18px;">
        Security Clearance Reset
      </h3>
      
      <p style="font-size: 16px; font-weight: 600; margin-top: 30px;">Agent ${name},</p>
      
      <p style="font-size: 15px; line-height: 1.6; color: #333333;">
        A request to override your current security credentials has been logged at HQ. To regain access to your private workspace, please use the classified OTP code below.
      </p>
      
      <div style="text-align: center; margin: 40px 0;">
        <span style="display: inline-block; padding: 18px 36px; font-size: 28px; letter-spacing: 8px; font-weight: bold; color: #ffffff; background-color: #000000; border-radius: 4px; border: 2px solid #333333;">
          ${otp}
        </span>
      </div>
      
      <p style="font-size: 14px; line-height: 1.6; color: #000000; text-align: center; font-weight: bold;">
        This authorization code is strictly valid for 1 hour.
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #555555; text-align: center;">
        Enter this code at the Detective's Desk portal to establish a new password.
      </p>
      
      <hr style="border: none; border-top: 1px solid #000000; margin: 35px 0;" />
      
      <p style="font-size: 13px; line-height: 1.6; color: #777777; text-align: center;">
        If you did not initiate this security protocol, your credentials may be targeted. Please ignore this dispatch and ensure your current codes are secure.
      </p>
      
      <div style="margin-top: 35px;">
        <p style="font-size: 14px; margin: 0; line-height: 1.5; color: #000000;">
          Stay sharp,<br />
          <strong>Vivek Shrivastava</strong><br />
          Chief Architect & Developer<br />
          Detective's Desk HQ
        </p>
      </div>
      
    </div>
  </body>
  </html>
  `;
};

export default forgotPasswordTemplate;