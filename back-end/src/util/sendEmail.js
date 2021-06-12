import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({to, from, subject, text, html}) => {
    return sendgrid.send({to, from, subject, text, html});
};

export default sendEmail;