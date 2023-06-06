const Seance = require('../models/Seance')
const Reservation = require('../models/Reservation')
const mongoose = require('mongoose')
require('dotenv').config()


const url = process.env.URL  


exports.getSeance = (id, nbrPlace, date) => {
    return new Promise((resolve, reject) => {
      mongoose
        .connect(url)
        .then(() => {
          Reservation.find({ idServiceProduct: id, etat: 'en attente' })
            .then((reservations) => {
              let datetime, dateReservation;
              let ReservationsToday = [];
              if (reservations.length > 0) {
                reservations.forEach((reservation) => {
                  datetime = new Date(reservation.horaire);
                  dateReservation = datetime.toISOString().split('T')[0];
                  if (dateReservation === date) {
                    ReservationsToday.push(reservation);
                  }
                });
              }
              if (ReservationsToday.length > 0) {
                Seance.find({ idServiceProduct: id }).sort({ time: 1 })
                  .then((seances) => {
                    let dateSeance, timeSeance;
                    let Seances = [];
                    seances.forEach((seance) => {
                      let dateRes, timeReservation;
                      let place = 0;
                      dateSeance = new Date(seance.time);
                      timeSeance = dateSeance.toISOString().split('T')[1].split('.')[0];
                      ReservationsToday.forEach((reservation) => {
                        dateRes = new Date(reservation.horaire);
                        timeReservation = dateRes.toISOString().split('T')[1].split('.')[0];
                        if (timeReservation === timeSeance) {
                          place += reservation.nbPlace; // Use reservation.nbPlace instead of reservation.place
                        }
                      });
                      if (place + nbrPlace <= 2) {
                        Seances.push(seance);
                      }
                    });
                    mongoose.disconnect();
                    resolve(Seances);
                  })
                  .catch((err) => {
                    mongoose.disconnect();
                    reject(err);
                  });
              } else {
                Seance.find({ idServiceProduct: id }).sort({ time: 1 })
                  .then((res) => {
                    let Seances = [];
                    res.forEach((seance) => {
                      Seances.push(seance); // Push seance directly without additional conditions
                    });
                    mongoose.disconnect();
                    resolve(Seances);
                  })
                  .catch((err) => {
                    mongoose.disconnect();
                    reject(err);
                  });
              }
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        })
        .catch((err) => reject(err));
    });
  };
  