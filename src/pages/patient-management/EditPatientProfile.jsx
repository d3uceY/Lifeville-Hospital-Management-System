import { useState } from "react"
import { updateRegisteredPatient } from "../../providers/ApiProviders"
import { useLocation, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select"
import { nationalities } from "../../components/forms/data/RegistrationFormData"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Toaster } from "sonner"
import { Button } from "@/components/ui/button"
import { useParams } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

// Format date from this 2023-09-30T23:00:00.000Z to this 2023-09-30
import { formatForDateInput } from "../../helpers/formatForDateInput"

export default function EditPatientProfile() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const queryClient = useQueryClient()

  // Get patient data from location
  const location = useLocation()
  const patient = location.state;
  const { patient_id: id, surname, first_name } = useParams();
  const navigate = useNavigate();

  //function that takes you back to the patient profile
  function goBackToProfile() {
    navigate(`/patient-profile/${id}/${surname}/${first_name}/full-profile`)
  }




  // Form validation schema
  const schema = z.object({
    // Required Fields
    date: z.string().nonempty({ message: "Date is required" }),
    surname: z.string().nonempty({ message: "Surname is required" }),
    firstName: z.string().nonempty({ message: "First name is required" }),
    sex: z.string().nonempty({ message: "Sex is required" }),
    dateOfBirth: z.string().nonempty({ message: "Date of birth is required" }),
    hospitalNumber: z.string().nonempty({ message: "Hospital number is required" }),
    phoneNumber: z
      .string()
      .nonempty({ message: "Phone number is required" })
      .regex(/^\+?\d{7,15}$/, { message: "Enter a valid phone number (7-15 digits, optional +)" }),
    address: z.string().nonempty({ message: "Address is required" }),
    nationality: z.string().nonempty({ message: "Nationality is required" }),
    nextOfKin: z.string().nonempty({ message: "Next of kin is required" }),
    relationship: z.string().nonempty({ message: "Relationship is required" }),
    nextOfKinPhoneNumber: z
      .string()
      .nonempty({ message: "Next of kin phone number is required" })
      .regex(/^\+?\d{7,15}$/, { message: "Enter a valid phone number (7-15 digits, optional +)" }),
    addressOfNextOfKin: z.string().nonempty({ message: "Address of next of kin is required" }),

    // Optional Fields
    otherNames: z.string().optional(),
    maritalStatus: z.string().optional(),
    occupation: z.string().optional(),
    placeOfWorkAddress: z.string().optional(),
    religion: z.string().optional(),
    pastMedicalHistory: z.string().optional(),
    pastSurgicalHistory: z.string().optional(),
    familyHistory: z.string().optional(),
    socialHistory: z.string().optional(),
    drugHistory: z.string().optional(),
    allergies: z.string().optional(),
    dietaryRestrictions: z.string().optional(),
    dietAllergies: z.string().optional(),
  })



  //form methods that are going to be parsed throughout the form tree
  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      // Basic Information
      date: formatForDateInput(patient?.date || ""),
      surname: patient?.surname || "",
      firstName: patient?.first_name || "",
      otherNames: patient?.other_names || "",
      hospitalNumber: patient?.hospital_number || "",

      // Contact Information
      sex: patient?.sex || "",
      maritalStatus: patient?.marital_status || "",
      dateOfBirth: formatForDateInput(patient?.date_of_birth || ""),
      phoneNumber: patient?.phone_number || "",
      address: patient?.address || "",
      occupation: patient?.occupation || "",
      placeOfWorkAddress: patient?.place_of_work_address || "",

      // Demographic Information
      religion: patient?.religion || "",
      nationality: patient?.nationality || "",

      // Next of Kin / Emergency Contact
      nextOfKin: patient?.next_of_kin || "",
      relationship: patient?.relationship || "",
      nextOfKinPhoneNumber: patient?.next_of_kin_phone || "",
      addressOfNextOfKin: patient?.next_of_kin_address || "",

      // Medical History
      pastMedicalHistory: patient?.past_medical_history || "",
      pastSurgicalHistory: patient?.past_surgical_history || "",
      familyHistory: patient?.family_history || "",
      socialHistory: patient?.social_history || "",
      drugHistory: patient?.drug_history || "",

      // Allergies & Dietary Restrictions
      allergies: patient?.allergies || "",
      dietaryRestrictions: patient?.dietary_restrictions || "",
      dietAllergies: patient?.diet_allergies_to_drugs || "",
    },
  })

  //this is destructured from the methods variable
  const {
    handleSubmit,
    formState: { isValid, errors },
    register,
    control,
    getValues,
  } = methods

  const onSubmit = async (values) => {
    if (!Number(values.hospitalNumber)) {
      toast.error("Hospital number must be a number")
      return
    }
    const payload = {
      ...values,
      hospitalNumber: Number(values.hospitalNumber)
    }
    const promise = async () => {
      try {
        setIsSubmitting(true)
        const response = await updateRegisteredPatient(patient.patient_id, payload);
        queryClient.invalidateQueries({ queryKey: ["patient"] });
        goBackToProfile()
        return response;
      } catch (err) {
        console.error(err)
        throw err;
      } finally {
        setIsSubmitting(false)
      }
    }

    toast.promise(promise(), {
      loading: 'Updating patient information...',
      success: (data) => `${data.message}`,
      error: (err) => `An error occurred (${err?.response?.data?.message}, ${err?.message})`
    });
  }



  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Edit Mode Banner */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-md shadow-sm">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber-500 mr-3"
          >
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
          <div>
            <h2 className="text-amber-800 font-medium text-lg">Edit Mode</h2>
            <p className="text-amber-700 text-sm">You are currently editing patient information</p>
          </div>
        </div>
      </div>

      <div className="mb-8 border-l-4  pl-4 bg-[#f0f8f4] p-4 rounded-r-md shadow-sm">
        <h1 className="text-3xl font-bold ">
          Update {patient?.first_name} {patient?.surname}'s Profile
        </h1>
        <div className="flex items-center mt-2 text-gray-600">
          <span className="bg-[#106041] text-white px-2 py-0.5 rounded text-xs mr-2">ID</span>
          <p className="text-muted-foreground">Hospital Number: {patient?.hospital_number || "N/A"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        {/* Floating Edit Indicator */}
        <div className="absolute -right-4 top-0 bg-amber-400 text-white px-3 py-1.5 rounded-l-md shadow-md transform rotate-90 origin-right translate-y-16 font-medium">
          EDITING
        </div>

        {/* Basic Information */}
        <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
          <CardHeader className="bg-[#f0f8f4] border-b ">
            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 mt-6">
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="date">
                  <span className="text-red-500">*</span> Date
                </Label>
                <Input
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                  id="date"
                  type="date"
                  {...register("date")}
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="surname">
                  <span className="text-red-500">*</span> Surname
                </Label>
                <Input
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                  id="surname"
                  {...register("surname")}
                />
                {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="first_name">
                  <span className="text-red-500">*</span> First Name
                </Label>
                <Input
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                  id="first_name"
                  {...register("firstName")}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="other_names">
                  Other Names
                </Label>
                <Input
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                  id="other_names"
                  {...register("otherNames")}
                />
                {errors.otherNames && <p className="text-red-500 text-sm mt-1">{errors.otherNames.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="hospital_number">
                  Hospital Number
                </Label>
                <Input
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                  id="hospital_number"
                  type="number"
                  {...register("hospitalNumber")}
                />
                {errors.hospitalNumber && <p className="text-red-500 text-sm mt-1">{errors.hospitalNumber.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
          <CardHeader className="bg-[#f0f8f4] border-b ">
            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-contact"
              >
                <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <circle cx="12" cy="10" r="2" />
                <line x1="8" x2="8" y1="2" y2="4" />
                <line x1="16" x2="16" y1="2" y2="4" />
              </svg>
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="sex">
                  <span className="text-red-500">*</span> Sex
                </Label>
                <Controller
                  name="sex"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)} value={field.value || patient?.sex}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sex</SelectLabel>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="maritalStatus">
                  Marital Status
                </Label>
                <Controller
                  name="maritalStatus"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={(value) => field.onChange(value)} value={field.value || ""}>
                      <SelectTrigger className="w-full border border-[#268a6461] rounded-sm focus-visible:ring-[#268a6429]">
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Marital Status</SelectLabel>
                          <SelectItem value="Single">Single</SelectItem>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Divorced">Divorced</SelectItem>
                          <SelectItem value="Widowed">Widowed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.maritalStatus && <p className="text-red-500 text-sm mt-1">{errors.maritalStatus.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="date_of_birth">
                  <span className="text-red-500">*</span> Date of Birth
                </Label>
                <Input
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                  id="date_of_birth"
                  type="date"
                  {...register("dateOfBirth")}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="phone_number">
                  <span className="text-red-500">*</span> Phone Number
                </Label>
                <Input
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                  id="phone_number"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
              </div>
            </div>
            <div className="mt-6">
              <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="address">
                <span className="text-red-500">*</span>   Address
              </Label>
              <Textarea
                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                id="address"
                {...register("address")}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="occupation">
                Occupation
              </Label>
              <Input
                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                id="occupation"
                {...register("occupation")}
              />
              {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation.message}</p>}
            </div>
            <div className="mt-6">
              <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="placeOfWorkAddress">
                Address of Place of Work
              </Label>
              <Textarea
                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                id="placeOfWorkAddress"
                {...register("placeOfWorkAddress")}
              />
              {errors.placeOfWorkAddress && (
                <p className="text-red-500 text-sm mt-1">{errors.placeOfWorkAddress.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Demographic Information */}
        <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
          <CardHeader className="bg-[#f0f8f4] border-b ">
            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Demographic Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="religion">
                  Religion
                </Label>
                <Controller
                  name="religion"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Religion</SelectLabel>
                          <SelectItem value="Christian">Christian</SelectItem>
                          <SelectItem value="Muslim">Muslim</SelectItem>
                          <SelectItem value="Traditional">Traditional</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.religion && <p className="text-red-500 text-sm mt-1">{errors.religion.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="nationality">
                  <span className="text-red-500">*</span>    Nationality
                </Label>
                <Controller
                  name="nationality"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Nationality</SelectLabel>
                          {nationalities.map((nationality) => (
                            <SelectItem key={nationality} value={nationality}>
                              {nationality}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next of Kin Section */}
        <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
          <CardHeader className="bg-[#f0f8f4] border-b ">
            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart-handshake"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
                <path d="m18 15-2-2" />
                <path d="m15 18-2-2" />
              </svg>
              Next of Kin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="next_of_kin">
                  <span className="text-red-500">*</span>  Next of Kin
                </Label>
                <Input
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                  id="next_of_kin"
                  {...register("nextOfKin")}
                />
                {errors.nextOfKin && <p className="text-red-500 text-sm mt-1">{errors.nextOfKin.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="relationship">
                  <span className="text-red-500">*</span> Relationship
                </Label>
                <Input
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                  id="relationship"
                  {...register("relationship")}
                />
                {errors.relationship && <p className="text-red-500 text-sm mt-1">{errors.relationship.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="next_of_kin_phone">
                  <span className="text-red-500">*</span> Phone Number
                </Label>
                <Input
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                  id="next_of_kin_phone"
                  {...register("nextOfKinPhoneNumber")}
                />
                {errors.nextOfKinPhoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.nextOfKinPhoneNumber.message}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="next_of_kin_address">
                <span className="text-red-500">*</span> Address of Next of Kin
              </Label>
              <Textarea
                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                id="next_of_kin_address"
                {...register("addressOfNextOfKin")}
              />
              {errors.addressOfNextOfKin && (
                <p className="text-red-500 text-sm mt-1">{errors.addressOfNextOfKin.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Medical History Section */}
        <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
          <CardHeader className="bg-[#f0f8f4] border-b ">
            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-stethoscope"
              >
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                <circle cx="20" cy="10" r="2" />
              </svg>
              Medical History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="past_medical_history">
                  Past Medical History
                </Label>
                <Textarea
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                  id="past_medical_history"
                  {...register("pastMedicalHistory")}
                />
                {errors.pastMedicalHistory && (
                  <p className="text-red-500 text-sm mt-1">{errors.pastMedicalHistory.message}</p>
                )}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="past_surgical_history">
                  Past Surgical History
                </Label>
                <Textarea
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                  id="past_surgical_history"
                  {...register("pastSurgicalHistory")}
                />
                {errors.pastSurgicalHistory && (
                  <p className="text-red-500 text-sm mt-1">{errors.pastSurgicalHistory.message}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="family_history">
                  Family History
                </Label>
                <Textarea
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                  id="family_history"
                  {...register("familyHistory")}
                />
                {errors.familyHistory && <p className="text-red-500 text-sm mt-1">{errors.familyHistory.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="social_history">
                  Social History
                </Label>
                <Textarea
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                  id="social_history"
                  {...register("socialHistory")}
                />
                {errors.socialHistory && <p className="text-red-500 text-sm mt-1">{errors.socialHistory.message}</p>}
              </div>
            </div>
            <div className="mt-6">
              <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="drug_history">
                Drug History
              </Label>
              <Textarea
                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                id="drug_history"
                {...register("drugHistory")}
              />
              {errors.drugHistory && <p className="text-red-500 text-sm mt-1">{errors.drugHistory.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Allergies Section */}
        <Card className="pt-0 mb-8 shadow-sm border-t-4 border-t-[#106041]">
          <CardHeader className="bg-[#f0f8f4] border-b ">
            <CardTitle className="pt-6 text-xl font-semibold flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-alert-triangle"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
              Allergies & Dietary Restrictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="allergies">
                  Any Allergies?
                </Label>
                <Textarea
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                  id="allergies"
                  {...register("allergies")}
                />
                {errors.allergies && <p className="text-red-500 text-sm mt-1">{errors.allergies.message}</p>}
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="dietary_restrictions">
                  Dietary Restrictions
                </Label>
                <Textarea
                  className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                  id="dietary_restrictions"
                  {...register("dietaryRestrictions")}
                />
                {errors.dietaryRestrictions && (
                  <p className="text-red-500 text-sm mt-1">{errors.dietaryRestrictions.message}</p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="diet_allergies_to_drugs">
                Diet Allergies to Drugs
              </Label>
              <Textarea
                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                id="diet_allergies_to_drugs"
                {...register("dietAllergies")}
              />
              {errors.dietAllergies && <p className="text-red-500 text-sm mt-1">{errors.dietAllergies.message}</p>}
            </div>
          </CardContent>
        </Card>

        <div className="text-right mt-8 flex items-center justify-end gap-4">
          <button
            onClick={goBackToProfile}
            type="button"
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="px-6 py-2 bg-[#106041] text-white rounded-md hover:bg-[#106041]/80 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save Changes
          </Button>
        </div>
      </form>
      {/* <Toaster position="top-right" /> */}
    </div>
  )
}

