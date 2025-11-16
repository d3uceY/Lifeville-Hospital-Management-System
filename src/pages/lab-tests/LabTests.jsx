import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, FilePenLine, Download, SquareArrowOutUpRight, TestTube } from "lucide-react"
import { formatDate } from "../../helpers/formatDate"
import { getPaginatedLabTests } from "../../providers/ApiProviders"
import { getLabTestStatusBadge } from "../../helpers/getLabTestStatusBadge"
import { EditLabTestResultDialog } from "./components/EditLabTestResultDialog"
import { Link } from "react-router-dom"
import { useDebounce } from "../../hooks/use-debounce"
import { CustomTooltip } from "../../helpers/customTooltip"
import { hasPermission } from "../../helpers/hasPermission"
import PrintWrapper from "../../components/print/print-wrapper"
import LabTestResultPrint from "../../components/print/prints/lab-test-result-print"
import TableSkeletonV2 from "../../components/table-skeleton-v2"
import { GetTitle } from "../../helpers/getTitle"



export default function LabTests() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)

  // Filter states
  const [term, setTerm] = useState("")
  const debouncedSearchTerm = useDebounce(term, 1000)

  const { data, isLoading, error } = useQuery({
    queryKey: ["lab-tests", page, pageSize, debouncedSearchTerm],
    queryFn: () => getPaginatedLabTests(page, pageSize, debouncedSearchTerm),
  })

  const handleSearchTermChange = (value) => {
    setTerm(value)
  }



  if (error) return <div className="flex justify-center items-center h-64 text-red-500">Error: {error.message}</div>


  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page < data?.totalPages) {
      setPage(page + 1)
    }
  }


  // Filter the data based on current filters

  return (
    <div className="lg:p-6">
      <GetTitle title="Lab Tests" />
      <Card className="shadow-sm py-0 overflow-hidden">
        <CardHeader className="pb-3 border-b bg-[#f0f8f4] pt-6">
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5 shrink-0" />
            Lab Tests
          </CardTitle>
        </CardHeader>
        <CardContent className="md:p-6 p-2">
          <div className="mb-6 bg-white rounded-lg border md:p-4 p-3 shadow-sm">
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter Lab Tests
            </h3>
            <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-500">Lab Test </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search lab test"
                    value={term}
                    onChange={(event) => handleSearchTermChange(event.target.value)}
                    className="pl-9 border-[#268a6461] rounded-md focus-visible:ring-[#268a6429] focus-visible:border-[#268a64]"
                  />
                </div>
              </div>
            </div>
          </div>

          {isLoading ? <TableSkeletonV2 /> : (
            <div className="rounded-md border overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-[#f0f8f4]">
                  <TableRow>
                    <TableHead className="font-medium">Test ID</TableHead>
                    <TableHead className="font-medium">Patient Name</TableHead>
                    <TableHead className="font-medium">Hospital No</TableHead>
                    <TableHead className="font-medium">Test Name</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Result</TableHead>
                    <TableHead className="font-medium">Requested By</TableHead>
                    <TableHead className="font-medium">Created At</TableHead>
                    <TableHead className="font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data?.data?.length ? (
                    data?.data.map((test) => (
                      <TableRow key={test.lab_test_id}>
                        <TableCell className="font-medium">TST-{test.lab_test_id}</TableCell>
                        <TableCell>{`${test.surname} ${test.first_name}`}</TableCell>
                        <TableCell>{test.hospital_number}</TableCell>
                        <TableCell>{test.test_type}</TableCell>
                        <TableCell>{getLabTestStatusBadge(test.status)}</TableCell>
                        <TableCell>{test.result || "Pending"}</TableCell>
                        <TableCell>{test.prescribed_by}</TableCell>
                        <TableCell>{formatDate(test.created_at)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {
                              hasPermission(['superadmin', 'lab']) && (
                                <CustomTooltip content="Edit Lab Test">
                                  <EditLabTestResultDialog testResult={test}>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="action-edit-btn"
                                    >
                                      <FilePenLine className="h-4 w-4" />
                                    </Button>
                                  </EditLabTestResultDialog>
                                </CustomTooltip>
                              )
                            }

                            <CustomTooltip content="View Patient Analysis">
                              <Link to={`/patient-profile/${test.patient_id}/${test.surname}/${test.first_name}/analysis`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="action-view-btn"
                                >
                                  <SquareArrowOutUpRight className="h-4 w-4" />
                                </Button>
                              </Link>
                            </CustomTooltip>
                            {
                              hasPermission(['superadmin', 'doctor', 'lab']) && (
                                <CustomTooltip content="Download Lab Test">
                                  <PrintWrapper triggerLabel="">
                                    <LabTestResultPrint testResult={test} />
                                  </PrintWrapper>
                                </CustomTooltip>
                              )
                            }
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-10 text-gray-500">
                        No lab tests found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between space-x-2 py-4 px-6 border-t">
                <div className="flex-1 text-sm text-gray-500">
                  Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, data?.totalItems)} of {data?.totalItems}{" "}
                  lab test(s)
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-500">
                    Page {page} of {data?.totalPages}
                  </div>
                  <div className="space-x-2 flex">
                    <Button
                      className="bg-[#106041] text-white hover:bg-[#0d4e34] focus:ring-[#268a6429]"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={page <= 1}
                    >
                      Previous
                    </Button>
                    <Button
                      className="bg-[#106041] text-white hover:bg-[#0d4e34] focus:ring-[#268a6429]"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={page >= data?.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
