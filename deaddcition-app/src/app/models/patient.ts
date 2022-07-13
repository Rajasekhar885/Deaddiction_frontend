// import { medication } from "./medication"

export interface Patient {
    patientId:number,
    patientName:string,
    uniqueId:string,
    age:number,
    gender:string,
    mail:string,
    contactNumber:string,
    addictiontype:string,
    checkIn:Date,
    checkOut:Date ,
    medication:string
    // medication: Set<medication>,
    
    sessionDescription:string
    nextFollowup:Date,
    followupInfo:string
}
