import React, { useState } from "react";
import PropTypes from "prop-types";
import { Mail, Phone, HardDrive } from "lucide-react";
import classNames from "classnames";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contactInfoList = [
  {
    icon: Mail,
    label: "email@easyfrontend.com",
    href: "mailto:email@easyfrontend.com",
  },
  {
    icon: Phone,
    label: "+91 9876543210",
    href: "callto:+91 9876543210",
  },
  { icon: HardDrive, label: "easyfrontend.com", href: "easyfrontend.com" },
];

const ContactForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      toast.error('Please fill all required fields correctly');
      return;
    }

    try {
      const formData = {
        name: form.elements[0].value,
        email: form.elements[1].value,
        message: form.elements[2].value,
      };

      const response = await toast.promise(
        axios.post("http://wetoomedia.rf.gd/submit.php", formData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false // Important for CORS
        }),
        {
          pending: 'Sending message...',
          success: 'Message sent successfully! 👌',
          error: {
            render({data}) {
              // When the promise reject, data will contain the error
              return data?.message || 'Failed to send message 🤯';
            }
          }
        }
      );
      
      setValidated(true);
      form.reset();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="w-full" noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          className="min-h-[48px] leading-[48px] bg-[#F2F6FD] dark:bg-[#2A384C] border border-transparent rounded-xl focus:outline-none focus:border focus:border-[#86b7fe] w-full px-5"
          placeholder="Enter Name"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          className="min-h-[48px] leading-[48px] bg-[#F2F6FD] dark:bg-[#2A384C] border border-transparent rounded-xl focus:outline-none focus:border focus:border-[#86b7fe] w-full px-5"
          placeholder="Enter Email"
        />
      </div>
      <div className="mb-4">
        <textarea
          name="message"
          className="min-h-[48px] leading-[48px] bg-[#F2F6FD] dark:bg-[#2A384C] border border-transparent rounded-xl focus:outline-none focus:border focus:border-[#86b7fe] w-full px-5"
          placeholder="Enter Message"
          rows="4"
        ></textarea>
      </div>
      <div className="text-start">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-opacity-90 text-white px-8 py-3 rounded mb-4 disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

const ContactFormCard = () => (
  <div className="bg-white dark:bg-[#162231] rounded-2xl border-[5px] sm:border-[15px] dark:border-[#1C293A] border-[#F4F7FD] border-solid ma p-6 md:p-12">
    <h2 className="text-2xl md:text-[45px] leading-none font-bold mb-4">
      Contact Us
    </h2>
    <p className="text-lg mb-12">
      We list your menu online, help you process your orders.
    </p>

    <ContactForm />
  </div>
);

const ContactInfo = ({ contactInfoList }) => (
  <div className="flex flex-col justify-center h-full -ml-14">
    {contactInfoList.map((info, i) => (
      <div
        className={classNames(
          "bg-gray-100 shadow dark:bg-gray-800 max-w-[350px] flex items-center rounded-xl p-2",
          { "mt-6": i }
        )}
        key={i}
      >
        <info.icon className="w-10 h-10 px-2" />
        <a className="text-lg font-medium ml-4" href={info.href || "#!"}>
          {info.label}
        </a>
      </div>
    ))}
  </div>
);

ContactInfo.propTypes = {
  contactInfoList: PropTypes.array.isRequired,
};

const Contact = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <section className="ezy__contact10 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-hidden">
        <div className="container px-4">
          <div className="grid grid-cols-12 py-6 gap-4 sm:gap-14">
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 sm:order-2 mb-4 lg:mb-0">
              <div className="relative min-h-[300px] rounded-2xl sm:min-h-[500px] lg:min-h-[150px] mx-auto w-full sm:w-[50vw] h-full">
                <img
                  src="https://cdn.easyfrontend.com/pictures/contact/contact_7.png"
                  alt="Contact background"
                  className="absolute inset-0 rounded-2xl w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute sm:relative top-1/2 left-1/2 -translate-x-[37.5%] sm:-translate-x-1/2 -translate-y-1/2 z-10">
                  <ContactInfo contactInfoList={contactInfoList} />
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5">
              <ContactFormCard />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
