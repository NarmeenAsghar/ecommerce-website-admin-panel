const checkoutSchema = {
  name: "checkout",
  title: "Checkout Page",
  type: "document",
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
    },
    {
      name: "companyName",
      title: "Company Name",
      type: "string",
      description: "Optional field for company name.",
    },
    {
      name: "phone",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "email",
      title: "Email Address",
      type: "string",
    },
    {
      name: "streetAddress",
      title: "Street Address",
      type: "string",
    },
    {
      name: "townCity",
      title: "Town/City",
      type: "string",
    },
    {
      name: "province",
      title: "Province",
      type: "string",
    },
    {
      name: "zipCode",
      title: "Zip Code",
      type: "string",
    },
    {
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          { title: "Credit Card", value: "creditCard" },
          { title: "PayPal", value: "paypal" },
          { title: "Bank Transfer", value: "bankTransfer" },
        ],
      },
    },
    {
      name: "orderStatus",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "Pending" },
          { title: "Shipped", value: "Shipped" },
          { title: "Delivered", value: "Delivered" },
        ],
      },
      initialValue: "Pending",
    },
    {
      name: "estimatedDeliveryDate",
      title: "Estimated Delivery Date",
      type: "string",
      description: "Expected delivery date for the order.",
    },
  ],
};

export default checkoutSchema;
