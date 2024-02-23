const ApiUrls = {
  common: {
    paymentMethods: "/payment-methods",
  },
  auth: {
    login: "/login",
    logout: "/logout",
    register: "/register",
    clearCookies: "/clear-cookies",
    sendVerificationEmail: "/email/send-verification",
    verifyEmailCode: "/email/verify",
  },
  user: {
    categories: "/user/categories",
  },
};

export default ApiUrls;
