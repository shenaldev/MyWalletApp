const ApiUrls = {
  common: {
    paymentMethods: "/payment-methods",
  },
  auth: {
    login: "/login",
    logout: "/logout",
    register: "/register",
    clearCookies: "/clear-cookies",
    sendVerificationEmail: "/email-verification",
    verifyEmailCode: "/email-verify",
    checkToken: "/check-token",
  },
  user: {
    categories: "/user/categories",
    payments: "/user/payments",
    incomes: "/user/incomes",
  },
};

export default ApiUrls;
