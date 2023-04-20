// !!! This file is not used !!!
// Tried to use context to store data, but it was not working as expected. It's too complicated to handle nested objects. I decided to use server data instead.

// import { createContext, useContext, useState, useEffect } from "react";
// const DataContext = createContext();

// function DataProvider(props) {
//   /* data = {
//       userId: 19292929,
//       name: "Minki Jung"
//       people: [
//         {
//           ownerId: 19292929,
//           personId: 112342414,
//           fullName: "John Doe",
//           dob: "2021-01-01",
//           avatar: "https://www.google.com",
//           gifts: [
//             {
//               giftId: 112414214124,
//               giftName: "Gift 1",
//               store: "Store 1",
//               website: "https://www.google.com",
//             },
//           ],
//         },
//       ],
//     }
//     */

//   const [data, setData] = useState(() => {
//     return JSON.parse(sessionStorage.getItem("data"));
//   });

//   useEffect(() => {
//     sessionStorage.setItem("data", JSON.stringify(data));
//   }, [data]);

//   // Handle upto 3 levels of nesting
//   function updateDataController(value, key1, key2, key3) {
//     if (value) {
//       if (key3) {
//         const tempDate = data;
//         tempDate[key1][key2][key3] = value;
//       } else if (key2) {
//         const tempDate = data;
//         tempDate[key1][key2] = value;
//       } else if (key1) {
//         const tempDate = data;
//         tempDate[key1] = value;
//       } else {
//         return;
//       }
//       setData(tempDate);
//     }
//     return;
//   }

//   return <DataContext.Provider value={{ data, updateDataController }} {...props} />;
// }

// function useData() {
//   const context = useContext(DataContext);
//   if (!context) throw new Error("Not inside the Provider - no user is signed in");
//   return context;
// }

// export { useData, DataProvider };
