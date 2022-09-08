import app from './app';
import { PhotoBusiness } from './../business/PhotoBusiness';
import { TicketController } from './TicketController';
import { ShowController } from './ShowsController';
import BandController from './BandController';
import UserController from './UserController';
import { PhotoController } from './PhotoController';


const userController = new UserController()
const bandController = new BandController()
const showsController = new ShowController()
const ticketController = new TicketController()
const photoController = new PhotoController()

// requisições usuários
app.post('/signup', userController.signup)
app.post('/login', userController.login)

// requisições bandas
app.post('/band', bandController.createBand)
app.get('/getbandbyid/:id', bandController.getBandById)

// requisições shows
app.post('/addshow', showsController.scheduleShow)
app.get('/getshowsbyday/:week_day', showsController.getShowByDay)

// requisições dos tickets
app.post('/createticket', ticketController.createTicket)
app.post('/buyticket', ticketController.buyTicket)

// requisições das fotos
app.post('/addphoto',photoController.insertPhoto)
app.get('/getphoto/:id', photoController.getAllPhotosById)