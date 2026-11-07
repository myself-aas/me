'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'motion/react';
import { Send, CheckCircle2, FileText } from 'lucide-react';
import { useState } from 'react';
import { sendMessage } from '@/lib/sources/formspree';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      await sendMessage(data);
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch {
      alert('There was an error sending your message. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-3xl border border-white/20 bg-white/40 p-8 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/40">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <CheckCircle2 className="mb-4 h-16 w-16 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Message Sent!</h2>
            <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. I&apos;ll get back to you soon.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Contact Ashif Ahmed Shuvo">
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Name
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                autoComplete="name"
                enterKeyHint="next"
                className="block w-full rounded-xl border border-white/20 bg-white/50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-white/10 dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 backdrop-blur-sm"
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                autoComplete="email"
                inputMode="email"
                enterKeyHint="next"
                className="block w-full rounded-xl border border-white/20 bg-white/50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-white/10 dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 backdrop-blur-sm"
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Message
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={5}
                autoComplete="off"
                enterKeyHint="send"
                className="block w-full rounded-xl border border-white/20 bg-white/50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-white/10 dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 backdrop-blur-sm"
                placeholder="Your message here..."
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600/90 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-70 dark:bg-blue-600/90 dark:hover:bg-blue-700 dark:focus:ring-blue-800 backdrop-blur-sm shadow-md transition-all"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && <Send className="h-4 w-4" />}
            </button>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-900 mt-4">
              <a 
                href="/me/Ashif_Ahmed_Shuvo_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-600 px-5 py-3 text-center text-sm font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all dark:text-blue-400 shadow-sm hover:shadow-[0_0_12px_rgba(37,99,235,0.4)]"
              >
                View Full Resume <FileText className="h-4 w-4" />
              </a>
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );

  return content;
}
