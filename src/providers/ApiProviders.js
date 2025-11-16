import axios from "axios";



const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
});

/* ============================
API Helper function here for USERS
============================ */
export const registerUser = async ({ accessToken, payload }) => {
  const response = await api.post("/users", payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const listUsers = async ({ accessToken }) => {
  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export const updateUser = async (accessToken, userData, userId) => {
  const response = await api.put("/users/" + userId, userData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const deleteUser = async (accessToken, userId) => {
  const response = await api.delete("/users/" + userId, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const toggleActiveUser = async (accessToken, userId) => {
  const response = await api.put("/users/" + userId + "/toggle", {}, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};


/* ============================
API Helper function here for PATIENTS
============================ */
export const registerPatient = async (patientData) => {
  const response = await api.post("/patients", patientData);
  return response;
};

export const getRegisteredPatients = async (accessToken) => {
  const response = await api.get("/patients", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const viewRegisteredPatient = async (patientId) => {
  const response = await api.get("/patients/" + patientId);
  return response.data;
};

export const updateRegisteredPatient = async (patientId, patientData) => {
  const response = await api.put(
    "/patients/" + patientId,
    patientData
  );
  return response.data;
};

export const deleteRegisteredPatient = async (patientId) => {
  const response = await api.delete("/patients/" + patientId);
  return response.data;
};

/* ============================
   API Helper function here for Vital Signs
   ============================ */
export const createVitalSign = async (vitalSignData) => {
  const response = await api.post("/vital-signs", vitalSignData);
  return response;
};

export const getVitalSignsByPatientId = async (patientId) => {
  const response = await api.get("/vital-signs/patient/" + patientId);
  return response.data;
};

export const updateVitalSign = async (vitalSignId, vitalSignData) => {
  const response = await api.put(
    "/vital-signs/" + vitalSignId,
    vitalSignData
  );
  return response.data;
};

/* ============================
   API Helper function here for DOCTORS
   ============================ */
export const registerDoctor = async (doctorData) => {
  const response = await api.post("/doctors", doctorData);
  return response;
};

export const getDoctors = async (accessToken) => {
  const response = await api.get("/doctors", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const viewDoctor = async (doctorId) => {
  const response = await api.get("/doctors/" + doctorId);
  return response.data;
};

export const deleteDoctor = async (doctorId) => {
  const response = await api.delete("/doctors/" + doctorId);
  return response.data;
};

export const updateDoctor = async (doctorData) => {
  const response = await api.put("/doctors/", doctorData);
  return response.data;
};

/* ============================
   API Helper function here for Appointments
   ============================ */
export const getAppointments = async (page = 1, pageSize = 20, searchTerm = "") => {
  const response = await api.get(`/appointments?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`);
  return response.data;
};

export const getAppointmentsByPatientId = async (patientId) => {
  const response = await api.get(`/appointments/${patientId}/patient`);
  return response.data;
}

export const viewAppointment = async (appointmentId) => {
  const response = await api.get(
    "/appointments/" + appointmentId
  );
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await api.post(
    "/appointments",
    appointmentData
  );
  return response.data;
};

export const updateAppointment = async (appointmentData, appointmentId) => {
  const response = await api.put(
    "/appointments/" + appointmentId,
    appointmentData
  );
  return response.data;
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  const response = await api.put(
    "/appointments/" + appointmentId + "/status",
    { status }
  );
  return response.data;
};

export const deleteAppointment = async (appointmentId) => {
  const response = await api.delete(
    "/appointments/" + appointmentId
  );
  return response.data;
};

/* ============================
   API Helper function here for DEATHS
   ============================ */

export const getDeaths = async (accessToken) => {
  const response = await api.get("/deaths", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const createDeath = async (deathData) => {
  const response = await api.post("/deaths", deathData);
  return response.data;
};

export const deleteDeath = async (deathId) => {
  const response = await api.delete("/deaths/" + deathId);
  return response.data;
};

export const updateDeathRecord = async (deathId, deathData) => {
  const response = await api.put(
    "/deaths/" + deathId,
    deathData
  );
  return response.data;
};

/* ============================
   API Helper function here for BIRTHS
   ============================ */

export const getBirths = async (accessToken) => {
  const response = await api.get("/births", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const createBirths = async (birthData) => {
  const response = await api.post("/births", birthData);
  return response.data;
};

export const deleteBirth = async (birthId) => {
  const response = await api.delete("/births/" + birthId);
  return response.data;
};

export const updateBirthRecord = async (birthId, birthData) => {
  const response = await api.put(
    "/births/" + birthId,
    birthData
  );
  return response.data;
};

/* ============================
   API Helper function here for SYMPTOMS
   ============================ */

// SYMPTOM TYPES
export const getSymptomTypes = async () => {
  const response = await api.get("/symptom-types");
  return response.data;
};

export const createSymptomType = async (symptomTypeData) => {
  const response = await api.post(
    "/symptom-types",
    symptomTypeData
  );
  return response.data;
};

export const updateSymptomType = async (symptomTypeId, symptomTypeData) => {
  const response = await api.put(
    "/symptom-types/" + symptomTypeId,
    symptomTypeData
  );
  return response.data;
};

export const deleteSymptomType = async (symptomTypeId) => {
  const response = await api.delete(
    "/symptom-types/" + symptomTypeId
  );
  return response.data;
};

// SYMPTOM HEADS
export const getSymptomHeads = async () => {
  const response = await api.get("/symptom-heads");
  return response.data;
};

export const createSymptomHead = async (symptomHeadData) => {
  const response = await api.post(
    "/symptom-heads",
    symptomHeadData
  );
  return response.data;
};

export const updateSymptomHead = async (symptomHeadId, symptomHeadData) => {
  const response = await api.put(
    "/symptom-heads/" + symptomHeadId,
    symptomHeadData
  );
  return response.data;
};

export const deleteSymptomHead = async (symptomHeadId) => {
  const response = await api.delete(
    "/symptom-heads/" + symptomHeadId
  );
  return response.data;
};


/* ============================
   API Helper function here for BED TYPES
   ============================ */

// BED TYPES
export const getBedTypes = async () => {
  const response = await api.get(`/bed-types`);
  return response.data;
};

export const createBedType = async (typeData) => {
  const response = await api.post(`/bed-types`, typeData);
  return response.data;
};

export const updateBedType = async (typeId, typeData) => {
  const response = await api.put(`/bed-types/${typeId}`, typeData);
  return response.data;
};

export const deleteBedType = async (typeId) => {
  const response = await api.delete(`/bed-types/${typeId}`);
  return response.data;
};

// BED GROUPS
export const getBedGroups = async () => {
  const response = await api.get(`/bed-groups`);
  return response.data;
};

export const createBedGroup = async (groupData) => {
  const response = await api.post(`/bed-groups`, groupData);
  return response.data;
};

export const updateBedGroup = async (groupId, groupData) => {
  const response = await api.put(
    `/bed-groups/${groupId}`,
    groupData
  );
  return response.data;
};

export const deleteBedGroup = async (groupId) => {
  const response = await api.delete(`/bed-groups/${groupId}`);
  return response.data;
};

// BEDS
export const getBeds = async () => {
  const response = await api.get(`/beds`);
  return response.data;
};

export const getBed = async (bedId) => {
  const response = await api.get(`/beds/${bedId}`);
  return response.data;
};

export const createBed = async (bedData) => {
  const response = await api.post(`/beds`, bedData);
  return response.data;
};

export const updateBed = async (bedId, bedData) => {
  const response = await api.put(`/beds/${bedId}`, bedData);
  return response.data;
};

export const deleteBed = async (bedId) => {
  const response = await api.delete(`/beds/${bedId}`);
  return response.data;
};


/* ============================
   API Helper function here for inpatient admissions
   ============================ */

export const getInpatients = async (accessToken) => {
  const response = await api.get(`/inpatients`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const getInpatientByPatientId = async (patientId) => {
  const response = await api.get(`/inpatients/${patientId}/admissions`);
  return response.data;
}

export const getInpatient = async (inpatientId) => {
  const response = await api.get(`/inpatients/${inpatientId}`);
  return response.data;
};

export const createInpatient = async (inpatientData) => {
  const response = await api.post(`/inpatients`, inpatientData);
  return response.data;
};

export const updateInpatient = async (inpatientId, inpatientData) => {
  const response = await api.put(
    `/inpatients/${inpatientId}`,
    inpatientData
  );
  return response.data;
};

export const deleteInpatient = async (inpatientId) => {
  const response = await api.delete(`/inpatients/${inpatientId}`);
  return response.data;
};

export const dischargeInpatient = async (dischargeData) => {
  const { admission_id } = dischargeData;
  const response = await api.post(`/inpatients/${admission_id}/discharge`, dischargeData);
  return response.data;
};

export const getDischarSummaryByAdmissionId = async (admissionId) => {
  const response = await api.get(`/inpatients/${admissionId}/discharge-summary`);
  return response.data;
}

/* ============================
API Helper function here for BILLS
============================ */

export const getBills = async (page = 1, pageSize = 20, billNumberFilter, statusFilter, issuedByFilter, patientIdFilter) => {
  const response = await api.get(`/bills?page=${page}&pageSize=${pageSize}&billNumber=${billNumberFilter}&status=${statusFilter}&issuedBy=${issuedByFilter}&patientId=${patientIdFilter}`);
  return response.data;
};

export const getBillByPatientId = async (patientId) => {
  const response = await api.get(`/patient-bills/${patientId}`);
  return response.data;
}

export const getBill = async (billId) => {
  const response = await api.get(`/bills/${billId}`);
  return response.data;
};

export const createBill = async (billData) => {
  const response = await api.post(`/bills`, billData);
  return response.data;
};

export const updateBill = async (billId, billData) => {
  const response = await api.put(
    `/bills/${billId}`,
    billData
  );
  return response.data;
};

export const deleteBill = async (billId) => {
  const response = await api.delete(`/bills/${billId}`);
  return response.data;
};


/* ============================
API Helper function here for LAB TEST TYPES
============================ */

export const getLabTestTypes = async () => {
  const response = await api.get(`/lab-tests/lab-test-types`);
  return response.data;
};

export const getLabTestType = async (labTestTypeId) => {
  const response = await api.get(`/lab-tests/lab-test-type/${labTestTypeId}`);
  return response.data;
};

export const createLabTestType = async (labTestTypeData) => {
  const response = await api.post(`/lab-tests/lab-test-type`, labTestTypeData);
  return response.data;
};

export const updateLabTestType = async (labTestTypeId, labTestTypeData) => {
  const response = await api.put(
    `/lab-tests/lab-test-type/${labTestTypeId}`,
    labTestTypeData
  );
  return response.data;
};

export const deleteLabTestType = async (labTestTypeId) => {
  const response = await api.delete(`/lab-tests/lab-test-type/${labTestTypeId}`);
  return response.data;
};


/* ============================
API Helper function here for LAB TEST ANALYSIS
============================ */

export const getLabTests = async () => {
  const response = await api.get(`/lab-tests`);
  return response.data;
};

export const getPaginatedLabTests = async (page = 1, pageSize = 20, searchTerm = "") => {
  const response = await api.get(`/lab-tests/laboratory/paginated?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`);
  return response.data;
};

export const getLabTestsByPatientId = async (patientId) => {
  const response = await api.get(`/lab-tests/patient/${patientId}`);
  return response.data;
};

export const getLabTest = async (labTestId) => {
  const response = await api.get(`/lab-tests/${labTestId}`);
  return response.data;
};

export const createLabTest = async (labTestData) => {
  const response = await api.post(`/lab-tests`, labTestData);
  return response.data;
};

export const updateLabTest = async (labTestId, labTestData) => {
  const config = labTestData instanceof FormData 
    ? { headers: { 'Content-Type': 'multipart/form-data' } }
    : {};
    
  const response = await api.put(
    `/lab-tests/${labTestId}`,
    labTestData,
    config
  );
  return response.data;
};

export const deleteLabTest = async (labTestId) => {
  const response = await api.delete(`/lab-tests/${labTestId}/delete`);
  return response.data;
};



/* ============================
API Helper function here for COMPLAINTS
============================ */

export const getComplaintsByPatientId = async (patientId) => {
  const response = await api.get(`/complaints/${patientId}`);
  return response.data;
};

export const createComplaint = async (complaintData) => {
  const response = await api.post(`/complaints`, complaintData);
  return response.data;
};

export const updateComplaint = async (complaintId, complaintData) => {
  const response = await api.put(
    `/complaints/${complaintId}`,
    complaintData
  );
  return response.data;
};

export const deleteComplaint = async (complaintId) => {
  const response = await api.delete(`/complaints/${complaintId}`);
  return response.data;
};


/* ============================
API Helper function here for PHYSICAL EXAMINATION
============================ */

export const createPhysicalExamination = async (physicalExaminationData) => {
  const response = await api.post(`/physical-examinations`, physicalExaminationData);
  return response.data;
};

export const getPhysicalExaminationsByPatientId = async (patientId) => {
  const response = await api.get(`/physical-examinations/patient/${patientId}`);
  return response.data;
};



/* ============================
API Helper function here for CONDITIONS
============================ */

export const createCondition = async (conditionData) => {
  const response = await api.post(`/conditions`, conditionData);
  return response.data;
}

export const getConditions = async () => {
  const response = await api.get(`/conditions`);
  return response.data;
}

export const deleteCondition = async (conditionId) => {
  const response = await api.delete(`/conditions/${conditionId}`);
  return response.data;
}

export const updateCondition = async (conditionId, conditionData) => {
  const response = await api.put(`/conditions/${conditionId}`, conditionData);
  return response.data;
}

/* ============================
API Helper function here for DIAGNOSES
============================ */

export const createDiagnoses = async (diagnosesData) => {
  const response = await api.post(`/diagnoses`, diagnosesData);
  return response.data;
}

export const getDiagnosesByPatientId = async (patientId) => {
  const response = await api.get(`/diagnoses/${patientId}`);
  return response.data;
}

export const updateDiagnoses = async (diagnosesId, diagnosesData) => {
  const response = await api.put(`/diagnoses/${diagnosesId}`, diagnosesData);
  return response.data;
}

export const deleteDiagnoses = async (diagnosesId) => {
  const response = await api.delete(`/diagnoses/${diagnosesId}`);
  return response.data;
}

/* ============================
API Helper function here for PRESCRIPTIONS
============================ */

export const createPrescription = async (prescriptionData) => {
  const response = await api.post(`/prescriptions`, prescriptionData);
  return response.data;
}

export const getPrescriptionsByPatientId = async (patientId) => {
  const response = await api.get(`/prescriptions/${patientId}`);
  return response.data;
}

export const changePrescriptionStatus = async (prescriptionId, StatusData) => {
  const response = await api.put(`/prescriptions/${prescriptionId}`, StatusData);
  return response.data;
}

export const deletePrescription = async (prescriptionId) => {
  const response = await api.delete(`/prescriptions/${prescriptionId}`);
  return response.data;
}

/* ============================
API Helper function here for procedures
============================ */

export const createProcedure = async (procedureData) => {
  const response = await api.post(`/procedures`, procedureData);
  return response.data;
}

export const getProceduresByPatientId = async (patientId) => {
  const response = await api.get(`/procedures/${patientId}`);
  return response.data;
}


/* ============================
API Helper function here for DOCTOR's NOTES
============================ */

export const createDoctorsNote = async (doctorsNoteData) => {
  const response = await api.post(`/doctor-notes`, doctorsNoteData);
  return response.data;
}

export const getDoctorsNotesByPatientId = async (patientId) => {
  const response = await api.get(`/doctor-notes/patient/${patientId}`);
  return response.data;
}

export const deleteDoctorsNote = async (doctorsNoteId) => {
  const response = await api.delete(`/doctor-notes/${doctorsNoteId}`);
  return response.data;
}

export const updateDoctorsNote = async (doctorsNoteId, doctorsNoteData) => {
  const response = await api.put(`/doctor-notes/${doctorsNoteId}`, doctorsNoteData);
  return response.data;
}


/* ============================
API Helper function here for NURSES NOTES
============================ */

export const createNursesNote = async (nursesNoteData) => {
  const response = await api.post(`/nurse-notes`, nursesNoteData);
  return response.data;
}

export const getNursesNotesByPatientId = async (patientId) => {
  const response = await api.get(`/nurse-notes/patient/${patientId}`);
  return response.data;
}

export const deleteNursesNote = async (nursesNoteId) => {
  const response = await api.delete(`/nurse-notes/${nursesNoteId}`);
  return response.data;
}

export const updateNursesNote = async (nursesNoteId, nursesNoteData) => {
  const response = await api.put(`/nurse-notes/${nursesNoteId}`, nursesNoteData);
  return response.data;
}


/* ============================
   API Helper function here for PATIENT SUMMARIES
   ============================ */

export const getAdmissionSummaryByPatientId = async (patientId) => {
  const response = await api.get(`/admissions-summary/${patientId}`);
  return response.data;
}

export const getDiagnosisSummaryByPatientId = async (patientId) => {
  const response = await api.get(`/diagnosis-summary/${patientId}`);
  return response.data;
}

export const getLabTestSummaryByPatientId = async (patientId) => {
  const response = await api.get(`/lab-test-summary/${patientId}`);
  return response.data;
}

export const getVitalSignSummaryByPatientId = async (patientId) => {
  const response = await api.get(`/vital-sign-summary/${patientId}`);
  return response.data;
}


/* ============================
   API Helper function here for OVERVIEW STATISTICS
   ============================ */

export const getPatientStatusDistribution = async ({ accessToken }) => {
  const response = await api.get(`/stats/patient-status-distribution`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}


export const getStaffRolesDistribution = async ({ accessToken }) => {
  const response = await api.get(`/stats/staff-roles-distribution`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

export const getAppointmentStatusDistribution = async ({ accessToken }) => {
  const response = await api.get(`/stats/appointment-status-distribution`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

export const getAppointmensToday = async ({ accessToken }) => {
  const response = await api.get(`/stats/appointments-today`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

export const getLabTestPending = async ({ accessToken }) => {
  const response = await api.get(`/stats/lab-test-pending`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}



/* ============================
API Helper function here for PATIENT VISITS
============================ */

export const getPaginatedPatientVisits = async ({ accessToken, page = 1, pageSize = 10, firstName = "", surname = "", phoneNumber = "", hospitalNumber = "", startDate = "", endDate = "" }) => {
  const response = await api.get(`/patient-visits/paginated?page=${page}&pageSize=${pageSize}&firstName=${firstName}&surname=${surname}&phoneNumber=${phoneNumber}&hospitalNumber=${hospitalNumber}&startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

export const getPatientVisits = async ({ accessToken }) => {
  const response = await api.get(`/patient-visits`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

export const getPatientVisitsByPatientId = async ({ accessToken, patient_id }) => {
  const response = await api.get(`/patient-visits/${patient_id}/patient`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

export const createPatientVisit = async ({ accessToken, patientVisitData }) => {
  const response = await api.post(`/patient-visits`, patientVisitData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}




/* ============================
API Helper function here for notifications
============================ */

export const getUnreadNotifications = async ({ accessToken }) => {
  const response = await api.get(`/notifications/unread`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

export const markNotificationAsRead = async ({ accessToken, notificationId }) => {
  const response = await api.post(`/notifications/${notificationId}/mark-as-read`, {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

export const getPaginatedNotifications = async ({ accessToken, page, pageSize }) => {
  const response = await api.get(`/notifications/paginated?page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}


export const getServerTime = async () => {
  const response = await api.get(`/server-time`);
  return response.data;
}