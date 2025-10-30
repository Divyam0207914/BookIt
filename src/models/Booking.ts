import  { Schema, model, models } from "mongoose";

const bookingSchema = new Schema({
  experienceId: {
    type: Schema.Types.ObjectId,
    ref: "Experience",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  promoCode: { type: String },
  success: { type: Boolean, default: true },
});

const Booking = models.Booking || model("Booking", bookingSchema);
export default Booking;
