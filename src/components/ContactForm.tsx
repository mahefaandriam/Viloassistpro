import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useContacts } from '@/hooks/useContacts';

const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Veuillez saisir une adresse email valide'),
  service: z.string().min(1, 'Veuillez sélectionner un service'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { submitContact, isLoading } = useContacts();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    // Assurer que toutes les propriétés sont définies
    const contactData = {
      name: data.name,
      email: data.email,
      service: data.service,
      message: data.message,
    };
    
    const result = await submitContact(contactData);
    if (result.success) {
      form.reset();
    }
  };

  const services = [
    'Assistant administratif',
    'Assistant polyvalent',
    'Assistant recrutement',
    'Assistant en conciergerie',
    'Téléprospecteurs à distance',
    'Support client',
    'Assistant en précompta',
    'Télésecrétaire médical',
    'Télésecrétaire juridique',
    'Saisie de données',
    'Transcripteur audio et vidéo',
    'Assistant immobilier'
  ];

  return (
    <Card className="border-vilo-purple-200 shadow-lg dark:border-vilo-purple-800">
      <CardHeader className="bg-gradient-to-r from-vilo-purple-50 to-vilo-pink-50 dark:from-vilo-purple-900/20 dark:to-vilo-pink-900/20 py-6"> {/* Augmentation du padding vertical */}
        <CardTitle className="text-2xl md:text-3xl text-center bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 bg-clip-text text-transparent"> {/* Taille de texte responsive */}
          Demande de devis gratuit
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pb-10"> {/* Padding-bottom augmenté */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> {/* Espacement augmenté entre les champs */}
            <div className="grid md:grid-cols-2 gap-6"> {/* Espacement entre colonnes augmenté */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium text-base"> {/* Taille de texte augmentée */}
                      Nom complet *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Votre nom complet"
                        className="border-vilo-purple-200 focus:border-vilo-purple-400 dark:border-vilo-purple-700 h-12" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-300 font-medium text-base">
                      Email *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        className="border-vilo-purple-200 focus:border-vilo-purple-400 dark:border-vilo-purple-700 h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium text-base">
                    Service souhaité *
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-vilo-purple-200 focus:border-vilo-purple-400 dark:border-vilo-purple-700 h-12 text-base"> {/* Hauteur et taille de texte augmentées */}
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service} className="text-base"> {/* Taille de texte augmentée */}
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300 font-medium text-base">
                    Message *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez vos besoins en détail..."
                      rows={6} 
                      className="border-vilo-purple-200 focus:border-vilo-purple-400 dark:border-vilo-purple-700 min-h-[120px] text-base" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-vilo-purple-600 to-vilo-pink-600 hover:from-vilo-purple-700 hover:to-vilo-pink-700 text-white py-4 text-lg mt-4" 
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="mr-2 w-5 h-5" />
                  Envoyer la demande
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-700 text-center mt-6"> {/* Espacement augmenté */}
          <p className="text-base text-gray-600 dark:text-gray-400"> {/* Taille de texte augmentée */}
            <span className="font-semibold text-vilo-purple-700 dark:text-vilo-purple-400">Réponse garantie</span> sous 24h
          </p>
          <p className="text-base text-gray-600 dark:text-gray-400 mt-2"> {/* Taille de texte et espacement augmentés */}
            Devis gratuit • Sans engagement
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
