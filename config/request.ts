// import { extend } from 'umi-request';
//
// const request = extend({
//   // prefix: '/api', // Địa chỉ tiền tố cho tất cả các yêu cầu
//   timeout: 10000, // Thời gian chờ tối đa
//   errorHandler: error => {
//     console.error('Request error:', error);
//   },
//   headers: {
//     'Authorization': 'Bearer '
//   }
// });
//
// request.interceptors.request.use((url, options) => {
//     const headers = {
//       ...options.headers,
//       Authorization: `Bearer `,
//     };
//     return {
//       url,
//       options: { ...options, headers },
//     };
// });
//
// export default request;
