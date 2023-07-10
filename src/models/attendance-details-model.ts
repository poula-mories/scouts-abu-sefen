import sequelize from '../databaseConnectionSequelize';
import { DataTypes } from 'sequelize'



const AttendanceDetailsModel =  sequelize.define('attendance_details', {
    
    name: {    
        allowNull: false,
        type: DataTypes.STRING,
    },
    service_meeting: {    
        allowNull: false,
        type: DataTypes.STRING,
    },
    created_user_id: {    
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    created_datetime: {    
        allowNull: false,
        type: DataTypes.DATE,
    },}, {
        freezeTableName: true,
        timestamps: false
    });




export default AttendanceDetailsModel;