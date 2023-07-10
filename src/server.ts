import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import userRoutes from './handlers/users';
import attendanceRoutes from './handlers/attendances';
import roleRoutes from './handlers/roles';
import teamRoutes from './handlers/teams';


const app: express.Application = express()
const address: string = "localhost:4000"

app.use(bodyParser.json())
app.use(cors<Request>())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

userRoutes(app);
attendanceRoutes(app);
roleRoutes(app);
teamRoutes(app);

app.listen(4000, function () {
    console.log(`starting app on: ${address}`)
})
