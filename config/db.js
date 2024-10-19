const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://eloanbajajfinserv:zmo6Rq1H8Xs2R5ji@alphatechcluster.funme.mongodb.net/?retryWrites=true&w=majority&appName=alphaTechCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(error => console.log(error));

module.exports = mongoose;
