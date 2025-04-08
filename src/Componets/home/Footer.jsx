const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 pt-10 pb-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          
     
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">SoleSphere</h2>
            <p className="text-sm">We bring you the most stylish and comfortable shoes for all occasions. Quality and fashion meet here.</p>
          </div>
 
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Cart</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
  
         
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
  
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#"><img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" alt="Facebook" /></a>
              <a href="#"><img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" alt="LinkedIn" /></a>
              <a href="#"><img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" alt="Instagram" /></a>
              <a href="#"><img src="https://img.icons8.com/fluent/30/000000/twitter.png" alt="Twitter" /></a>
            </div>
          </div>
  
        </div>
  

        <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} SoleSphere. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  