import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AdminLayout from "@/components/layouts/AdminLayout";


const Dashboard = () => {
  return (
    <AdminLayout>
      <main className="col-span-9 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-oren text-white rounded-2xl p-4 shadow-lg"
        >
          <h1 className="text-xl font-bold">Welcome Back!</h1>
          <p className="mt-2">Manage your testimonials easily.</p>
        </motion.div>

        <Card>
          <CardContent>
            <h2 className="text-lg font-bold mb-4">Add Testimonial</h2>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                className="w-full"
              />

              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg mt-2"
              />

              <textarea
                placeholder="Description"
                className="w-full p-2 border rounded-lg"
              ></textarea>
              <Button
                variant="outline"
                className="w-full"
              >
                Add Testimoni
              </Button>
              {/* {error && <p className="text-red-600 mt-2">{error}</p>} */}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-bold mb-4">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                className="p-4 border rounded-lg bg-white shadow"
              >
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                  alt="Testimonial"
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <p>description</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </AdminLayout>
  );
};

export default Dashboard;
