//npm i nodemailer
const nodemailer = require("nodemailer");

module.exports.sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nm262345@gmail.com",
      pass: "xatf isyl usmv bdbi",
    },
  });

  await transporter.sendMail(
    {
      from: '"NM" <nm262345@gmail.com>', // sender address
      to: options.email, // list of receivers
      subject: "Hello this is test ✔", // Subject line
      html: `
      <div style="background:#bbf ;color:#fff ;padding:20px">
      <img src="https://www.google.com/imgres?q=ff&imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F52%2F6a%2F8d%2F526a8d729c5054ea2f1acc66fac2fe8f.jpg&imgrefurl=https%3A%2F%2Fin.pinterest.com%2Fpin%2Findian-gaming-ff-in-2023--971722057082075361%2F&docid=cvqWmrQr_imvYM&tbnid=41FkoyYLS6jrUM&vet=12ahUKEwjh7IqI5_SFAxVmXvEDHbkICm0QM3oECEUQAA..i&w=736&h=736&hcb=2&ved=2ahUKEwjh7IqI5_SFAxVmXvEDHbkICm0QM3oECEUQAA"/>
       <p>Hello i am Nabil</p> 
       <a href='http://localhost:3000/users/verify/${options.token}'>verify</a>
       </div>
                
      `,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    }
  );
};
