import { Restaurant } from "../models/RestaurantModel.js";

// create
export const restaurantCreate = async (req, res) => {
  try {
    // destructure values from req.body
    const { name, address, phone_number, rating } = req.body;

    // validation
    if (!name || !address || !phone_number) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });
    }
    // check restaurant available
    const restaurantExist = await Restaurant.findOne({ name });
    if (restaurantExist) {
      return res
        .status(400)
        .json({ success: false, message: "restaurant already exist" });
    }
    // create new restaurant
    const newRestaurant = new Restaurant({
      name,
      address,
      phone_number,
      rating,
    });

    // save restaurant
    await newRestaurant.save();

    res.status(200).json({
      success: true,
      message: "Restaurant created successfully",
      data: newRestaurant,
    });
  } catch (error) {
    // send error response
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// getall restaurant
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.status(200).json({
      success: true,
      message: "restaurants list fetched",
      data: restaurants,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// controllers/revenueController.js

export const calculateTotalRevenue = (req, res) => {
  const { orders } = req.body;

  //check order is array
  if (!Array.isArray(orders) || orders.length === 0) {
    return res.status(400).json({ message: "Invalid or empty orders list" });
  }

  // Calculate total revenue
  try {
    const totalRevenue = orders.reduce((total, order) => {
      const { quantity, price_per_item } = order;

      if (
        typeof quantity === "number" &&
        quantity > 0 &&
        typeof price_per_item === "number" &&
        price_per_item > 0
      ) {
        total += quantity * price_per_item;
      } else {
        res
          .status(400)
          .json({ message: "invalid quantity or price per item " });
      }

      return total;
    }, 0);

    // Respond with total revenue
    res
      .status(200)
      .json({
        sucess: true,
        message: "calculated revenue",
        data: totalRevenue,
      });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
