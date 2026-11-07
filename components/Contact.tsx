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
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-[2px] border border-rule bg-band p-8 dark:border-rule">
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <CheckCircle2 className="mb-4 h-16 w-16 text-teal" />
            <h2 className="mb-2 text-2xl font-bold text-ink">Message Sent!</h2>
            <p className="text-ink-soft">Thank you for reaching out. I&apos;ll get back to you soon.</p>
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
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
                Name
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                autoComplete="name"
                enterKeyHint="next"
                className="block w-full rounded-[2px] border border-rule bg-band p-3 text-sm text-ink focus:border-signal focus:ring-signal dark:border-rule bg-band/50 dark:text-paper dark:placeholder-gray-400 dark:focus:border-signal dark:focus:ring-signal"
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-signal">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                autoComplete="email"
                inputMode="email"
                enterKeyHint="next"
                className="block w-full rounded-[2px] border border-rule bg-band p-3 text-sm text-ink focus:border-signal focus:ring-signal dark:border-rule bg-band/50 dark:text-paper dark:placeholder-gray-400 dark:focus:border-signal dark:focus:ring-signal"
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-signal">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
                Message
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={5}
                autoComplete="off"
                enterKeyHint="send"
                className="block w-full rounded-[2px] border border-rule bg-band p-3 text-sm text-ink focus:border-signal focus:ring-signal dark:border-rule bg-band/50 dark:text-paper dark:placeholder-gray-400 dark:focus:border-signal dark:focus:ring-signal"
                placeholder="Your message here..."
              ></textarea>
              {errors.message && <p className="mt-1 text-sm text-signal">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-[2px] bg-signal px-5 py-3 text-center text-sm font-medium text-paper hover:bg-signal-deep focus:outline-none focus:ring-4 focus:ring-signal disabled:opacity-70 dark:bg-signal dark:hover:bg-signal-deep transition-all"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && <Send className="h-4 w-4" />}
            </button>

            <div className="pt-4 border-t border-rule mt-4">
              <a 
                href="/me/Ashif_Ahmed_Shuvo_Resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-[2px] border border-signal px-5 py-3 text-center font-sans text-[0.875rem] text-signal transition-colors hover:bg-signal hover:text-paper"
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
