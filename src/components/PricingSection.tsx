import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

const PricingSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    "Tous nos services inclus",
    "Équipe expérimentée et qualifiée",
    "Confidentialité garantie",
    "Support en français",
    "Flexibilité horaire",
    "Rapport qualité-prix exceptionnel"
  ];

  const benefitImages = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
  ];

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    class Circle {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;
      opacity: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 3 + 1;
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5;
        this.color = `rgba(200, 162, 200, ${Math.random() * 0.3 + 0.1})`;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.closePath();
      }

      update(width: number, height: number) {
        if (this.x + this.radius > width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    const circles: Circle[] = [];
    const circleCount = Math.floor((canvas.width * canvas.height) / 5000);

    for (let i = 0; i < circleCount; i++) {
      circles.push(new Circle(canvas.width, canvas.height));
    }

    let animationFrameId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const circle of circles) {
        circle.update(canvas.width, canvas.height);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="tarifs" className="py-20 relative overflow-hidden bg-black">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.6; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(147, 51, 234, 0.3); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.6), 0 0 60px rgba(236, 72, 153, 0.4); }
        }
        
        @keyframes slide-in {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        .video-background {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .floating-overlay {
          animation: float 6s ease-in-out infinite;
        }
        
        .gradient-animated {
          background: linear-gradient(-45deg, #000000, #1e1b4b, #581c87, #000000);
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }
        
        .glow-card {
          animation: glow 3s ease-in-out infinite;
        }
        
        .slide-in {
          animation: slide-in 0.8s ease-out;
        }
        
        .hover-scale {
          transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
        
        .star {
          animation: pulse 2s infinite;
          filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.7));
        }
        
        .star:nth-child(1) { animation-delay: 0s; }
        .star:nth-child(2) { animation-delay: 0.2s; }
        .star:nth-child(3) { animation-delay: 0.4s; }
        .star:nth-child(4) { animation-delay: 0.6s; }
        .star:nth-child(5) { animation-delay: 0.8s; }
        
        .benefit-image {
          transition: all 0.3s ease;
        }
        
        .benefit-image:hover {
          transform: scale(1.1) rotate(5deg);
          filter: brightness(1.1);
        }
      `}</style>

      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 w-full h-full opacity-30"
      />

      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover video-background opacity-20"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 gradient-animated opacity-90" />
        <div className="absolute inset-0 floating-overlay">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-900/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-pink-900/20 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-32 left-40 w-40 h-40 bg-violet-900/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-fuchsia-900/20 rounded-full blur-lg animate-bounce"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-16 slide-in">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Tarification Simple
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Un tarif unique et transparent pour tous nos services d'assistance virtuelle
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="relative overflow-hidden border-2 border-purple-400/30 shadow-2xl bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm glow-card hover-scale">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-900 to-pink-900 animate-pulse"></div>
            
            <CardHeader className="text-center pt-8">
              <div className="flex justify-center mb-4">
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className="star w-12 h-12 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
                    </svg>
                  ))}
                </div>
              </div>
              
              <CardTitle className="text-3xl font-bold text-gray-900">
                Tarif Unique
              </CardTitle>
              
              <div className="py-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-6xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent animate-pulse">
                    10€
                  </span>
                  <span className="text-2xl font-semibold text-gray-700 ml-2">
                    /heure
                  </span>
                </div>
                <p className="text-gray-600 mt-2">
                  Pour tous nos services
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4 slide-in hover-scale" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden shadow-lg relative">
                      <img
                        src={benefitImages[index]}
                        alt={`Benefit ${index + 1}`}
                        className="benefit-image absolute w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.classList.add('bg-purple-200', 'flex', 'items-center', 'justify-center');
                          const fallback = document.createElement('div');
                          fallback.className = 'text-purple-800 text-2xl';
                          fallback.textContent = '✓';
                          target.parentElement!.appendChild(fallback);
                        }}
                      />
                    </div>
                    <span className="text-gray-800 font-medium text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-300">
                <Button 
                  onClick={scrollToContact}
                  className="w-full bg-gradient-to-r from-purple-900 to-pink-900 hover:from-purple-800 hover:to-pink-800 text-white text-lg py-6 shadow-lg hover-scale animate-pulse"
                  size="lg"
                >
                  Commencer dès maintenant
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600">
                <p className="font-semibold text-purple-800">
                  Gagnez un temps précieux pour vous concentrer sur l'essentiel : 
                  le développement de votre activité !
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto shadow-lg border border-gray-800 hover-scale">
            <h3 className="text-2xl font-bold text-white mb-6 animate-pulse">
              Pourquoi choisir notre tarif unique ?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center slide-in hover-scale" style={{animationDelay: '0.2s'}}>
                <div className="w-28 h-28 rounded-2xl mx-auto mb-4 overflow-hidden animate-bounce shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&h=250&q=80"
                    alt="Transparence"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-white mb-2">Transparence totale</h4>
                <p className="text-gray-300">Aucun frais caché, aucune surprise. Un tarif clair et simple.</p>
              </div>
              <div className="text-center slide-in hover-scale" style={{animationDelay: '0.4s'}}>
                <div className="w-28 h-28 rounded-2xl mx-auto mb-4 overflow-hidden animate-bounce shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&h=250&q=80"
                    alt="Simplicité"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-white mb-2">Simplicité</h4>
                <p className="text-gray-300">Un seul tarif pour tous nos services, facile à budgétiser.</p>
              </div>
              <div className="text-center slide-in hover-scale" style={{animationDelay: '0.6s'}}>
                <div className="w-28 h-28 rounded-2xl mx-auto mb-4 overflow-hidden animate-bounce shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&h=250&q=80"
                    alt="Qualité"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-white mb-2">Qualité garantie</h4>
                <p className="text-gray-300">Le même niveau d'excellence pour chaque mission.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;