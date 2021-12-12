const { Game } = require('./models');

// Game.bulkCreate([
//     {
//         name: 'pacman',
//         model: 'this is the model',
//         manufacturer: 'this is the manufacturer',
//         serialNumber: 'this is the serial number',
//         notes: 'Needs to be fixed',
//         picture: 'http://cdn.cnn.com/cnnnext/dam/assets/200518114838-05-pac-man-40.jpg',
//         highScore: 1500,
//         status: 'Needs repair'

//     },
//     {
//         name: 'street fighter',
//         model: 'this is the model',
//         manufacturer: 'this is the manufacturer',
//         serialNumber: 'this is the serial number',
//         notes: 'Needs to be fixed',
//         picture: 'https://s1.gaming-cdn.com/images/products/6468/orig/game-steam-street-fighter-v-champion-edition-cover.jpg',
//         highScore: 1500,
//         status: 'This works'

//     },
// ])
//     .then(function (newGamesList) {
//         console.log('.... this is making 2 new games .....');
//     })
//     .catch(function (error) {
//         console.log('... the games did not get added; try again ....');
//     })

/**
 *  name: DataTypes.STRING,
    model: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    serialNumber: DataTypes.STRING,
    notes: DataTypes.TEXT,
    picture: DataTypes.STRING,
    highScore: DataTypes.INTEGER,
    status: DataTypes.STRING,
 * 
 * */

Game.destroy({ where: { id: 4 } })
    .then(function (result) {
        console.log('... deleted a game ....');
        console.log(result);

    })
    .catch(function (error) {
        console.log('... error occured trying to delete game ...');
        console.log(error);
    })