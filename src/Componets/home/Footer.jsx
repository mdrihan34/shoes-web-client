import { useNavigate } from "react-router-dom"

const Footer = () => {
  
   
  return (
    <div>
      <footer className="flex  flex-col space-y-10 justify-center m-10">


<div className="flex justify-center space-x-5">
    <a href="#"  rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
    </a>
    <a href="#"  rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
    </a>
    <a href="#"  rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
    </a>
    <a href="#"  rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
    </a>
    <a href="#"  rel="noopener noreferrer">
        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
    </a>
</div>
<p className="text-center text-gray-700 font-medium">&copy; 2022 Company Ltd. All rights reservered.</p>
</footer>
    </div>
  )
}

export default Footer
