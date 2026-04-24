import NavbarItem from "../navbarItem/NavbarItem";


const Navbar = () => {


    return ( 
    <div className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
        <NavbarItem label="Home" href="/" />
    </div> 
    );
}
 
export default Navbar;