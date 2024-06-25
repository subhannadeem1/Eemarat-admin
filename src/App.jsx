import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <main className="bg-primary text-tertiary">
      <Toaster position="top-center" />
      <div className="mx-auto max-w-[1500px]">
        <Navbar />
        <Admin />
      </div>
    </main>
  );
}
