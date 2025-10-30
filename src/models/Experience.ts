import mongoose, { Schema, model, models } from "mongoose";

export interface ISlot {
  date: string;
  time: string;
  booked: boolean;
}

export interface IExperience {
  title: string;
  description: string;
  image: string;
  price: number;
  availableSlots: ISlot[];
  _id?: mongoose.Types.ObjectId;
}

const experienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  availableSlots: [
    {
      date: { type: String, required: true },
      time: { type: String, required: true },
      booked: { type: Boolean, default: false },
    },
  ],
});

const Experience = models?.Experience || model<IExperience>("Experience", experienceSchema);
export default Experience;
