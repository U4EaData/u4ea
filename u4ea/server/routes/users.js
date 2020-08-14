import { Connection } from './index'

export const all = async () =>  {
    return new Promise ((resolve, reject) => {
        Connection.query('Select * from users', (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};
