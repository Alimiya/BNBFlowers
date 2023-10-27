"use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "bouquet", label: "Bouquet" },
      { value: "box", label: "Box" },
      { value: "basket", label: "Basket" },
    ],
  },
  {
    id: "size", 
    name: "Flower",
    options: [
      { value: "lilies", label: "Lilies" },
      { value: "roses", label: "Roses" },
      { value: "ruscus", label: "Ruscus" },
      { value: "daisies", label: "Daisies" },
      { value: "sunflowers", label: "Sunflowers" },
      { value: "statices", label: "Statices" },
      { value: "cones", label: "Cones" },
      { value: "carnations", label: "Carnations" },
      { value: "hydrangeas", label: "Hydrangeas" },
    ]
  },

  {
    id: "color",
    name: "Color",
    options: [
      { value: "pink", label: "Pink" },
      { value: "red", label: "Red" },
      { value: "white", label: "White" },
      { value: "orange", label: "Orange" },
      { value: "blue", label: "Blue" },
      { value: "purple", label: "Purple" },
      { value: "yellow", label: "Yellow" },
    ],
  },
]

export function ProductFilters() {

  const router = useRouter()
  const searchParams = useSearchParams()
  const searchValues = Array.from(searchParams.entries())

  return (
    <form className="sticky top-20">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger>
              <span>
                {section.name}{" "}
                <span className="ml-1 text-xs font-extrabold uppercase text-gray-400">
                  {searchParams.get(section.id) ? `${searchParams.get(section.id)}` : "" }
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox id={`filter-${section.id}-${optionIdx}`}
                      checked={searchValues.some(([key, value]) => key === section.id && value === option.value)}
                      onClick={(event) => { 
                      const params = new URLSearchParams(searchParams)
                      const checked = event.currentTarget.dataset.state === "checked"
                      checked ? params.delete(section.id) : params.set(section.id, option.value)
                      router.replace(`/?${params.toString()}`)
                    }} />
                    <label
                      htmlFor={ `filter-${section.id}-${optionIdx}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      { option.label }
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </form>
  )
}
