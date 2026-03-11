const verifyEmailTemplate = ({ name, url }) => {
  // Detective's Desk ke liye premium Black & White email template
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #ffffff; color: #000000; border: 1px solid #e0e0e0; padding: 40px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      
      <h2 style="text-align: center; text-transform: uppercase; letter-spacing: 3px; font-weight: 800; border-bottom: 2px solid #000000; padding-bottom: 15px; margin-top: 0;">
        Detective's Desk
      </h2>
      
      <p style="font-size: 16px; font-weight: 600; margin-top: 30px;">Dear ${name},</p>
      
      <p style="font-size: 15px; line-height: 1.6; color: #333333;">
        Your dossier has been initiated. Welcome to <strong>Detective's Desk</strong>. To grant you full clearance and activate your private workspace, we need to verify your credentials.
      </p>
      
      <p style="font-size: 15px; line-height: 1.6; color: #333333;">
        Click the button below to confirm your identity and gain access to the system.
      </p>
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="${url}" style="background-color: #000000; color: #ffffff; padding: 14px 28px; text-decoration: none; display: inline-block; font-size: 15px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-radius: 4px;">
          Verify Identity
        </a>
      </div>
      
      <p style="font-size: 13px; line-height: 1.6; color: #777777; text-align: center;">
        If you did not request access to this system, please consider this a false lead and safely ignore this message.
      </p>
      
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
      
      <p style="font-size: 14px; margin: 0; line-height: 1.5;">
        Stay sharp,<br>
        <strong>Vivek Shrivastava</strong><br>
        Chief Architect & Developer<br>
        Detective's Desk HQ
      </p>
      
    </div>
  `;
}

export default verifyEmailTemplate;