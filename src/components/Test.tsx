// import axios from "axios";
// import { useEffect, useState } from "react";

// const api_url = "https://api.unsplash.com";
// const apiKey = import.meta.env.VITE_API_KEY;

// const Test = () => {
//   const [statistics, setStatistics] = useState([]);

//   useEffect(() => {
//     axios
//       .get(
//         `${api_url}/search/photos?query=dog&per_page=10&page=1&order_by=popular&client_id=${apiKey}`
//       )
//       .then((res) => {
//         const photoIds = res.data.results.map((photo) => photo.id);
//         // Fetch statistics for each photo
//         Promise.all(
//           photoIds.map((photoId) =>
//             axios.get(
//               `${api_url}/photos/${photoId}/statistics?client_id=${apiKey}`
//             )
//           )
//         )
//           .then((responses) => {
//             const photoStatistics = responses.map((response) => response.data);
//             setStatistics(photoStatistics);
//             console.log(photoStatistics);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return <div>Test</div>;
// };

// export default Test;
