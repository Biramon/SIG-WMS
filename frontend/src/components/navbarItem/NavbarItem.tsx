import { useNavigate } from "react-router-dom";

const NavbarItem = ({label, href}:{label:string, href:string}) => {
    const navigate = useNavigate();

    const handleOnClick = () => {
       navigate(href)
    }

    return (  
        <li className="relative group flex items-center justify-center">
            <a onClick={handleOnClick} href={href}>{label}</a>
        </li>
    );
}
 
export default NavbarItem;