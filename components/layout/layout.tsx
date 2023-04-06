import BottomText from "../bottomText/bottomText";
import Navbar from "../navbar/navbar";

function Layout(props:any) {
    return (
      <>
        <Navbar />
            <div className="relative h-full w-full bg-[url('/images/tlo_menu.webp')] bg-no-repeat  bg-fixed bg-cover">
                <div className="bg-black w-full h-full lg:bg-opacity-80">
                    <main>{props.children}</main>
                </div>
            </div>
        <BottomText />
      </>
    );
  }
  
  export default Layout;