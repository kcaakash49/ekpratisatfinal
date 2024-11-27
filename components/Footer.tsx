

const Footer = () => {
    return (
      <footer className="bg-blue-950 text-gray-300 py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-4">About Us</h3>
            <p className="text-sm text-center">
              We are committed to delivering the best services and solutions for your needs. Our team is dedicated to ensuring excellence in every step.
            </p>
          </div>
  
          
  
          {/* Contact Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: ekpratisat.com</li>
              <li>Phone: +9779849247810</li>
              <li>Address: Jawalakhel</li>
            </ul>
          </div>
        </div>
  
        <div className="mt-8 border-t border-gray-900 pt-4 text-center text-sm">
          <p>© 2024 EkPratisat. All Rights Reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;