import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { viewRegisteredPatient } from '../../providers/ApiProviders';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
//skeleton loader
import PatientProfileSkeleton from './components/patientProfileSkeleton';
import { hasPermission } from '../../helpers/hasPermission';

export default function PatientProfile() {
    const { patient_id: id, surname, first_name } = useParams();

    const { data: patientData, isLoading: patientLoading } = useQuery({
        queryKey: ["patient", id],
        queryFn: () => viewRegisteredPatient(id),
        staleTime: 60 * 60 * 1000,
    });
    
    // Helper to format a date string (ISO) to yyyy-mm-dd for the input fields.
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };
    if (patientLoading) return (
        <PatientProfileSkeleton />
    )
    return (
        <div className="container mx-auto md:py-8">
            <div className='flex justify-between items-center pl-4 p-4 border-l-4  mb-8  bg-[#f0f8f4] shadow-sm rounded-r-md'>
                <div className="   bg-[#f0f8f4]   ">
                    <h1 className="text-3xl font-bold ">
                        {patientData?.first_name} {patientData?.surname}'s Profile
                    </h1>
                    <div className="flex items-center mt-2 text-gray-600">
                        <span className="bg-[#106041] text-white px-2 py-0.5 rounded text-xs mr-2">ID</span>
                        <p className="text-muted-foreground">Hospital Number: {patientData?.hospital_number || "N/A"}</p>
                    </div>
                </div>
                {
                    hasPermission(["superadmin"]) && (
                        <div>
                            <Link to={`/patient-profile/${id}/${surname}/${first_name}/edit`} state={patientData}>
                                <Button className="bg-[#106041] text-white hover:bg-[#106041]/80">Update</Button>
                            </Link>
                        </div>
                    )
                }
            </div>

            {/* Basic Information Section */}
            <Card className="pt-0 mb-8 shadow-sm">
                <CardHeader className="bg-[#f0f8f4] border-b ">
                    <CardTitle className=" pt-6 text-xl font-semibold flex items-center gap-2">
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
                <CardContent className="pt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="date">
                                Date:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="date"
                                type="date"
                                value={formatDate(patientData.date)}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="hospitalNumber">
                                Hospital Number:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="hospitalNumber"
                                type="number"
                                value={patientData.hospital_number || "N/A"}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="surname">
                                Surname:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="surname"
                                type="text"
                                value={patientData.surname || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="firstName">
                                First Name:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="firstName"
                                type="text"
                                value={patientData.first_name || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="otherNames">
                                Other Names:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="otherNames"
                                type="text"
                                value={patientData.other_names || "N/A"}
                                disabled
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Contact Information Section */}
            <Card className="pt-0 mb-8 shadow-sm">
                <CardHeader className="bg-[#f0f8f4] border-b ">
                    <CardTitle className=" pt-6 text-xl font-semibold flex items-center gap-2">
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
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="sex">
                                Sex:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 capitalize"
                                id="sex"
                                type="text"
                                value={patientData.sex || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="maritalStatus">
                                Marital Status:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="maritalStatus"
                                type="text"
                                value={patientData.marital_status || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="dateOfBirth">
                                Date of Birth:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="dateOfBirth"
                                type="date"
                                value={formatDate(patientData.date_of_birth)}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="phoneNumber">
                                Phone Number:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="phoneNumber"
                                type="text"
                                value={patientData.phone_number || "N/A"}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mt-6">
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="address">
                                Address:
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                                id="address"
                                value={patientData.address || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="occupation">
                                Occupation:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="occupation"
                                type="text"
                                value={patientData.occupation || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="placeOfWorkAddress">
                                Address of Place of Work:
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                                id="placeOfWorkAddress"
                                value={patientData.place_of_work_address || "N/A"}
                                disabled
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Demographic Information Section */}
            <Card className="pt-0 mb-8 shadow-sm">
                <CardHeader className="bg-[#f0f8f4] border-b ">
                    <CardTitle className=" pt-6 text-xl font-semibold flex items-center gap-2">
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
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="religion">
                                Religion:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="religion"
                                type="text"
                                value={patientData.religion || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="nationality">
                                Nationality:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="nationality"
                                type="text"
                                value={patientData.nationality || "N/A"}
                                disabled
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Next of Kin Section */}
            <Card className="pt-0 mb-8 shadow-sm">
                <CardHeader className="bg-[#f0f8f4] border-b ">
                    <CardTitle className=" pt-6 text-xl font-semibold flex items-center gap-2">
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
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="nextOfKin">
                                Next of Kin:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="nextOfKin"
                                type="text"
                                value={patientData.next_of_kin || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="relationship">
                                Relationship:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="relationship"
                                type="text"
                                value={patientData.relationship || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="nextOfKinPhoneNumber">
                                Next of Kin Phone Number:
                            </Label>
                            <Input
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50"
                                id="nextOfKinPhoneNumber"
                                type="text"
                                value={patientData.next_of_kin_phone || "N/A"}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mt-6">
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="addressOfNextOfKin">
                                Address of Next of Kin:
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[80px]"
                                id="addressOfNextOfKin"
                                value={patientData.next_of_kin_address || "N/A"}
                                disabled
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Medical History Section */}
            <Card className="pt-0 mb-8 shadow-sm">
                <CardHeader className="bg-[#f0f8f4] border-b ">
                    <CardTitle className=" pt-6 text-xl font-semibold flex items-center gap-2">
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
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="pastMedicalHistory">
                                Past Medical History:
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[100px]"
                                id="pastMedicalHistory"
                                value={patientData.past_medical_history || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="pastSurgicalHistory">
                                Past Surgical History:
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[100px]"
                                id="pastSurgicalHistory"
                                value={patientData.past_surgical_history || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="familyHistory">
                                Family History:
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[100px]"
                                id="familyHistory"
                                value={patientData.family_history || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="socialHistory">
                                Social History:
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[100px]"
                                id="socialHistory"
                                value={patientData.social_history || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="drugHistory">
                                Drug History:
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[100px]"
                                id="drugHistory"
                                value={patientData.drug_history || "N/A"}
                                disabled
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Allergies Section */}
            <Card className="pt-0 shadow-sm">
                <CardHeader className="bg-[#f0f8f4] border-b ">
                    <CardTitle className=" pt-6 text-xl font-semibold flex items-center gap-2">
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
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="allergies">
                                Any Allergies?:
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[100px]"
                                id="allergies"
                                value={patientData.allergies || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="dietaryRestrictions">
                                Any Dietary Restrictions:
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[100px]"
                                id="dietaryRestrictions"
                                value={patientData.dietary_restrictions || "N/A"}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <Label className="text-sm font-medium mb-2 block text-gray-700" htmlFor="dietAllergies">
                                Specify Diet Allergies to Certain Drugs:
                            </Label>
                            <Textarea
                                className="text-black disabled:opacity-90 border-[#268a6477] bg-gray-50 min-h-[100px]"
                                id="dietAllergies"
                                value={patientData.diet_allergies_to_drugs || "N/A"}
                                disabled
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
