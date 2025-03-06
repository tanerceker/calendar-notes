
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/30">
      <div className="text-center animate-in fade-in max-w-md glass-effect rounded-lg p-8 card-shadow">
        <div className="flex justify-center mb-6">
          <Calendar className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! The page you are looking for doesn't exist.
        </p>
        <Button asChild>
          <a href="/" className="focus-ring">
            Return to Calendar
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
