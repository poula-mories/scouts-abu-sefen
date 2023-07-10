import sequelize from '../databaseConnectionSequelize';
import { DataTypes } from 'sequelize'



const RoleModel =  sequelize.define('role', {
    
    
    id: { 
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    name: {    
        allowNull: false,
        type: DataTypes.STRING,
    }}, {
        freezeTableName: true,
        timestamps: false
    });




export default RoleModel;