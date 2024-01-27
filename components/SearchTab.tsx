"use client";

import { TSignUpSchema, signUpSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



const SearchTab = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    const response = await fetch("/api/getColleges", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (!response.ok) {
      // response status is not 2xx
      alert("Submitting form failed!");
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;

      if (errors.inStateMin) {
        setError("inStateMin", {
          type: "server",
          message: errors.inStateMin,
        });
      } else if (errors.inStateMax) {
        setError("inStateMax", {
          type: "server",
          message: errors.inStateMax,
        });
      } else if (errors.outStateMin) {
        setError("outStateMin", {
          type: "server",
          message: errors.outStateMin,
        });
      } else if (errors.outStateMax) {
        setError("outStateMax", {
          type: "server",
          message: errors.outStateMax,
        });
      } else {
        alert("Something went wrong!");
      }
    }

    // reset();
  };

  return ( 
    <div className="w-full md:w-1/3 bg-orange-100 p-5">
      {/* Location Section */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3 font-semibold">
            <div className="grid grid-flow-row gap-3">
              <input
                {...register("zipCode")}
                type="number"
                placeholder="Zip Code"
                className="px-4 py-2 rounded"
              />
              <input
                {...register("city")}
                type="text"
                placeholder="City"
                className="px-4 py-2 rounded"
              />
              {errors.city && (
                <p className="text-red-500">{`${errors.city.message}`}</p>
              )}
              <input
                {...register("state")}
                type="text"
                placeholder="State"
                className="px-4 py-2 rounded"
              />
              {errors.state && (
                <p className="text-red-500">{`${errors.state.message}`}</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* Tuition Section */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Tuition</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3 font-semibold">
            In-State:
            <div className="flex flex-row gap-3">
              <input
                {...register("inStateMin")}
                type="number"
                placeholder="Min."
                className="px-4 py-2 rounded"
              />
              {errors.inStateMin && (
                <p className="text-red-500">{`${errors.inStateMin.message}`}</p>
              )}
              <input
                {...register("inStateMax")}
                type="number"
                placeholder="Max."
                className="px-4 py-2 rounded"
              />
              {errors.inStateMax && (
                <p className="text-red-500">{`${errors.inStateMax.message}`}</p>
              )}
            </div>
            Out-of-State:
            <div className="flex flex-row gap-3">
              <input
                {...register("outStateMin")}
                type="number"
                placeholder="Min."
                className="px-4 py-2 rounded"
              />
              {errors.outStateMin && (
                <p className="text-red-500">{`${errors.outStateMin.message}`}</p>
              )}
              <input
                {...register("outStateMax")}
                type="number"
                placeholder="Max."
                className="px-4 py-2 rounded"
              />
              {errors.outStateMax && (
                <p className="text-red-500">{`${errors.outStateMax.message}`}</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
   );
}
 
export default SearchTab;