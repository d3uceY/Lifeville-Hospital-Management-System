import { Badge } from "@/components/ui/badge"
import { Calendar, Repeat } from "lucide-react"
import { FlaskConical } from "lucide-react"
import { User } from "lucide-react"
import { Bed } from "lucide-react"
import { UserCheck } from "lucide-react"
import { Bell } from "lucide-react"
import { Activity } from "lucide-react"

export const getNotificationBadge = (notification) => {
    const type = notification.type || "PATIENT"

    switch (type) {
        case "APPOINTMENT":
            return (
                <Badge className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 hover:bg-blue-200 border-0 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Appointment
                </Badge>
            )
        case "LAB_TEST":
            return (
                <Badge className="text-xs px-2 py-0.5 bg-green-100 text-green-800 hover:bg-green-200 border-0 flex items-center gap-1">
                    <FlaskConical className="h-3 w-3" />
                    Lab Test
                </Badge>
            )
        case "PATIENT":
            return (
                <Badge className="text-xs px-2 py-0.5 bg-purple-100 text-purple-800 hover:bg-purple-200 border-0 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Patient
                </Badge>
            )
        case "INPATIENT":
            return (
                <Badge className="text-xs px-2 py-0.5 bg-orange-100 text-orange-800 hover:bg-orange-200 border-0 flex items-center gap-1">
                    <Bed className="h-3 w-3" />
                    Inpatient
                </Badge>
            )
        case "INPATIENT_DISCHARGED":
            return (
                <Badge className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-0 flex items-center gap-1">
                    <UserCheck className="h-3 w-3" />
                    Discharged
                </Badge>
            )
        case "PATIENT_VISIT":
            return (
                <Badge className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-0 flex items-center gap-1">
                    <Repeat className="h-3 w-3" />
                    Visit
                </Badge>
            )
        case "VITAL_SIGNS":
            return (
                <Badge className="text-xs px-2 py-0.5 bg-rose-100 text-rose-800 hover:bg-rose-200 border-0 flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    Vital Signs
                </Badge>
            )

        default:
            return (
                <Badge className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800 hover:bg-gray-200 border-0 flex items-center gap-1">
                    <Bell className="h-3 w-3" />
                    General
                </Badge>
            )
    }
}
