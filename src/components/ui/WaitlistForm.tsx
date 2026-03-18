import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { HardHat, Building2, Handshake, Briefcase, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { submitToWaitlist, type WaitlistData } from '../../lib/airtable';

type Role = 'worker' | 'employer' | 'partner' | 'investor';

const ROLES = [
  { value: 'worker' as const, icon: HardHat, label: "I'm a Worker", emoji: '👷' },
  { value: 'employer' as const, icon: Building2, label: "I'm an Employer", emoji: '🏗️' },
  { value: 'partner' as const, icon: Handshake, label: "I'm a Partner / Organization", emoji: '🤝' },
  { value: 'investor' as const, icon: Briefcase, label: "I'm an Investor / Advisor", emoji: '💼' },
] as const;

const waitlistSchema = z.object({
  role: z.enum(['worker', 'employer', 'partner', 'investor'], {
    message: 'Please select a role',
  }),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  phone: z.string().optional(),
  consent: z.literal(true, {
    error: 'You must agree to receive updates',
  }),
  // Worker fields
  tradeSkillArea: z.string().optional(),
  yearsExperience: z.string().optional(),
  countryOfWork: z.string().optional(),
  workerNote: z.string().optional(),
  // Employer fields
  companyName: z.string().optional(),
  industryType: z.string().optional(),
  hiringInterest: z.string().optional(),
  operationsCountry: z.string().optional(),
  // Partner fields
  organizationName: z.string().optional(),
  organizationType: z.string().optional(),
  partnershipInterest: z.string().optional(),
  // Investor fields
  firmAffiliation: z.string().optional(),
  interestType: z.string().optional(),
  investorMessage: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.role === 'employer' && (!data.companyName || data.companyName.length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['companyName'],
      message: 'Company name is required',
    });
  }
  if (data.role === 'partner' && (!data.organizationName || data.organizationName.length < 2)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['organizationName'],
      message: 'Organization name is required',
    });
  }
});

type FormValues = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  sourcePage?: string;
  defaultRole?: Role;
}

export default function WaitlistForm({ sourcePage = 'waitlist', defaultRole }: WaitlistFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      role: defaultRole,
      consent: undefined,
    },
  });

  const selectedRole = watch('role');

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSubmitStatus('loading');
    setErrorMessage('');
    try {
      const payload: WaitlistData = {
        ...data,
        consent: true,
        sourcePage,
        submittedAt: new Date().toISOString(),
      };
      await submitToWaitlist(payload);
      setSubmitStatus('success');
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
          className="mb-6"
        >
          <CheckCircle2 className="w-16 h-16 text-nexo-green mx-auto" />
        </motion.div>
        <h3 className="font-display text-2xl text-nexo-navy mb-3">You're on the list.</h3>
        <p className="text-body-md text-nexo-mid-gray">We'll be in touch with early access updates.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Role Selector */}
      <fieldset>
        <legend className="text-body-lg font-semibold text-nexo-navy mb-4">
          How would you like to join NEXO?
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.value;
            return (
              <motion.button
                key={role.value}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setValue('role', role.value, { shouldValidate: true })}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-card border-2 text-left transition-all cursor-pointer
                  ${isSelected
                    ? 'border-nexo-teal bg-nexo-teal/5 text-nexo-teal shadow-sm'
                    : 'border-nexo-light-gray bg-white text-nexo-navy hover:border-nexo-mid-gray'
                  }
                `}
              >
                <span className="text-xl">{role.emoji}</span>
                <span className="font-body text-sm font-medium">{role.label}</span>
              </motion.button>
            );
          })}
        </div>
        {errors.role && (
          <p className="text-red-500 text-sm mt-2" role="alert">{errors.role.message}</p>
        )}
      </fieldset>

      {/* Universal Fields */}
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-body-sm font-medium text-nexo-navy mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            {...register('fullName')}
            className={`w-full px-4 py-3 rounded-input border bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal ${errors.fullName ? 'border-red-400' : 'border-nexo-light-gray'}`}
            placeholder="Your full name"
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-red-500 text-sm mt-1" role="alert">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-body-sm font-medium text-nexo-navy mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-input border bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal ${errors.email ? 'border-red-400' : 'border-nexo-light-gray'}`}
            placeholder="you@example.com"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="country" className="block text-body-sm font-medium text-nexo-navy mb-1">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            id="country"
            type="text"
            {...register('country')}
            className={`w-full px-4 py-3 rounded-input border bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal ${errors.country ? 'border-red-400' : 'border-nexo-light-gray'}`}
            placeholder="Your country"
            aria-describedby={errors.country ? 'country-error' : undefined}
          />
          {errors.country && (
            <p id="country-error" className="text-red-500 text-sm mt-1" role="alert">{errors.country.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-body-sm font-medium text-nexo-navy mb-1">
            Phone Number <span className="text-nexo-mid-gray text-xs">(Optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      {/* Conditional Fields */}
      <AnimatePresence mode="wait">
        {selectedRole === 'worker' && (
          <motion.div
            key="worker-fields"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-hidden"
          >
            <div className="pt-4 border-t border-nexo-light-gray">
              <h4 className="text-label text-nexo-teal mb-4">Worker Details</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="tradeSkillArea" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Trade / Skill Area
                  </label>
                  <input
                    id="tradeSkillArea"
                    type="text"
                    {...register('tradeSkillArea')}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal"
                    placeholder="e.g. Electrician, Mason, Plumber, Carpenter"
                  />
                </div>
                <div>
                  <label htmlFor="yearsExperience" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Years of Experience
                  </label>
                  <select
                    id="yearsExperience"
                    {...register('yearsExperience')}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal"
                  >
                    <option value="">Select...</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="6-10 years">6-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="countryOfWork" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Country of Most Recent Work
                  </label>
                  <input
                    id="countryOfWork"
                    type="text"
                    {...register('countryOfWork')}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal"
                    placeholder="e.g. United States, Spain"
                  />
                </div>
                <div>
                  <label htmlFor="workerNote" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Tell us about your interest <span className="text-nexo-mid-gray text-xs">(Optional)</span>
                  </label>
                  <textarea
                    id="workerNote"
                    {...register('workerNote')}
                    rows={3}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal resize-y"
                    placeholder="What are you looking for?"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedRole === 'employer' && (
          <motion.div
            key="employer-fields"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-hidden"
          >
            <div className="pt-4 border-t border-nexo-light-gray">
              <h4 className="text-label text-nexo-teal mb-4">Employer Details</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="companyName" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    {...register('companyName')}
                    className={`w-full px-4 py-3 rounded-input border bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal ${errors.companyName ? 'border-red-400' : 'border-nexo-light-gray'}`}
                    placeholder="Your company name"
                    aria-describedby={errors.companyName ? 'companyName-error' : undefined}
                  />
                  {errors.companyName && (
                    <p id="companyName-error" className="text-red-500 text-sm mt-1" role="alert">{errors.companyName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="industryType" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Industry / Business Type
                  </label>
                  <input
                    id="industryType"
                    type="text"
                    {...register('industryType')}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal"
                    placeholder="e.g. Construction, Real Estate Development"
                  />
                </div>
                <div>
                  <label htmlFor="hiringInterest" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Hiring Interest
                  </label>
                  <select
                    id="hiringInterest"
                    {...register('hiringInterest')}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal"
                  >
                    <option value="">Select...</option>
                    <option value="Immediately">Immediately</option>
                    <option value="In 3-6 months">In 3-6 months</option>
                    <option value="Exploring">Exploring</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="operationsCountry" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Country / Region of Operations
                  </label>
                  <input
                    id="operationsCountry"
                    type="text"
                    {...register('operationsCountry')}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal"
                    placeholder="Where do you operate?"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedRole === 'partner' && (
          <motion.div
            key="partner-fields"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-hidden"
          >
            <div className="pt-4 border-t border-nexo-light-gray">
              <h4 className="text-label text-nexo-teal mb-4">Organization Details</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="organizationName" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="organizationName"
                    type="text"
                    {...register('organizationName')}
                    className={`w-full px-4 py-3 rounded-input border bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal ${errors.organizationName ? 'border-red-400' : 'border-nexo-light-gray'}`}
                    placeholder="Your organization name"
                    aria-describedby={errors.organizationName ? 'organizationName-error' : undefined}
                  />
                  {errors.organizationName && (
                    <p id="organizationName-error" className="text-red-500 text-sm mt-1" role="alert">{errors.organizationName.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="organizationType" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Organization Type
                  </label>
                  <select
                    id="organizationType"
                    {...register('organizationType')}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal"
                  >
                    <option value="">Select...</option>
                    <option value="NGO">NGO</option>
                    <option value="Government">Government</option>
                    <option value="Academic">Academic</option>
                    <option value="Foundation">Foundation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="partnershipInterest" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Partnership Interest
                  </label>
                  <textarea
                    id="partnershipInterest"
                    {...register('partnershipInterest')}
                    rows={2}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal resize-y"
                    placeholder="Tell us how you'd like to collaborate"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {selectedRole === 'investor' && (
          <motion.div
            key="investor-fields"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 overflow-hidden"
          >
            <div className="pt-4 border-t border-nexo-light-gray">
              <h4 className="text-label text-nexo-teal mb-4">Investor / Advisor Details</h4>
              <div className="space-y-4">
                <div>
                  <label htmlFor="firmAffiliation" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Firm or Affiliation <span className="text-nexo-mid-gray text-xs">(Optional)</span>
                  </label>
                  <input
                    id="firmAffiliation"
                    type="text"
                    {...register('firmAffiliation')}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal"
                    placeholder="Your firm or affiliation"
                  />
                </div>
                <div>
                  <label htmlFor="interestType" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Interest Type
                  </label>
                  <select
                    id="interestType"
                    {...register('interestType')}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal"
                  >
                    <option value="">Select...</option>
                    <option value="Seed Investment">Seed Investment</option>
                    <option value="Strategic Advice">Strategic Advice</option>
                    <option value="Both">Both</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="investorMessage" className="block text-body-sm font-medium text-nexo-navy mb-1">
                    Short Message <span className="text-nexo-mid-gray text-xs">(Optional)</span>
                  </label>
                  <textarea
                    id="investorMessage"
                    {...register('investorMessage')}
                    rows={2}
                    className="w-full px-4 py-3 rounded-input border border-nexo-light-gray bg-white text-nexo-navy font-body text-base transition-colors focus:border-nexo-teal focus:ring-1 focus:ring-nexo-teal resize-y"
                    placeholder="Anything you'd like us to know?"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consent */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('consent')}
            className="mt-1 w-4 h-4 rounded border-nexo-light-gray text-nexo-teal focus:ring-nexo-teal"
          />
          <span className="text-body-sm text-nexo-navy">
            I agree to receive updates from NEXO about early access and platform news.
          </span>
        </label>
        {errors.consent && (
          <p className="text-red-500 text-sm mt-1" role="alert">{errors.consent.message}</p>
        )}
      </div>

      {/* Submit */}
      <div>
        <motion.button
          type="submit"
          disabled={submitStatus === 'loading'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-btn bg-gradient-to-r from-nexo-teal to-nexo-teal-light text-white font-body font-semibold text-base shadow-btn hover:shadow-lg transition-shadow disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {submitStatus === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Join the Waitlist
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>

      {/* Error Message */}
      {submitStatus === 'error' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm text-center"
          role="alert"
        >
          {errorMessage}
        </motion.p>
      )}
    </form>
  );
}
