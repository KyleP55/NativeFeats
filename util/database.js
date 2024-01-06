import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

const database = SQLite.openDatabase('places.db');

export function initDb() {
    const promise = new Promise((res, rej) => {
        database.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS places (
                    id INTEGER PRIMARY KEY NOT NULL,
                    title TEXT NOT NULL,
                    image TEXT NOT NULL,
                    address TEXT NOT NULL,
                    lat REAL NOT NULL,
                    lng REAL NOT NULL
                )`,
                [],
                () => {
                    res();
                },
                (_, error) => {
                    rej(error)
                }
            );
        });
    });

    return promise;
}

// INSERT
export function insertPlace(place) {
    const promise = new Promise((res, rej) => {
        database.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO places (title, image, address, lat, lng)
                VALUES (?, ?, ?, ?, ?)`,
                [place.title, place.imageUri, place.location.address, place.location.lat, place.location.lng],
                (_, result) => {
                    console.log(result);
                    res(result);
                },
                (_, err) => {
                    rej(err)
                }
            );
        });
    });

    return promise;
}

// FETCH
export function fetchPlaces() {
    const promise = new Promise((res, rej) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM places`,
                [],
                (_, result) => {
                    const places = [];

                    for (let i of result.rows._array) {
                        places.push(new Place(
                            i.title,
                            i.image,
                            {
                                address: i.address,
                                lat: i.lat,
                                lng: i.lng,
                            },
                            i.id
                        ));
                    }

                    res(places);
                },
                (_, err) => {
                    rej(err);
                }
            )
        });
    });

    return promise;
}