// server.js
import express from "express";
const app = express();
const PORT = process.env.PORT || 3200;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
const data = {
  coupons: [
    { couponId: 1, couponCode: "SAVE20", discount: 20 },
    { couponId: 2, couponCode: "SPEAKER10", discount: 10 },
    { couponId: 3, couponCode: "SMART5", discount: 5 },
  ],
  orders: [
    {
      id: 1,
      item: "Wireless Headphones",
      price: 100,
      status: "CONFIRMED",
      couponId: 1,
    },
    {
      id: 2,
      item: "Bluetooth Speaker",
      price: 50,
      status: "DELIVERED",
      couponId: null,
    },
    { id: 3, item: "Smartwatch", price: 200, status: "CANCELLED", couponId: 2 },
  ],
};

// Routes
// Get all coupons
app.get("/coupons", (req, res) => {
  res.json(data.coupons);
});

// Get a single coupon by ID
app.get("/coupons/:id", (req, res) => {
  const coupon = data.coupons.find((c) => c.couponId == req.params.id);
  if (coupon) {
    res.json(coupon);
  } else {
    res.status(404).send("Coupon not found");
  }
});

// Get all orders
app.get("/orders", (req, res) => {
  res.json(data.orders);
});

// Get a single order by ID
app.get("/orders/:id", (req, res) => {
  const order = data.orders.find((o) => o.id == req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).send("Order not found");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
