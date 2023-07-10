type User = {
    email: string;
    password: string;
    fullname: string;
    phone: string;
    birth_date: Date;
    address: string;
    confession_father: string;
    team_id: number;
    role_id: number;
    isapproved: number;
    isadmin: number;
    token:string;
}
export default User;