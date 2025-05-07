
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Hero Section */}
      <header className="container mx-auto pt-12 px-4">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-2">
              <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 7h-1V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
                <path d="M16 6H8" />
                <path d="M12 12v3" />
                <path d="M10 14h4" />
              </svg>
            </div>
            <span className="text-2xl font-bold">D-Attend</span>
          </div>
          <div className="hidden md:flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/login')}>Get Started</Button>
          </div>
          <Button className="md:hidden" onClick={() => navigate('/login')}>Login</Button>
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between py-16">
          <div className="max-w-lg mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Decentralized</span> 
              <br />Attendance Tracking
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Securely track attendance and issue verifiable credentials using blockchain technology.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => navigate('/login')}>
                Start for Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -z-10 blur-3xl opacity-30 rounded-full w-72 h-72 bg-primary -top-10 -right-10" />
            <div className="w-full max-w-md bg-card border rounded-lg shadow-xl overflow-hidden">
              <div className="p-6 bg-primary/10 border-b">
                <h3 className="text-lg font-medium">Attendance Dashboard</h3>
                <p className="text-sm text-muted-foreground">Secure, transparent, verifiable</p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="h-2 w-3/4 bg-muted rounded animate-pulse" />
                  <div className="h-2 w-1/2 bg-muted rounded animate-pulse" />
                  <div className="h-8 w-full bg-muted/50 rounded animate-pulse mt-4" />
                  
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="h-16 bg-muted/50 rounded animate-pulse" />
                    <div className="h-16 bg-muted/50 rounded animate-pulse" />
                    <div className="h-16 bg-muted/50 rounded animate-pulse" />
                    <div className="h-16 bg-muted/50 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Authentication</h3>
                <p className="text-muted-foreground">Connect with your wallet for secure, passwordless authentication.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Verifiable Credentials</h3>
                <p className="text-muted-foreground">Issue and verify attendance as NFT badges on the blockchain.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Tracking</h3>
                <p className="text-muted-foreground">Monitor attendance in real-time with powerful analytics.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            Join the future of attendance tracking with D-Attend.
          </p>
          <Button size="lg" onClick={() => navigate('/login')}>
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/20 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 7h-1V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z" />
                  <path d="M16 6H8" />
                  <path d="M12 12v3" />
                  <path d="M10 14h4" />
                </svg>
              </div>
              <span className="font-bold">D-Attend</span>
            </div>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">Contact</a>
            </div>
          </div>
          <div className="text-center mt-8 text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} D-Attend. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
