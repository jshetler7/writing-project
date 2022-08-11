import * as mysql from 'mysql2';
import { sqlConfig } from '../config';

const connection = mysql.createPool(sqlConfig);

export const Query = <T = mysql.OkPacket>(sqlString: string, values?: unknown[]) => {
    return new Promise<T>((resolve, reject) => {
        const formattedSQL = mysql.format(sqlString, values);

        console.log({ formattedSQL });
        
        connection.query(formattedSQL, (err, results) => {
            if (err) {
                reject(err);
            } else {
                //@ts-ignore
                resolve(results);
            };
        });
    });
};