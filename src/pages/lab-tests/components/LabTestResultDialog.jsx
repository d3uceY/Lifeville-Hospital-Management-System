import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TestTube, User, Calendar, FileText, Stethoscope, ClipboardList, Edit, Download } from "lucide-react"
import { getLabTestStatusBadge } from "../../../helpers/getLabTestStatusBadge"
import { formatDate } from "../../../helpers/formatDate"
import PrintWrapper from "../../../components/print/print-wrapper"
import LabTestResultPrint from "../../../components/print/prints/lab-test-result-print"
import { ImageGalleryCard } from "../../../components/ImageGalleryCard"

export function LabTestResultDialog({ testResult, children }) {

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-[100vw] !max-w-[80vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <TestTube className="h-5 w-5 shrink-0" />
                        Test Result Details - #{testResult.id}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Patient & Test Info */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <User className="h-4 w-4" />
                                    Patient Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Patient Name</label>
                                    <p className="text-sm font-medium">
                                        {testResult.first_name} {testResult.surname}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Patient ID</label>
                                    <p className="text-sm font-medium">{testResult.patient_id}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Hospital Number</label>
                                    <p className="text-sm font-medium">{testResult.hospital_number}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Stethoscope className="h-4 w-4" />
                                    Test Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Test Type</label>
                                    <p className="text-sm font-medium">{testResult.test_type}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Prescribed By</label>
                                    <p className="text-sm font-medium">{testResult.prescribed_by}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Status</label>
                                    <div className="mt-1">{getLabTestStatusBadge(testResult.status)}</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Test Results */}
                    <Card className="border-[#268a6461] pt-0">
                        <CardHeader className="pb-3 pt-6 bg-[#f0f8f4] flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <ClipboardList className="h-4 w-4" />
                                Test Results
                            </CardTitle>
                            <div className="flex gap-2">
                                {/* <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#268a6461] hover:bg-[#e6f2ed] text-[#106041] bg-transparent"
                                >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button> */}
                                {/* <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#268a6461] hover:bg-[#e6f2ed] text-[#106041] bg-transparent"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download
                                </Button> */}
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {testResult.results ? (
                                <div className="p-4 bg-gray-50 rounded-lg border">
                                    <pre className="whitespace-pre-wrap text-sm font-mono">{testResult.results}</pre>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <TestTube className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                    <p className="text-sm">No results available yet</p>
                                    <p className="text-xs text-gray-400 mt-1">Results will appear here once the test is completed</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Images Gallery */}
                    <ImageGalleryCard
                        title="Documents"
                        images={testResult.images}
                    />

                    {/* Comments & Notes */}
                    {testResult.comments && (
                        <Card className="border-[#268a6461] pt-0">
                            <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <FileText className="h-4 w-4" />
                                    Comments & Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="p-4 bg-gray-50 rounded-lg border">
                                    <p className="text-sm">{testResult.comments}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Timeline */}
                    <Card className="border-[#268a6461] pt-0">
                        <CardHeader className="pb-3 pt-6 bg-[#f0f8f4]">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Calendar className="h-4 w-4" />
                                Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 bg-[#268a64] rounded-full mt-2"></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium">Test Ordered</p>
                                            <span className="text-xs text-gray-500">{formatDate(testResult.created_at)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Test was prescribed by {testResult.prescribed_by}</p>
                                    </div>
                                </div>

                                {testResult.updated_at !== testResult.created_at && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 bg-[#268a64] rounded-full mt-2"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium">Last Updated</p>
                                                <span className="text-xs text-gray-500">{formatDate(testResult.updated_at)}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Test information was last modified</p>
                                        </div>
                                    </div>
                                )}

                                {testResult.status === "completed" && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-green-700">Test Completed</p>
                                                <span className="text-xs text-gray-500">{formatDate(testResult.updated_at)}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Results are now available</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <PrintWrapper triggerLabel="Print Lab Test">
                            <LabTestResultPrint testResult={testResult} />
                        </PrintWrapper>

                        {/* <Button variant="outline" className="border-[#268a6461] hover:bg-[#e6f2ed] text-[#106041] bg-transparent">
                            Share Results
                        </Button>
                        <Button className="bg-[#106041] text-white hover:bg-[#0d4e34] focus:ring-[#268a6429]">Update Status</Button> */}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
