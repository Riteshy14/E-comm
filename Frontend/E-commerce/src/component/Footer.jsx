import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-50 mt-15">
      <div className="max-w-7xl mx-auto px-6 py-10 sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 text-sm text-gray-600">
        <div>
          <h2 className="text-lg font-bold mb-5">E-comm</h2>
          <p className="md:w-2/3">
          E-comm delivers timeless apparel crafted to be part of your story. Each garment is designed with care, ensuring it stands the test of time while reflecting your authentic style.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-5">COMPANY</h3>
          {/* <nav aria-label="Company">
            <ul className="flex flex-col gap-2">
              {['Home', 'contact', 'about', 'contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gray-800 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </nav> */}
          <div className="">
          {[
            { name: "Home", path: "/" },
            { name: "Collection", path: "/collection" },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className="block py-1 hover:text-black"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-5">GET IN TOUCH</h3>
          <address className="not-italic flex flex-col gap-2">
            <span>📞 +91 xxxxxxxxxx</span>
            <span>✉️ contact@E-comm.com</span>
          </address>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <p className="py-5 flex justify-center items-center text-sm text-center text-gray-600">
          &copy; 2025 E-comm. &copy; All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
