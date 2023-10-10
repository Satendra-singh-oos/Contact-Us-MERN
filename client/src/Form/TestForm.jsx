import React, { useState } from "react";
import axios from "axios";

const TestForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/v1/contact", formData);
      alert("Form Submited Succesfully");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        telephone: "",
        message: "",
      });
    } catch (err) {
      console.log(err);
      alert("An Error Occured While Submitting the form CHeck Details again ");
    }
  };

  return (
    <div className="container mx-auto my-20 w-1/3 border border-purple-500 bg-white">
      <div className="p-5 space-y-5 shadow:xl">
        <h4 className="text-center text-3xl">Contact-Us</h4>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="First-Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
            />

            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500"
            />
            <div className="flex gap-2">
              <select
                id="country"
                name="country"
                className="h-full rounded-md border border-gray-500   py-0 pl-4 pr-9 text-gray-700 focus:ring-2 focus:outline-none focus:border-purple-500 sm:text-sm"
              >
                <option>US</option>
                <option>CA</option>
                <option>EU</option>
              </select>
              <input
                type="number"
                placeholder="Phone No"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
              />
            </div>
            <input
              type="email"
              placeholder="yourEmail@mail.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
            />

            <textarea
              placeholder="Your Message Here....."
              id=""
              cols="10"
              rows="5"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2"
            ></textarea>
          </div>

          {/* <input
            type="submit"
            value="Send Message"
            className="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full"
          /> */}

          <button
            type="submit"
            className="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestForm;
