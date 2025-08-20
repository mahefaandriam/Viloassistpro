import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Plus, X, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTestimonials } from '@/hooks/useTestimonials';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [testimonialsLoaded, setTestimonialsLoaded] = useState(false);
  
  const DEFAULT_BACKGROUND = {
    image: "/images/rousseau.jpeg",
    // Position optionnelle
    position: "center center",
    // Effet optionnel
    overlay: "bg-gradient-to-br from-gray-900/70 to-vilo-purple-900/50"
  };

  // Utilisation du hook
  const { 
    testimonials: apiTestimonials, 
    isLoading, 
    fetchTestimonials, 
    createTestimonial 
  } = useTestimonials();

  // État du formulaire avec validation
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: ''
  });

  // Témoignages par défaut (fallback uniquement si aucun témoignage approuvé)
  const defaultTestimonials = [
    {
      name: "Marie Dubois",
      company: "Cabinet d'Expertise Comptable",
      role: "Directrice",
      content: "VILO ASSIST-PRO nous accompagne depuis 3 ans. Leur professionnalisme et leur discrétion sont remarquables. Nous avons gagné un temps précieux sur nos tâches administratives.",
      rating: 5,
      avatar: "👩‍💼",
      bgImage: "/images/im.jpg"
    },
    {
      name: "Pierre Martin",
      company: "Consulting Digital",
      role: "CEO",
      content: "L'équipe de VILO est réactive et très compétente. Ils ont géré notre support client pendant la période de forte croissance avec une excellence remarquable.",
      rating: 5,
      avatar: "👨‍💻",
      bgImage: "/images/122.jpg"
    },
    {
      name: "Sophie Laurent",
      company: "E-commerce Fashion",
      role: "Fondatrice",
      content: "Grâce à VILO ASSIST-PRO, je peux me concentrer sur le développement de mon business. Leur assistance administrative est d'une qualité irréprochable.",
      rating: 5,
      avatar: "👩‍🚀",
      bgImage: "/images/temoin.jpg"
    }
  ];

  // Fonction pour générer un avatar par défaut basé sur le nom
  const generateAvatar = (name) => {
    const avatars = ["👨‍💻", "👩‍💻"];
    return avatars[name.length % avatars.length];
  };

  // Fonction pour générer une image de fond par défaut
  const generateBgImage = (index) => {
    const images = ["/images/im.jpg", "/images/122.jpg", "/images/temoin.jpg", "/images/rousseau.jpg"];
    return images[index % images.length];
  };

  // Transformer les témoignages de l'API pour correspondre au format attendu
  const formatApiTestimonials = (apiData) => {
    if (!Array.isArray(apiData)) return [];
    
    return apiData
      .filter(testimonial => testimonial.status === 'approved')
      .map((testimonial, index) => ({
        name: testimonial.name || '',
        company: testimonial.entreprise || '',
        role: testimonial.post || '',
        content: testimonial.comment || '',
        rating: testimonial.rating || 5,
        avatar: generateAvatar(testimonial.name),
        bgImage: generateBgImage(index)
      }));
  };

  // Filtrer et formater les témoignages approuvés
    const approvedTestimonials = apiTestimonials?.length > 0 
  ? formatApiTestimonials(apiTestimonials) 
  : [];

  // Utiliser les témoignages approuvés, sinon fallback vers les témoignages par défaut
  const testimonials = approvedTestimonials.length > 0 
    ? approvedTestimonials 
    : defaultTestimonials;
    
  console.log('Témoignages finaux utilisés:', testimonials);
  console.log(`Source des témoignages: ${approvedTestimonials.length > 0 ? `API (${approvedTestimonials.length} approuvés)` : 'Par défaut'}`);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('testimonials');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Charger les témoignages au montage du composant
    if (!testimonialsLoaded) {
      const loadTestimonials = async () => {
        try {
          console.log('Début du chargement des témoignages...');
          const result = await fetchTestimonials();
          console.log('Résultat fetchTestimonials:', result);
          setTestimonialsLoaded(true);
        } catch (error) {
          console.error('Erreur lors du chargement des témoignages:', error);
          setTestimonialsLoaded(true);
        }
      };
      
      loadTestimonials();
    }
  }, [testimonialsLoaded]);

  useEffect(() => {
    console.log("Données reçues:", {
      rawData: apiTestimonials,
      formatted: approvedTestimonials,
      source: approvedTestimonials.length > 0 ? "API" : "Défaut"
    });
  }, [apiTestimonials]);

  useEffect(() => {
    // Ne démarrer le carousel que quand on a des témoignages
    if (testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Reset currentTestimonial si le nombre de témoignages change
  useEffect(() => {
    if (currentTestimonial >= testimonials.length && testimonials.length > 0) {
      setCurrentTestimonial(0);
    }
  }, [testimonials.length, currentTestimonial]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const validateForm = () => {
    const errors = {
      name: formData.name.trim().length < 2 ? 'Le nom doit contenir au moins 2 caractères' : '',
      role: formData.role.trim().length < 2 ? 'Le poste doit contenir au moins 2 caractères' : '',
      company: formData.company.trim().length < 2 ? 'Le nom de l\'entreprise doit contenir au moins 2 caractères' : '',
      content: formData.content.trim().length < 10 ? 'Le témoignage doit contenir au moins 10 caractères' : '',
      rating: formData.rating < 1 || formData.rating > 5 ? 'Veuillez sélectionner une note valide' : ''
    };

    setFormErrors(errors);
    return Object.values(errors).every(error => error === '');
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitMessage('');
    
    try {
      const testimonialData = {
        name: formData.name.trim(),
        role: formData.role.trim(),
        company: formData.company.trim(),
        content: formData.content.trim(),
        rating: formData.rating
      };

      const result = await createTestimonial(testimonialData);
      
      if (result.success) {
        // Réinitialiser le formulaire
        setFormData({
          name: '',
          role: '',
          company: '',
          content: '',
          rating: 5
        });
        setFormErrors({
          name: '',
          role: '',
          company: '',
          content: '',
          rating: ''
        });
        setSubmitMessage('Merci pour votre témoignage ! Il sera publié après modération.');
        
        // Fermer le formulaire après 2 secondes
        setTimeout(() => {
          setShowForm(false);
          setSubmitMessage('');
        }, 2000);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setSubmitMessage('Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({ name: '', role: '', company: '', content: '', rating: 5 });
    setFormErrors({ name: '', role: '', company: '', content: '', rating: '' });
    setSubmitMessage('');
  };

  // Afficher un loader si les témoignages sont en cours de chargement
  if (isLoading && !testimonialsLoaded) {
    return (
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vilo-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Chargement des témoignages...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez ce que nos clients pensent de nos services d'assistance virtuelle
          </p>
          
          {/* Bouton pour ouvrir le formulaire */}
          <div className="mt-8">
            <Button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Partager mon témoignage
            </Button>
          </div>
        </div>

        {/* Message informatif si aucun témoignage approuvé */}
        {approvedTestimonials.length === 0 && apiTestimonials && apiTestimonials.length > 0 && (
          <div className="text-center mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Aucun témoignage approuvé pour le moment. Les témoignages par défaut sont affichés.
              </p>
            </div>
          </div>
        )}

        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="relative rounded-xl overflow-hidden">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center z-0"
                      style={{ 
                        backgroundImage: `url(${DEFAULT_BACKGROUND.image})`,
                        backgroundPosition: DEFAULT_BACKGROUND.position
                      }}
                    >
                      <div className={`absolute inset-0 ${DEFAULT_BACKGROUND.overlay}`} />
                    </div>              
                    <Card className="border-0 shadow-2xl bg-transparent">
                      <CardContent className="p-8 md:p-12 text-center relative z-10">
                        <div className="mb-6">
                          <Quote className="w-12 h-12 text-vilo-purple-200 mx-auto mb-4" />
                          <div className="flex justify-center mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        
                        <blockquote className="text-lg md:text-xl text-white mb-8 italic leading-relaxed">
                          "{testimonial.content}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-vilo-purple-500 to-vilo-pink-500 rounded-full flex items-center justify-center text-2xl">
                            {testimonial.avatar}
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-white">{testimonial.name}</div>
                            <div className="text-vilo-purple-200 font-medium">{testimonial.role}</div>
                            <div className="text-gray-300 text-sm">{testimonial.company}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {testimonials.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 hover:bg-white border-vilo-purple-200 shadow-lg z-20"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 hover:bg-white border-vilo-purple-200 shadow-lg z-20"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial
                    ? 'bg-gradient-to-r from-vilo-purple-500 to-vilo-pink-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent mb-2">
              +5
            </div>
            <div className="text-gray-600 dark:text-gray-300">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent mb-2">
             + {Math.max(20, approvedTestimonials.length)}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <div className="text-gray-600 dark:text-gray-300">Taux de satisfaction</div>
          </div>
        </div>
      </div>

      {/* Modal du formulaire */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent">
                  Votre témoignage
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Votre nom *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-vilo-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Votre nom complet"
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Votre poste *
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-vilo-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      formErrors.role ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Ex: Directeur, CEO, Fondateur..."
                  />
                  {formErrors.role && <p className="text-red-500 text-sm mt-1">{formErrors.role}</p>}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Votre entreprise *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-vilo-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                      formErrors.company ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Nom de votre entreprise"
                  />
                  {formErrors.company && <p className="text-red-500 text-sm mt-1">{formErrors.company}</p>}
                </div>

                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Note *
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          } hover:text-yellow-400 transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                  {formErrors.rating && <p className="text-red-500 text-sm mt-1">{formErrors.rating}</p>}
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Votre témoignage *
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-vilo-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none ${
                      formErrors.content ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Partagez votre expérience avec VILO ASSIST-PRO..."
                  />
                  {formErrors.content && <p className="text-red-500 text-sm mt-1">{formErrors.content}</p>}
                </div>

                {submitMessage && (
                  <div className={`p-3 rounded-lg text-sm ${
                    submitMessage.includes('Merci')
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {submitMessage}
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeForm}
                    className="flex-1 border-gray-300 hover:bg-gray-50"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Envoi...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;