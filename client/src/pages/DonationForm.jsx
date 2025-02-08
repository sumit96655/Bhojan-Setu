"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Camera, MapPin } from "lucide-react"

export function DonationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [image, setImage] = useState(null)

  const onSubmit = (data) => {
    console.log(data)
    // TODO: Implement API call to submit donation
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Donate Food</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="foodType" className="block text-sm font-medium text-gray-700">
            Food Type
          </label>
          <input
            type="text"
            id="foodType"
            {...register("foodType", { required: "Food type is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {errors.foodType && <p className="mt-1 text-sm text-red-600">{errors.foodType.message}</p>}
        </div>

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity (in kg)
          </label>
          <input
            type="number"
            id="quantity"
            {...register("quantity", { required: "Quantity is required", min: 0 })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>}
        </div>

        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            {...register("expiryDate", { required: "Expiry date is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {errors.expiryDate && <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Pickup Location
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="location"
              {...register("location", { required: "Pickup location is required" })}
              className="flex-grow rounded-none rounded-l-md border-gray-300 focus:border-green-500 focus:ring-green-500"
            />
            <button
              type="button"
              className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
              onClick={() => {
                // TODO: Implement geolocation
                console.log("Get current location")
              }}
            >
              <MapPin className="h-5 w-5" />
            </button>
          </div>
          {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Food Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image) || "/placeholder.svg"}
                  alt="Food"
                  className="mx-auto h-32 w-32 object-cover rounded"
                />
              ) : (
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
              )}
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Submit Donation
          </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

