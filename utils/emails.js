exports.messageNotification = (to, { subject, name, email, message, phone }) => (
    {
        from: 'admin@patrimonioturismo.com',
        to, subject,
        html: `
        <div>
            <h3> Has recibido un mensaje de ${name}: </h3>
            <div style="">
                ${message}
            </div>
            <div>
                <a style="text-decoration: none; " href="mailto:${email}"> Envíale un correo </a>
                <a href="tel:${phone}"> Llámalo por teléfono </a>
            </div>
        </div>
        `
    }
)