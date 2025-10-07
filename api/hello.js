import { Resend } from 'resend';
import React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; background-color: #fdf6e3; padding: 30px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 24px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      
      <img
        src="https://viloassistpro.com/images/favicon.png"
        alt="Logo"
        width="120"
        style="margin-bottom: 20px; display: block;"
      />

      <h2 style="color: #5b4636; margin-top: 0;">Bonjour,</h2>

      <p style="color: #4b3e2e;">
        Vous avez reçu un nouveau message via votre site web : viloassistpro.com
      </p>

      <p style="color: #4b3e2e;"><strong>Expéditeur :</strong> ${name} &lt;${email}&gt;</p>
      <p style="color: #4b3e2e;"><strong>Sujet :</strong> 📩 Nouveau message de ${name}</p>

      Pour plus de détails, cliquer : <a href="https://viloassistpro.com/admin" style="color: #a28c6e;">https://viloassistpro.com/admin</a>

      <p style="color: #4b3e2e;"><strong>Message :</strong></p>
      <blockquote style="background-color: #fefae0; padding: 12px 16px; border-left: 4px solid #c9b17b; margin: 10px 0;">
        ${message.replace(/\n/g, '<br/>')}
      </blockquote>

      <hr style="border: none; border-top: 1px solid #e6dec7; margin: 24px 0;" />

      <!-- Two-column footer -->
      <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 12px; color: #a28c6e;">
        <tr>
          <td width="50%" valign="top" style="padding-right: 10px;">
            <strong>Confidentialité</strong><br/>
            Ce message vous est transmis à titre confidentiel. Il peut contenir des informations sensibles provenant d’un tiers. Merci de ne pas le partager sans autorisation.       
          </td>
          <td width="50%" valign="top" style="padding-left: 10px;">
            <strong>Contact</strong><br/>
            Vilo Assist-Pro<br/>
            info@viloassistpro.com<br/>
            <a href="https://viloassistpro.com/" style="color: #a28c6e;">https://viloassistpro.com/</a>
          </td>
        </tr>
      </table>
      <p style="color: #4b3e2e;">
        Message transmis automatiquement depuis votre site web.
      </p>
       
    </div>
  </div>
`;

  try {
    const result = await resend.emails.send({
      from: 'connecttalentdev@eric-raby.com', // Use a verified domain or resendmail.com
      to: ['admin@viloassistpro.com'],                 // Your email to receive the form
      subject: `📩 Nouveau message de ${name}`,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
