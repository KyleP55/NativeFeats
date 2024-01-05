import * as SQLite from 'expo-sqlite';

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

}