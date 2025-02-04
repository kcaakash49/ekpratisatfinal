// "use client";


// import { LoginButton } from "./LoginButton";
// import AvatarDropdown from "./AvatarDropDown";
// import { useSession } from "next-auth/react";
// import { Session } from "next-auth";
// import Loading from "./Loading";

// interface SessionType {
//     data: {
//       user?: {
//         email?: string | null | undefined;
//         id?: number;
//         fullname?: string;
//         role?: string;
//         image?: string | null;
//       };
//       expires: string;
//     } | null | undefined;
//     status: "authenticated" | "unauthenticated" | "loading";
//     update: (data?: unknown) => Promise<Session | null>;
//   }
  
  
  
  

// export default function (){
//     const session: SessionType = useSession();
//     // console.log(session)
//     if (session.status === "loading"){
//         return <div>
//             {/* <Loading/> */}
//         </div>
//     }
    
//     return (
//         <div>
//             {
//                 !session.data ? (
//                     <LoginButton/>
//                 ) : (
//                     <AvatarDropdown/>
                    
//                 )
//             }

//         </div>
//     )
// }

"use client";
import { useSession } from "next-auth/react";
import { LoginButton } from "./LoginButton";
import AvatarDropdown from "./AvatarDropDown";
import { useEffect, useState } from "react";

export default function AuthComponent() {
  const session:any = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set true only after hydration
  }, []);

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div>
      {session.status === "loading" ? (
        <div>Loading...</div>
      ) : !session.data ? (
        <LoginButton />
      ) : (
        <AvatarDropdown />
      )}
    </div>
  );
}
