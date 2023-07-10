import sequelize from '../databaseConnectionSequelize';
import { DataTypes } from 'sequelize'


const Users =  sequelize.define('users', {
                email: {
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                password: {    
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                fullname: {    
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                phone: {    
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                birth_date: {    
                    allowNull: false,
                    type: DataTypes.DATE,
                },
                confession_father: {    
                    allowNull: false,
                    type: DataTypes.STRING,
                },
                team_id: {    
                    allowNull: true,
                    type: DataTypes.INTEGER,
                },
                role_id: {    
                    allowNull: false,
                    type: DataTypes.INTEGER,
                },
                isapproved: {    
                    allowNull: false,
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                },
                approval_user_id: {    
                    allowNull: true,
                    type: DataTypes.INTEGER,
                },
                isadmin: {    
                    allowNull: true,
                    type: DataTypes.INTEGER,
                },
                address: {    
                    allowNull: false,
                    type: DataTypes.STRING,
                }}, {
                    timestamps: false
                });



export default Users;