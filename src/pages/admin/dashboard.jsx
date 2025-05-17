import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AdminLayout from "@/components/layouts/AdminLayout";

const projects = [
  {
    title: "Project Alpha",
    description: "An innovative project aimed at improving efficiency.",
    clientName: "John Doe",
    date: "2025-05-16",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    title: "Project Beta",
    description: "A collaborative effort to enhance user experience.",
    clientName: "Jane Smith",
    date: "2025-05-14",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  {
    title: "Project Gamma",
    description: "Development of a new scalable solution for clients.",
    clientName: "Acme Corp",
    date: "2025-05-12",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
];

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
          <p className="mt-2">Manage your projects easily.</p>
        </motion.div>

        <Card>
          <CardContent>
            <h2 className="text-lg font-bold mb-4">Project Dashboard</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Title</th>
                  <th className="border border-gray-300 p-2 text-left">Description</th>
                  <th className="border border-gray-300 p-2 text-left">Client Name</th>
                  <th className="border border-gray-300 p-2 text-left">Date</th>
                  <th className="border border-gray-300 p-2 text-left">Images</th>
                  <th className="border border-gray-300 p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-300 p-2">{project.title}</td>
                    <td className="border border-gray-300 p-2">{project.description}</td>
                    <td className="border border-gray-300 p-2">{project.clientName}</td>
                    <td className="border border-gray-300 p-2">{project.date}</td>
                    <td className="border border-gray-300 p-2">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="border border-gray-300 p-2 space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </AdminLayout>
  );
};

export default Dashboard;
