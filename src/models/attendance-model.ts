import sequelize from '../databaseConnectionSequelize';
import { DataTypes } from 'sequelize'

 const AttendanceModel =  sequelize.define('attendance', {
    
    attendance_taker_id: {    
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    attendance_details_id: {    
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    user_id: {    
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    score: {    
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    date_time: {    
        allowNull: false,
        type: DataTypes.DATE,
    }}, {
        freezeTableName: true,
        timestamps: false
    });




export default AttendanceModel;