'use client';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '@/types/form';
import { differenceInYears } from 'date-fns';

interface UseDerivedFieldsProps {
  formSchema: FormSchema | null;
  useFormMethods: UseFormReturn<any>;
}

export function useDerivedFields({ formSchema, useFormMethods }: UseDerivedFieldsProps) {
  const { watch, setValue } = useFormMethods;

  useEffect(() => {
    if (!formSchema) {
      return;
    }
    const derivedFields = formSchema.fields.filter(f => f.isDerived && f.derivation);

    if (derivedFields.length === 0) return;

    const parentFieldIds = derivedFields.flatMap(f => f.derivation!.parentFields);
    const subscription = watch((value, { name, type }) => {
      derivedFields.forEach(derivedField => {
        if (derivedField.derivation!.parentFields.includes(name!)) {
          switch (derivedField.derivation!.logic) {
            case 'ageFromDate':
              const parentValue = value[name!];
              if (parentValue) {
                const age = differenceInYears(new Date(), new Date(parentValue));
                setValue(derivedField.id, age >= 0 ? age.toString() : 'Invalid Date', { shouldValidate: true });
              } else {
                setValue(derivedField.id, '', { shouldValidate: true });
              }
              break;
          }
        }
      });
    });
    return () => subscription.unsubscribe();

  }, [formSchema, watch, setValue]);
}