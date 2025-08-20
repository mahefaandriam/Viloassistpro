import { useState } from 'react';
import { api } from '@/lib/api';
import { AppointmentFormData, Appointment } from '@/types/database';
import { toast } from '@/hooks/use-toast';

export const useAppointments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]); // optionnel mais utile

const createAppointment = async (
  client_name: string,
  client_email: string,
  date: Date, // Date locale du client
  time: string
) => {
  setIsLoading(true);
  try {
    // Correction du décalage de fuseau horaire
    const localDate = new Date(date);
    const timezoneOffset = localDate.getTimezoneOffset() * 60000; // offset en millisecondes
    const correctedDate = new Date(localDate.getTime() - timezoneOffset);
    const isoDate = correctedDate.toISOString().split('T')[0]; // Format YYYY-MM-DD

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/appointments`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          client_name, 
          client_email, 
          date: isoDate, // Date corrigée
          time,
          service: "Consultation",
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Erreur lors de la création du rendez-vous");

    toast({
      title: "Rendez-vous confirmé !",
      description: `Réservé pour le ${date.toLocaleDateString('fr-FR')} à ${time}`,
    });
    return true;
  } catch (error) {
    toast({
      title: "Erreur",
      description: error instanceof Error ? error.message : "Erreur serveur",
      variant: "destructive",
    });
    return false;
  } finally {
    setIsLoading(false);
  }
};

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data); // pour stockage local (facultatif)
      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Erreur fetch rendez-vous:', error);

      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les rendez-vous.",
        variant: "destructive",
      });

      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const updateAppointment = async (id: string, updateData: Partial<AppointmentFormData>) => {
    setIsLoading(true);
    try {
      const response = await api.put(`/appointments/${id}`, updateData);

      toast({
        title: "Rendez-vous modifié",
        description: "Les modifications ont été enregistrées.",
      });

      return { success: true, data: response.data };
    } catch (error: any) {
      console.error('Erreur modification rendez-vous:', error);

      toast({
        title: "Erreur",
        description: error.message || "Modification impossible.",
        variant: "destructive",
      });

      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAppointment = async (id: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/appointments/${id}`);

      toast({
        title: "Rendez-vous supprimé",
        description: "Suppression effectuée avec succès.",
      });

      return { success: true };
    } catch (error: any) {
      console.error('Erreur suppression rendez-vous:', error);

      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer.",
        variant: "destructive",
      });

      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createAppointment,
    fetchAppointments,
    updateAppointment,
    deleteAppointment,
    isLoading,
    appointments, // optionnel si tu veux l'utiliser directement
  };
};
