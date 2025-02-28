import React, { useState } from "react";
import emailjs from "emailjs-com";
import Title from "../layouts/Title";
import ContactLeft from "./ContactLeft";

const Contact = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Email Validation
  const emailValidation = () => {
    return String(email)
      .toLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (username === "") {
      setErrMsg("Username is required!");
    } else if (phoneNumber === "") {
      setErrMsg("Phone number is required!");
    } else if (email === "") {
      setErrMsg("Please give your Email!");
    } else if (!emailValidation(email)) {
      setErrMsg("Give a valid Email!");
    } else if (subject === "") {
      setErrMsg("Please give your Subject!");
    } else if (message === "") {
      setErrMsg("Message is required!");
    } else {
      const templateParams = {
        from_name: username,
        from_email: email,
        from_phone: phoneNumber,
        subject: subject,
        message: message,
      };

      emailjs
        .send("service_n6u236j", "template_3jjq8lp", templateParams, "TCMvCT8Y-pkZStutE")
        .then((response) => {
          setSuccessMsg(`Thank you dear ${username}, Your Message has been sent successfully!`);
          setErrMsg("");
          setUsername("");
          setPhoneNumber("");
          setEmail("");
          setSubject("");
          setMessage("");
        })
        .catch((error) => {
          setErrMsg("Failed to send message. Please try again.");
          console.error("EmailJS error:", error);
        });
    }
  };

  return (
    <section id="contact" className="w-full py-20 border-b-[1px] border-b-black">
      <div className="flex justify-center items-center text-center">
        <Title title="CONTACT" des="Contact With Me" />
      </div>
      <div className="w-full">
        <div className="w-full h-auto flex flex-col lgl:flex-row justify-between">
          <ContactLeft />
          <div className="w-full lgl:w-[60%] h-full py-10 bg-gradient-to-r from-[#1e2024] to-[#23272b] flex flex-col gap-8 p-4 lgl:p-8 rounded-lg shadow-shadowOne">
            <form className="w-full flex flex-col gap-4 lgl:gap-6 py-2 lgl:py-5" onSubmit={handleSend}>
              {errMsg && <p className="text-orange-500 text-base text-center">{errMsg}</p>}
              {successMsg && <p className="text-green-500 text-base text-center">{successMsg}</p>}

              <div className="w-full flex flex-col lgl:flex-row gap-10">
                <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Your name</p>
                  <input onChange={(e) => setUsername(e.target.value)} value={username} className="contactInput" type="text" />
                </div>
                <div className="w-full lgl:w-1/2 flex flex-col gap-4">
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Phone Number</p>
                  <input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} className="contactInput" type="text" />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className="contactInput" type="email" />
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Subject</p>
                <input onChange={(e) => setSubject(e.target.value)} value={subject} className="contactInput" type="text" />
              </div>

              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-400 uppercase tracking-wide">Message</p>
                <textarea onChange={(e) => setMessage(e.target.value)} value={message} className="contactTextArea" cols="30" rows="8"></textarea>
              </div>

              <div className="w-full">
                <button className="w-full h-12 bg-[#141518] rounded-lg text-base text-gray-400 tracking-wider uppercase hover:text-white duration-300 hover:border-[1px] hover:border-designColor border-transparent">
                  Send Message
                </button>
              </div>

              {errMsg && <p className="text-orange-500 text-base text-center">{errMsg}</p>}
              {successMsg && <p className="text-green-500 text-base text-center">{successMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
