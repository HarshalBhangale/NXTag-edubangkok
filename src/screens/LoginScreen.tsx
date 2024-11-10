// /* eslint-disable jsx-a11y/alt-text */
// "use client";
// import { useNavigate } from "react-router-dom";
// import { usePrivy } from "@privy-io/react-auth";

// const LoginScreen = () => {
//   const navigate = useNavigate();
//   // Privy hooks
//   const {
//     ready,
//     authenticated,
//     login
//   } = usePrivy();

//   if (!ready) {
//     return null;
//   }

//   return (
//     <div className="flex flex-col items-center justify-between h-screen py-8 bg-[#E0E0E2] px-4 sm:px-8">
//       <div className="bg-[#727774] rounded-full w-36 h-12 flex items-center justify-center p-2 sm:w-48 sm:h-14">
//         <h1 className="text-xl font-bold text-white sm:text-2xl">NXtag</h1>
//       </div>
//       <div className="flex flex-col items-center mt-8 sm:mt-12">
//         <div className="w-56 h-56 flex items-center justify-center">
//           <img src="/images/logo.png" />
//         </div>
//       </div>
//       <div className="flex items-center justify-center mb-8 sm:mb-12">
//         {/* {openConnectModal ? (
//           <button
//             className="px-4 py-2 bg-white text-black rounded w-full max-w-xs sm:w-48 sm:py-3 font-semibold text-lg sm:text-xl"
//             onClick={openConnectModal}
//             type="button"
//           >
//             Connect Wallet
//           </button>
//         ) : (
//           <button
//             className="px-4 py-2 bg-white text-black rounded w-full max-w-xs sm:w-48 sm:py-3 font-semibold text-lg sm:text-xl"
//             onClick={() => navigate("/screen3")}
//             type="button"
//           >
//             Launch
//           </button>
//         )} */}

//         {ready && !authenticated && (
//           <>
//             <div className="flex items-center gap-4">
//               <button
//                 className="px-4 py-2 bg-white text-black rounded w-full max-w-xs sm:w-48 sm:py-3 font-semibold text-lg sm:text-xl"
//                 onClick={login}
//                 type="button"
//               >
//                 Login
//               </button>
//             </div>
//           </>
//         )}
//         {ready && authenticated && (
//           <>
//             <button
//               className="px-4 py-2 bg-white text-black rounded w-full max-w-xs sm:w-48 sm:py-3 font-semibold text-lg sm:text-xl"
//               onClick={() => navigate("/screen3")}
//               type="button"
//             >
//               Launch
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LoginScreen;
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";

const LoginScreen = () => {
  const navigate = useNavigate();
  const { ready, authenticated, login } = usePrivy();

  if (!ready) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gradient-to-b from-indigo-600 via-purple-500 to-pink-500 py-8 px-4 sm:px-8">
      {/* Logo Container with Glassmorphism */}
      <div className="bg-white/10 backdrop-blur-lg rounded-full w-36 h-12 flex items-center justify-center p-2 sm:w-48 sm:h-14 border border-white/20 shadow-lg">
        <h1 className="text-xl font-bold text-white sm:text-2xl">NXtag</h1>
      </div>

      {/* Center Image Container with Glow Effect */}
      <div className="flex flex-col items-center mt-8 sm:mt-12">
        <div className="w-56 h-56 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-white/5 rounded-full blur-xl"></div>
          <div className="relative">
            <img 
              src="/images/logo.png" 
              className="drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Button Container with Glass Effect */}
      <div className="flex items-center justify-center mb-8 sm:mb-12">
        {ready && !authenticated && (
          <div className="flex items-center gap-4">
            <button
              className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg w-full 
                         max-w-xs sm:w-48 font-semibold text-lg sm:text-xl
                         border border-white/20 shadow-lg
                         hover:bg-white/20 transition-all duration-300
                         hover:scale-105 active:scale-95"
              onClick={login}
              type="button"
            >
              Login
            </button>
          </div>
        )}
        {ready && authenticated && (
          <button
            className="px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg w-full 
                       max-w-xs sm:w-48 font-semibold text-lg sm:text-xl
                       border border-white/20 shadow-lg
                       hover:bg-white/20 transition-all duration-300
                       hover:scale-105 active:scale-95"
            onClick={() => navigate("/screen3")}
            type="button"
          >
            Launch
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;