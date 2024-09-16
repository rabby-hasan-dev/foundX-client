import { Input } from "@nextui-org/input";
import { SearchIcon } from "../../icons";

const Landing = () => {
    return (
        <div className=" h-[calc(100vh-64px)]  bg-[url('/glass.jpg')] ">
         
         <div className=" pt-32 flex-1 max-w-xl mx-auto">
           <form className="flex-1" >
           <Input
           aria-label="Search"
           placeholder="Search..."
           size="lg"
           classNames={{
            inputWrapper:"bg-default-100",
            input:"text-sm"
           }}
           startContent={
          <SearchIcon className="flex-shrink-0 pointer-events-none text-base "></SearchIcon>
           }
           type="text"
           ></Input>
           </form>
         </div>

        </div>
    );
};

export default Landing;