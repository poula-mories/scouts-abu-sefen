import express, { Request, Response } from 'express';
import AttendanceModel from '../models/attendance-model';
import AttendanceDetailsModel  from '../models/attendance-details-model';
import AttendanceType from '../types/attendance-type';


const getAllAttendances = async (req: Request, res: Response) => {
    try {
        const attendances = await AttendanceDetailsModel.findAll({
            attributes: ['name', 'service_meeting']
        });
        res.send(attendances);
    }
    catch (err) {
        console.log(err);
    }
}


const checkAttendance = async (req: Request, res: Response) => {
    const checkattendance :any = await AttendanceModel.findAll({
        attributes: ['attendance_details_id', 'user_id', 'date_time'],
        where: {
            attendance_details_id: req.body.attendance_details_id,
            user_id:req.body.user_id
        }
    });

    if(checkattendance.length==0)
    {
        res.status(200);
        res.json('attendance of user ' + req.body.user_id +'  not found');
    }
    else if (req.body.attendance_details_id==req.body.user_id)
    {
        res.status(400)
        res.json('this user cannot take attendance for himself')
    }
    else{
        var attendance_date=checkattendance[0].date_time.toISOString().slice(0,10)

        var datetimenow = new Date();
        var datenow=datetimenow.toISOString().slice(0,10);
        
        if (attendance_date==datenow && checkattendance[0].attendance_details_id==req.body.attendance_details_id && checkattendance[0].user_id==req.body.user_id)
        {
            res.status(400)
            res.json('attendance of user ' + req.body.user_id +'  aleardy exist')
        }
        else{
            res.status(200);
            res.json('attendance of user ' + req.body.user_id +'  not found');
        }
    }
}


const takeAttendance = async (req: Request, res: Response) => {

    const attendance: AttendanceType = {
        attendance_taker_id: req.body.attendance_taker_id,
        attendance_details_id: req.body.attendance_details_id,
        user_id: req.body.user_id,
        score: 5,
        date_time: new Date()
    } 

    const  takeAttendanceFunc = async (attendance:AttendanceType)=>
    {
        try {
            const newAttendance =  await AttendanceModel.create(attendance)
            res.status(200);
            res.json(newAttendance);
        } catch (err) {
            console.log(err);
            res.status(400)
            res.json(err as string + attendance)
        }
    }
        const attendancedetails :any = await AttendanceDetailsModel.findAll({
            attributes: ['name', 'service_meeting'],
            where: {
                id: req.body.attendance_details_id
            }
        });
            //service score = 5
        if(attendancedetails[0].service_meeting=='service')
        {
            takeAttendanceFunc(attendance)
        }
        else
        {
            //meeting score = 1
            attendance.score=1;
            takeAttendanceFunc(attendance)
        }


}


const createAttendanceDetails = async (req: Request, res: Response) => {

    const attendancedetails ={
        name:req.body.name, 
        service_meeting:req.body.service_meeting,
        created_user_id:req.body.created_user_id,
        created_datetime:new Date()
    }
    
    try {
        const newAttendanceDetails = await AttendanceDetailsModel.create(attendancedetails)
        res.status(200);
        res.json(newAttendanceDetails);
    } catch (err) {
        console.log(err);
        res.status(400)
        res.json(err as string + req.body.name)
    }

}


const attendanceRoutes = (app: express.Application) => {
    app.get('/getAllAttendances', getAllAttendances)
    app.post('/createAttendanceDetails', createAttendanceDetails)
    app.post('/takeAttendance', takeAttendance)
    app.get('/checkAttendance', checkAttendance)
}




export default attendanceRoutes;