import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout>
      <section className="ink-bg text-primary-foreground min-h-[70vh] grid place-items-center">
        <div className="container-tight text-center py-24">
          <p className="text-xs uppercase tracking-[0.3em] text-accent mb-4">404</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight mb-5">Page not found</h1>
          <p className="text-primary-foreground/70 max-w-md mx-auto mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
