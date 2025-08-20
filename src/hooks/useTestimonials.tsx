import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface TestimonialData {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  status?: 'pending' | 'approved' | 'rejected';
  id?: string;
}

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: Error | string;
}

export const useTestimonials = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);

  const API_BASE_URL = import.meta.env.VITE_API_URL || '';
  const API_ENDPOINTS = {
    testimonials: `${API_BASE_URL}/api/testimonials`,
    pending: `${API_BASE_URL}/api/testimonials/pending`, // Ajoutez cette ligne
    status: (id: string) => `${API_BASE_URL}/api/testimonials/${id}/status`,
    byId: (id: string) => `${API_BASE_URL}/api/testimonials/${id}`,
  };

  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const authHeaders = () => ({
    ...defaultHeaders,
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  });

  const validateTestimonial = (data: TestimonialData): string[] => {
    const errors: string[] = [];
    if (!data.name?.trim() || data.name.trim().length < 2)
      errors.push('Le nom doit contenir au moins 2 caractères');
    if (!data.role?.trim() || data.role.trim().length < 2)
      errors.push('Le poste doit contenir au moins 2 caractères');
    if (!data.company?.trim() || data.company.trim().length < 2)
      errors.push("L'entreprise doit contenir au moins 2 caractères");
    if (!data.content?.trim() || data.content.trim().length < 10)
      errors.push('Le témoignage doit contenir au moins 10 caractères');
    if (!data.rating || data.rating < 1 || data.rating > 5)
      errors.push('La note doit être comprise entre 1 et 5');
    return errors;
  };

  const handleApiError = (error: any, context: string): ApiResponse => {
    console.error(`Erreur ${context}:`, error);
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      'Une erreur est survenue';
    toast({
      title: 'Erreur',
      description: errorMessage,
      variant: 'destructive',
    });
    return { success: false, error: errorMessage };
  };

  const createTestimonial = async (testimonial: TestimonialData): Promise<ApiResponse> => {
    setIsLoading(true);
    try {
      const validationErrors = validateTestimonial(testimonial);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('\n'));
      }

      const payload = {
        name: testimonial.name.trim(),
        post: testimonial.role.trim(),
        entreprise: testimonial.company.trim(),
        comment: testimonial.content.trim(),
        rating: Number(testimonial.rating),
      };

      const response = await fetch(API_ENDPOINTS.testimonials, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création');
      }

      toast({
        title: 'Merci pour votre témoignage !',
        description: 'Il sera publié après modération.',
      });

      return { success: true };
    } catch (error) {
      return handleApiError(error, 'création témoignage');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTestimonials = async (fetchPending: boolean = false): Promise<ApiResponse> => {
    setIsLoading(true);
    try {
      const endpoint = fetchPending ? API_ENDPOINTS.pending : API_ENDPOINTS.testimonials;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: fetchPending ? authHeaders() : defaultHeaders,
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();
      
      // Traitement différent selon le type de requête
      const testimonialsArray = Array.isArray(data.data) 
        ? data.data 
        : Array.isArray(data) 
          ? data 
          : [];

      const filteredTestimonials = fetchPending
        ? testimonialsArray // On prend tout car le serveur a déjà filtré
        : testimonialsArray.filter(t => t.status === 'approved');

      setTestimonials(filteredTestimonials);
      return { success: true, data: filteredTestimonials };
    } catch (error) {
      return handleApiError(error, 'récupération témoignages');
    } finally {
      setIsLoading(false);
    }
  };

  const updateTestimonialStatus = async (
    id: string,
    status: 'approved' | 'rejected'
  ): Promise<ApiResponse> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.testimonials}/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      const data = await response.json();
      toast({
        title: 'Statut mis à jour',
        description: `Témoignage ${status === 'approved' ? 'approuvé' : 'rejeté'}`,
      });

      return { success: true, data };
    } catch (error) {
      return handleApiError(error, 'changement statut témoignage');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTestimonial = async (id: string): Promise<ApiResponse> => {
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.byId(id), {
        method: 'DELETE',
        headers: authHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}`);
      }

      toast({
        title: 'Témoignage supprimé',
        description: 'Suppression effectuée avec succès.',
      });

      return { success: true };
    } catch (error) {
      return handleApiError(error, 'suppression témoignage');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createTestimonial,
    fetchTestimonials: () => fetchTestimonials(false),
    fetchPendingTestimonials: () => fetchTestimonials(true),
    updateTestimonialStatus,
    deleteTestimonial,
    isLoading,
    testimonials,
  };
};